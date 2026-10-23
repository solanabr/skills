# Reader prompts

Three prompts for the reader in [blind-reader.md](blind-reader.md): the reader (P2 to P4), the paired judge (P5) and the answer-key checker. Fill the `{PLACEHOLDERS}` and send nothing else. The filled prompt carries the fake name only: no real name of your company or people, no path containing one, no extra context. The paired judge's leak check adds the four reference companies' names. `{UNIT}` is "slide" for a deck and "block" for a script.

## 1. Reader: recall, objection, sticking points

One fresh reader per persona, in parallel.

```
{PERSONA}

Before opening anything, answer:
1. Do you know a company called {FAKE_NAME}, or people called {FAKE_PEOPLE} connected to it? Write what you know or "I don't know it".
2. Is there anything in your context (instructions, memory, skill list, email, folder path, working directory, git branch) that says whose material this is? Quote it or write "nothing".

Then open only the files in {FOLDER}. Read deck.pdf one page at a time, in order (pages 1, 2, 3...). If notes.txt exists, line N, labelled "N:", is what the founder says on page N: read it with that page. A line with only its label means no notes for that page. If there is only script.md, read it top to bottom; each numbered block is one {UNIT}. Do not open any other file and do not search the web.

One pass, no going back. After each {UNIT}, before opening the next, write one sentence: what this {UNIT} says.

After the last one, without reopening anything:
(a) what the company does; (b) who pays, and for what; (c) why now; (d) why this team; (e) what proof exists; (f) why it is hard to copy; (g) the long-term vision. If you don't know, write "don't know".

Then:
- verdict: "would take the meeting", "pass" or "need more", and the one sentence from the material that decided it;
- the one objection that would make you pass;
- {UNIT}s with too much text or that you didn't get the first time (number and the reason in one sentence);
- where the story breaks: between which {UNIT}s and why, or "it doesn't".

Answer only with JSON:
{"leak_check": {"knows": "...", "context": "..."}, "sentence_per_unit": ["01: ...", "02: ..."], "recall": {"a": "...", "b": "...", "c": "...", "d": "...", "e": "...", "f": "...", "g": "..."}, "verdict": "...", "deciding_sentence": "...", "fatal_objection": "...", "sticking_points": [{"unit": "NN", "why": "..."}], "story_break": "..."}
```

`{PERSONA}` is one line from [personas.md](personas.md), always with the 3-minute frame: alone, without the founder, the way a deck sent by link is read.

## 2. Paired judge (P5)

Two fresh judges: VC and event judge. The folder holds one subfolder per deck, `deck-A` to `deck-E`, shuffled, all five treated the same way. The key from letter to deck stays outside that folder. The set is in [paired-set.md](paired-set.md). `{NAMES}` is your fake name and the four reference companies' real names, in a shuffled order that says nothing about the letters.

```
{PERSONA}

Leak check as above, for each of these names: {NAMES}.

Open the subfolders of {FOLDER} (deck-A, deck-B, ...) in letter order. Read each once, without going back. Do not open any other file and do not search the web.

Then, without reopening: rank the five from 1 to 5 on "would take the meeting" (judge: "advances"), on clarity and on story. For each deck, the sentence that weighed most, one sentence on why, and the company you think it is, or "don't know".

Answer only with JSON:
{"leak_check": {"knows": "...", "context": "..."}, "rank_meeting": ["deck-?", "..."], "rank_clarity": ["..."], "rank_story": ["..."], "per_deck": {"deck-A": {"sentence": "...", "why": "...", "recognized": "..."}}}
```

## 3. Answer-key checker

A fresh reader who didn't write the material. It gets the answer key (written with the fake name, so the checker stays blind too) and the readers' JSON, nothing else.

```
You get an answer key and the answers of {N} readers. For each reader and each question from (a) to (g), mark "right", "partial" or "wrong" and copy the literal part of the answer that decided it. The score counts "right" only. For each {UNIT}, compare the reader's sentence with the intended sentence: same meaning, yes or no. Don't rewrite the key and don't give an opinion on the material.

Answer only with JSON:
{"recall": {"a": [{"reader": "vc", "mark": "right", "quote": "..."}], "b": [], "c": [], "d": [], "e": [], "f": [], "g": []}, "five_second": [{"unit": "01", "vc": true, "buyer": false, "judge": true}], "score": {"a": "2/3", "b": "0/3"}}
```
