# Anonymize a single-file HTML deck

The deck this pack renders is one HTML file with one `<section class="slide">` per slide and speaker notes in `<aside class="notes">` ([deck-design-system.md](../../pitch-deck/references/deck-design-system.md), [slide-templates.md](../../pitch-deck/references/slide-templates.md)). Anonymizing it takes two files you write, one command, and a look at every page.

The command is [anonymize.sh](anonymize.sh), next to this file. It needs `perl`, a Chrome or Chromium binary and, optionally, `pdftotext` from poppler. It runs every step in one process on purpose: in Claude Code each Bash call starts a new shell, and "Environment variables don't persist" from one call to the next ([tools reference § What persists between commands](https://code.claude.com/docs/en/tools-reference), read 2026-10-08), so steps split across calls lose their paths.

The output is a neutral folder holding only what the reader may see: `deck.pdf`, one page per slide, and `notes.txt` for a stage deck. The anonymized HTML stays in a temporary work folder that no reader opens.

## 1. Write the swap map and the forbidden list

Pick a fake company name the reader cannot know: an invented word, not a real brand. Then write two UTF-8 files next to the deck, outside the folder any reader will open.

`swaps.txt`, one `real => fake` pair per line; lines starting with `#` are ignored. Illustrative:

```
# real => fake
jane@acmepay.xyz => founder@tallomer.example
acmepay.xyz => tallomer.example
acmepay => tallomer
Acme Pay => Tallomer
ACME PAY => TALLOMER
Jane Doe => R. Castell
Raj Patel => T. Okafor
Jane => Rui
Raj => Teo
João Silva => Inês Duarte
JOÃO SILVA => INÊS DUARTE
```

How the swaps apply:

- **Whole words only.** "Jane" is swapped, "Janeiro" is not; "Raj" is swapped, "Rajasthan" is not. Accented names work, since the text is read as UTF-8. The other side of this: a compound that glues the name to a letter, digit or underscore (`acme_pay`, `AcmeLabs`, `acmepay2`) isn't swapped by the `acmepay` or `Acme Pay` line and needs a line of its own. You don't have to find them by hand: the leak check below matches inside words and lists every one.
- **Longest first, in one pass,** so line order doesn't matter: "Jane Doe" is swapped before "Jane" could split it, and a fake name is never swapped again.
- **Exact case.** Write one line per case variant you use. The leak check ignores case, so a variant you forgot shows up there.
- **Literal text.** Dots and slashes need no escaping. An entity is matched as written in the HTML, so `Acme&nbsp;Pay` needs its own line.

`forbidden.txt`, one term per line: everything that identifies the project, matched later anywhere in the text, inside words too, in any case ("JOÃO" matches "João"; `acme` matches `acme_pay`, `@acme_pay`, `AcmeLabs` and `acmepay2`). List the bare words, so one line catches every variant. No empty line: the command stops on one, because an empty pattern matches everything.

A line starting with `!` allows an ordinary word that happens to contain a term: `!Janeiro` when `Jane` is forbidden, `!does` when `Doe` is. Allowed words are blanked before the check, so list only real words that are not about the project, never a spelling of the name.

```
Acme
acmepay
Jane
Doe
Raj
Patel
João
Silva
!Janeiro
!Rajasthan
```

What belongs in both files, on Solana in particular: the company and product names, each founder's first and last name, previous employers named on the team slide, the domain and every email, the X, GitHub, Discord and Telegram handles, program IDs and mint addresses (each in full), explorer, Dune and DefiLlama URLs that carry your slug, and the operating-system user name if it is a founder's name. Swap a program ID for a placeholder such as `PROGRAM_ID`, not for another real address.

A term in `forbidden.txt` with no swap in `swaps.txt` makes the leak check fire. That is the test that the map is complete.

## 2. Run it

```sh
bash /path/to/pitch-review/references/anonymize.sh reading deck.html swaps.txt forbidden.txt /tmp/review-r1
```

- **Mode**: `reading` drops HTML comments, every `<img>` and the speaker notes. `stage` keeps the notes and writes them to `notes.txt`, one line per slide labelled `N:`, so line N is page N; a slide without notes gets an empty `N:` line. `paired` keeps the `<img>` for the paired comparison ([paired-set.md](paired-set.md)); only images embedded in the file render, since a relative path doesn't resolve from the work folder. `script` is for a spoken script: swaps only, written as `script.md`.
- **Readers' folder**: a new folder for every run, outside your home folder and outside the project, such as `/tmp/review-r1`. The reader sees this path. A path under your home carries your user name (the command warns), and one built from the project folder carries the project's. A folder that already holds files is refused, because it would mix versions.
- **Chrome**: found in the usual macOS and Linux places; otherwise set `CHROME=/path/to/binary`. Running as root (a container, CI), Chrome won't start without `--no-sandbox`: set `CHROME_FLAGS=--no-sandbox`, and only for a deck you built yourself. `--no-pdf-header-footer` keeps the browser's print footer, which carries the file URL, off the pages; older Chrome builds call it `--print-to-pdf-no-header` ([Chrome for Developers, Headless command line](https://developer.chrome.com/docs/automation-and-testing/headless-cli), read 2026-10-08).

What it does, in order: checks both files (a malformed swap line or an empty forbidden line stops it), applies the swaps, strips what the mode drops, prints one PDF page per slide through the deck's print stylesheet (1920x1080, notes hidden), and runs the leak check on the anonymized HTML, `notes.txt` or `script.md`, the PDF's text as rendered (with `pdftotext`; it also catches a name split across tags or written as an entity) and the readers' folder path and file names.

Pass: the last line is `clean` (exit 0). The other endings: `LEAK` (exit 1) after the file, line and term of each hit; `NO PDF` (exit 2) when Chrome wrote no PDF or an empty one; `ERROR` (exit 2) on a setup problem. On a leak, add the missing swap and run again into a new folder; don't patch the output by hand.

The check matches inside words, so it errs toward a false alarm: a short term flags every word that contains it ("Doe" in "does", "Raj" in "Rajasthan"). Add a `!word` line for each such word. A forbidden word that is itself ordinary text ("Pay", "Bridge") flags every use; keep it out of `forbidden.txt` and list the compound ("Acme Pay") instead. `pdftotext` can split a letter-spaced label into single letters; the HTML check still sees it whole.

## 3. Look at every page

A text check cannot read pixels. Open `deck.pdf` and check each page for a logo, a face, a QR code, a screenshot with the product name, a wallet address in an image, or a CSS background image. The `reading` and `stage` modes drop every `<img>`; if a screenshot carries the argument (a demo), edit the name out of the image and keep it, rather than shipping a deck with the proof missing.

## Spoken script and video

- **Script** (`.md` or `.txt`): `bash anonymize.sh script script.md swaps.txt forbidden.txt /tmp/review-s1`. The reader takes it block by block.
- **Video**: faces and voices can't be swapped. Test it with people who don't know the company instead, as the SKILL.md says.

## What this does not cover

- Text inside images and CSS backgrounds: step 3.
- What the reader already has in its own context (instructions, memory, paths): [blind-reader.md](blind-reader.md). An anonymized deck read by a reader whose instructions name the company is not a blind read.
