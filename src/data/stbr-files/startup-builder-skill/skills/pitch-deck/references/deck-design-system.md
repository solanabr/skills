<!-- Adapted from sendaifun/solana-new@e81c261, skills/launch/create-pitch-deck/references/deck-design-system.md. MIT © 2026 SendAI and Superteam; notice in THIRD_PARTY_NOTICES.md. Rewritten as a smaller shell with no JavaScript. -->

# Deck design system

A rendered deck is **one self-contained HTML file**: no external URLs, no web fonts, no CDN, no JavaScript. It opens offline, diffs in git and prints to PDF one slide per page. Slide markup lives in [slide-templates.md](slide-templates.md).

## Visual rules

- The palette comes from the founder's brand. Without one, pick from the table below; two or three colours plus neutrals, one accent.
- Flat slide backgrounds. No gradient backgrounds, glows, stock photos or decorative shapes.
- Avoid the default "AI purple". It reads as a template.
- One idea per slide; body text no smaller than about 28px at 1920×1080; captions are the only smaller text.
- Numbers in the accent colour; one emphasised word per slide at most.
- Images are inlined as `data:` URIs or inline SVG, so the file stays self-contained. Keep the file under a few MB.

| Palette | `--bg` | `--fg` | `--primary` | `--accent` | Suits |
|---|---|---|---|---|---|
| Navy | `#0f1729` | `#f1f5f9` | `#3b82f6` | `#10b981` | DeFi, infrastructure |
| Paper | `#ffffff` | `#1c1c1e` | `#1d4ed8` | `#0f766e` | Grants, accelerators, bright rooms |
| Teal | `#0f1d1b` | `#f0fdfa` | `#0d9488` | `#f59e0b` | Consumer, payments |
| Mono | `#0a0a0a` | `#fafafa` | `#e5e5e5` | `#f97316` | Hardware, bold brands |

## Shell

Paste slides into `<main>`. Arrow keys, Page Down and the space bar move between slides through native scroll snapping. The "Notes" checkbox shows speaker notes; printing hides it and gives one slide per page.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{PROJECT}} pitch</title>
<style>
  :root {
    --bg: #0f1729; --bg-alt: #131d33; --card: #182240; --line: rgba(255,255,255,.1);
    --fg: #f1f5f9; --fg-2: rgba(241,245,249,.7); --fg-3: rgba(241,245,249,.45);
    --primary: #3b82f6; --accent: #10b981; --danger: #ef4444;
    --sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  }
  * { box-sizing: border-box; margin: 0; }
  html { scroll-snap-type: y mandatory; background: var(--bg); }
  body { font: 400 clamp(16px, 1.5vw, 28px)/1.5 var(--sans); color: var(--fg); }
  .slide {
    min-height: 100vh; scroll-snap-align: start; position: relative;
    display: flex; flex-direction: column; justify-content: center; gap: 1.2em;
    padding: 6vh 7vw; background: var(--bg);
  }
  .slide:nth-child(even) { background: var(--bg-alt); }
  .label { font-size: .65em; letter-spacing: .15em; text-transform: uppercase; color: var(--fg-3); }
  h1 { font-size: 2.4em; line-height: 1.1; letter-spacing: -.02em; max-width: 22ch; }
  .hero { font-size: 3.4em; }
  p, li { color: var(--fg-2); max-width: 40ch; }
  ul { padding-left: 1.1em; display: grid; gap: .4em; }
  .em { color: var(--primary); }
  .grid { display: grid; gap: 1.2em; grid-template-columns: repeat(auto-fit, minmax(12em, 1fr)); }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 1.1em; }
  .metric { font-size: 2.6em; font-weight: 800; color: var(--accent); line-height: 1; }
  .source { font-size: .55em; color: var(--fg-3); }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: .45em .7em; border-bottom: 1px solid var(--line); }
  th { font-size: .7em; color: var(--fg-3); }
  tr.us td { color: var(--fg); background: color-mix(in srgb, var(--primary) 14%, transparent); font-weight: 600; }
  .yes { color: var(--accent); } .no { color: var(--fg-3); }
  code, .mono { font-family: var(--mono); font-size: .85em; }
  .notes { display: none; position: absolute; left: 7vw; right: 7vw; bottom: 2vh;
           font-size: .6em; color: var(--fg-2); background: rgba(0,0,0,.85);
           border: 1px solid var(--line); border-radius: 10px; padding: .8em 1em; }
  #show-notes:checked ~ main .notes { display: block; }
  .toggle { position: fixed; top: 10px; right: 14px; z-index: 2; font-size: 12px; color: var(--fg-3); }
  @media print {
    @page { size: 1920px 1080px; margin: 0; }
    html { scroll-snap-type: none; }
    .slide { height: 1080px; break-after: page; }
    .toggle, .notes, #show-notes { display: none !important; }
  }
</style>
</head>
<body>
<input type="checkbox" id="show-notes" hidden>
<label class="toggle" for="show-notes">Notes</label>
<main>
  <!-- slides from slide-templates.md -->
</main>
</body>
</html>
```

To rebrand, change only the `:root` tokens. To make a light deck, swap `--bg`, `--bg-alt`, `--card` and the `--fg` tokens for the Paper row.
