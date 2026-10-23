# The flow slide: how the technology works, in one picture

Rules, layouts and real examples for the slide that shows how the product works: who the actors
are, what passes between them, what stays private and what goes onchain. Use it when you draw a
"how it works", "platform overview" or architecture slide, and before you put a component diagram
in a deck.

The examples are described in our words and linked, never reproduced: open the original to see
the slide. Reviewer critiques from TechCrunch teardowns are paraphrased; the article holds the
wording. "Seen" means the slide image was opened; nothing here was described from hearsay.

**The lens.** In five seconds, a stranger should be able to say (a) who the actors are, (b) what
passes between them, (c) what is private and what is public, and (d) which path matters.

## Rules

1. **The title is the rule the diagram proves, not "How it works".** ZkyProof titles its slide
   with the privacy rule itself (the verifier learns one bit; nobody sees the map). Tanbii and
   Netmaker use "How it works" and leave the drawing without a thesis. In the teardown corpus only
   about 24% to 38% of titles are claims ([ruler](library-teardown-ruler.md)), so this sets a
   slide apart.
2. **An actor is a concrete noun; an arrow is a verb with what travels on it.** Hivemapper (actors
   large, verbs small on the arrows), CleanHub (each arrow says whether it carries money, data or
   content), CargoBill ("Make Payment", "Request Payment"). Abstract roles ("Producer",
   "Consumer") and component boxes with no "who" fail the lens.
3. **Mark what is yours and what is a partner's.** CargoBill has an ownership legend (blue =
   provided by CargoBill). The two sharpest
   reviewer critiques of technology diagrams in the teardown corpus are exactly this (StudentFinance
   and ANYbotics, below).
4. **Draw the trust boundary as a container; only what crosses the border becomes an arrow.**
   Urani (dashed groups and one arrow labelled "off-chain batches"), ZkyProof (a locked strip
   listing what never leaves).
5. **One highlighted path, one accent colour; a second colour only with a fixed meaning.**
   ZkyProof uses green only on the verified result and red only on what stays hidden. With several
   kinds of flow, colour marks the kind instead (Hivemapper: fiat, token, data). Counter-example:
   BlockMesh's "Introducing" slide, four line styles crossing and no main path.
6. **Show what the third party receives, not the plumbing.** ZkyProof's public card (coverage,
   date, count of findings, `verified = true`) is the best example found; in CleanHub the party
   that receives the proof is shown using it.
7. **One reading direction**, left to right (CargoBill) or top to bottom (Urani). The ANYbotics
   reviewer objected to a slide that reads bottom-up.
8. **Plain words in the boxes; jargon goes to the speaker notes.** The Simba Chain reviewer was
   lost by one acronym inside a step; Netmaker puts plain numbered steps beside its technical
   diagram. BlockMesh's PM and PE acronyms need a legend.
9. **Pair the diagram with three or four numbered sentences, or put the steps first and the
   diagram after.** Netmaker (diagram plus four steps; the reviewer liked it as an introduction),
   Urani (a steps slide, then the diagram). Kevin Hale prefers a list of steps to a diagram:
   "diagrams are like little mazes for ideas"
   ([YC blog](https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck)).
10. **Proof of reality next to the drawing.** A field photo, a certification seal or a partner's
    logo beats an abstract icon (CleanHub's track-and-trace slide: five field photos and a
    third-party certification). Counter-examples: Tanbii's blobs, Rypplzz's isometric grid.

## Layouts for "several actors, private data, a public record"

- **A. Left-to-right pipeline with a trust boundary.** Source on the left, counterparty on the
  right, a container in the middle marking what stays inside; only what crosses the border is an
  arrow, labelled; the public record is a strip along the bottom; one colour for the gate (the
  condition that releases). Example: CargoBill. Works with one dominant direction and a clear
  gate. Breaks when the third party who checks sits off the axis and turns into text on an arrow.
- **B. Swimlanes per actor, ending on one shared record line.** One lane per actor, steps aligned
  in time, every lane ends on the record. Example: BlockMesh "User Journey". Works with three or
  four actors acting in sequence. Breaks when it turns into a text table, when privacy needs a
  marker in every cell, or past four lanes.
- **C. Hub with typed flows.** The meeting point in the centre, parties around it, one colour or
  line style per kind of thing (money, data, proof). Examples: CleanHub's overview, Hivemapper's
  token flow; Terra One is the untyped version. Works when the thesis is the exchange (money goes
  out, proof comes back). Breaks when the centre seems to see everything: in a privacy pitch the
  hub must be the record that receives only a fingerprint, or the drawing contradicts the title.
- **Add-on for any of the three: the card of what the third party receives.** The public
  artifact, with the verdict and a locked strip of what never leaves (ZkyProof). It ends pipeline
  A or arrives at the centre of hub C.

## Examples that read

| Example | Where | What it does well | Where it falls short |
|---|---|---|---|
| CargoBill, "Platform Overview" (seen) | Colosseum Breakout hackathon pitch, about 1:35 in the [video](https://vimeo.com/1085190844/7313f0d092) | Everything the company provides is one colour with a legend; a single left-to-right axis for money; arrows are business verbs | Three zones plus a footer; attachments in tiny type; one dashed line does not say what it carries |
| CleanHub, slide 7 (seen) | [TechCrunch seed teardown](https://techcrunch.com/2023/07/21/sample-seed-pitch-deck-cleanhub/) | Three columns, three typed flows: money goes one way, data and content come back; the reviewer praised showing that all three have value | No title, so no thesis |
| CleanHub, slide 9, track and trace (seen) | same teardown | Five steps, each a verb with a field photo; bars underneath for what runs across all steps; a certification seal | About 120 words, over the 80-word flag in the [ruler](library-teardown-ruler.md) |
| Hivemapper, token flow and ecosystem (seen) | [Hivemapper docs](https://docs.hivemapper.com/honey-token/honey-burn-and-mint/), not a raise deck | Colour = what flows, named on the arrow, no separate legend; actor large, verb small; one footer sentence carries the thesis | Shows nothing about privacy; the hub puts one actor in the middle of everything |
| ZkyProof, "who sees what" (seen) | Midnight Build Club grant pitch, about 3:25 in the [video](https://www.youtube.com/watch?v=Y1KZ-XJRLY8) | Shows the public artifact a third party receives, and a locked strip of what never appears; the title is the privacy rule | Does not connect the actors to each other; leans on the previous slide |
| BlockMesh, "User Journey" (seen) | Colosseum Renaissance hackathon deck, slide 5, [Google Slides](https://docs.google.com/presentation/d/16yqwxWx3vHPVmdpsko9U76sAowi9L-8yrc9wmfwEIok/edit?usp=sharing) | One column per actor, one row per step, the last row identical for all (settlement on Solana), batching noted in the footer | The same deck's slide 3 does not read: four line styles, acronyms, the chain as a side column with six roles |
| Urani, steps then diagram (seen) | Colosseum Renaissance hackathon pitch, about 0:56 and 1:24 in the [video](https://www.loom.com/share/84014b7877ab42e6929c0f381cbb8cd1) | Four numbered sentences with a bracket for the cycle time, then a top-to-bottom diagram whose labelled arrow marks the off-chain boundary; the drawing confirms what the text said | - |
| Netmaker, slide 7 (seen) | [TechCrunch seed teardown](https://techcrunch.com/2023/06/16/sample-seed-pitch-deck-netmaker/) | A technical diagram beside four plain numbered steps; the reviewer called it a good base-level introduction | The reviewer wanted real setup screens to judge how hard it is |
| Terra One, slide 7 (seen) | [TechCrunch seed teardown](https://techcrunch.com/2024/05/24/sample-seed-pitch-deck-terra-one/) | Two sentences on what the company does and a hub of concrete, named counterparties; praised for no technical mumbo-jumbo | Stops there: who uses it, how it makes money, what comes next |
| Matterport, slide 17 (seen) | [SEC Exhibit 99.2](https://www.sec.gov/Archives/edgar/data/1819394/000119312521031520/d42860dex992.htm) | A 2x2 grid of capabilities with real photos reads fast as an inventory | Says nothing about who does what or what passes between the boxes |

## Counter-examples, with the reviewer's critique

| Slide | Source | The critique, paraphrased |
|---|---|---|
| StudentFinance, slide 10, technology | [TechCrunch Series A teardown](https://techcrunch.com/2023/03/16/sample-series-a-pitch-deck-studentfinance/) | The reviewer cannot tell whether the API is theirs or a provider's, or what was built in house; the slide is too detailed and not detailed enough at once |
| ANYbotics, slide 5, value chain | [TechCrunch Series B teardown](https://techcrunch.com/2023/08/11/sample-series-b-pitch-deck-anybotics-ag/) | Unclear where the company ends and its partners begin; it reads bottom-up; the flow of information is muddy and would only work with a voice-over |
| Rypplzz, slide 3 | [TechCrunch seed teardown](https://techcrunch.com/2024/01/19/sample-seed-pitch-deck-rypplzz/) | A wasted slide: the reviewer cannot tell what the user experience or benefit is, and even a chatbot could not make sense of it |
| Tanbii, slides 6 and 7, how it works | [TechCrunch pre-seed teardown](https://techcrunch.com/2023/09/01/sample-pre-seed-pitch-deck-tanbii/) | A "how it works" slide has to explain how it works; three words and coloured blobs (probably videos that did not survive the PDF) do not |
| Simba Chain, slide 16, four steps | [TechCrunch Series A teardown](https://techcrunch.com/2022/08/25/sample-series-a-pitch-deck-simba-chain/) | One acronym in step 3 lost the reviewer, and step 4 hides five actions, undercutting the promise of simplicity |
| Momentum, slides 6 to 9 | [TechCrunch seed teardown](https://techcrunch.com/2022/05/05/sample-seed-pitch-deck-momentum/) | Four slides of product mechanics and none on the benefit to the user |

Limits: no public seed deck from a physical-DePIN company with a VC lead was found, so the DePIN
example comes from documentation.
