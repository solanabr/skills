# `.claude/context/review.md` format

The `pitch-review` skill writes this file. It holds the answer key, written before any reader runs, and one entry per review round. Commit it. Its format is defined here once, so other skills link here instead of restating it.

No reader ever opens this file: rounds quote the real material and the author is named. The answer key is written with the fake name only. Paste its Intent and Questions subsections into the checker's prompt, never the file or the header that names the author, so the checker stays blind too.

## Merge rules

- A new round is appended under **Rounds**. Never edit a past round.
- The answer key changes only when the material's intent changes. Then re-date it and say why in the next round. A key rewritten after the answers came in is no longer a key.
- Live feedback is appended, one row per item, and only its status changes later.
- Leave sections that another skill added untouched.

## Template

```markdown
# Pitch review

Updated: YYYY-MM-DD · by pitch-review

## Answer key
Written: YYYY-MM-DD by <author> · Checked by: <a fresh reader; never the author>
Material: deck (reading | stage) | script | video, version <n> · Fake name: <name>

### Intent, one sentence per slide or block
1. <what slide 1 has to leave in the reader's head>
2. ...

### Questions
(a) What the company does. Right: <...>. Wrong: <a partial answer that doesn't count>, or "don't know".
(b) Who pays, and for what. Right: <payer> and/or <unit>. Wrong: "don't know".
(c) Why now. Right: <the change that opened the window>. Wrong: "don't know".
(d) Why this team. Right: <one credential per person, tied to the problem>. Wrong: "don't know".
(e) What proof exists. Right: <the measured numbers, with units>. Wrong: "don't know".
(f) Why it is hard to copy. Right: <the mechanism>. Wrong: "don't know", "the tech" or "the team" alone.
(g) Long-term vision. Right: <where the company ends up>. Wrong: <the wedge only>.

Target: <questions> marked right for at least 2 of 3 readers (video: 2 people); a partial doesn't count. The rest are recorded to compare versions.

## Rounds

### Round <n> · YYYY-MM-DD · <material> v<n>
- P0/P1: <numbers without a source>; median <x> words, max <y>, claim headlines <z>%.
- Leak check: anonymization <clean | leak fixed>; pages checked by eye: yes | no. Probe: <pass | what got through>. Readers who knew the fake name: <x>/3. Context they quoted: "<literal>".
- Verdicts: VC <would take the meeting | need more | pass>, deciding sentence (slide NN): "<literal>". Buyer: ... Judge: ...
- Recall (checked by <who>): a <x>/3 · b <x>/3 · c · d · e · f · g. Five-second: <x>% of slides match the intent.
- Against the last round: <question that rose or fell, and the likely cause>.
- Fatal objections: <objection>, <n>/3 (<who>): "<literal>" → fix | ready answer | taste (1 reader).
- Sticking points (2+ readers): slide NN, <n>/3: "<literal>".
- Paired (P5, a weak signal): VC meeting <k> of 5, clarity <k>, story <k>; judge ... Decks a judge recognized: <letter: company>, or none. Set: <link to the set used>.
- Fixes proposed (the founder decides; at most 2 fix rounds): 1. <fix> (<n> readers; slide NN). Ready answers: <objection → answer>.
- Founder's decision: <what was accepted, declined or deferred>.
- Limits: <what wasn't blind, what didn't run>.

## Live feedback
| Date | Where (call, panel, demo) | Item, literal | Status: absorbed / declined (reason) / pending founder |
|---|---|---|---|
```

Any field without data says `not run`, not a guess.
