# Upstream packs this skill draws on

The submission guide, judging criteria, video scripts and winners index are in this folder.
The judging criteria and winners index are written from Colosseum's own posts and FAQ, linked
inline. The skill needs no upstream pack to run. Two links still point outside the repo, both
pinned to a commit.

## Superteam ideas dataset

[superteam-ideas.json](https://github.com/sendaifun/solana-new/blob/e81c261645035c0e902eaaa518ff58722d188bb7/skills/data/ideas/superteam-ideas.json):
240 grant-shaped, Solana-native idea entries as inert JSON, read over https. To grep it
locally, download that one file; nothing else from its repository is needed.

## colosseum-copilot (ColosseumOrg/colosseum-copilot)

Queries 5,400+ past Colosseum submissions. This skill uses it for the live crowdedness check
on candidate tracks. Backed by a CLI, so it needs a one-time sign-in per machine regardless
of install route:

```
npx @colosseum-org/copilot-connect login
```

Node 20+ required.

- Upstream: https://github.com/ColosseumOrg/colosseum-copilot
- Pinned commit for the link in `SKILL.md`: `0453ffe26e8d245152619fcc949689a6adaab1c6`
- With [solanabr/ai-kit](https://github.com/solanabr/ai-kit) installed: `bash .claude/bin/skills.sh add colosseum` (installed by default there)
