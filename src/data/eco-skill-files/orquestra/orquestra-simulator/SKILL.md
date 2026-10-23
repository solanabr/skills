---
name: orquestra-simulator
description: "Preflights a Solana instruction via Orquestra's `simulate_instruction` MCP tool — no signing. Decodes Anchor errors from logs and reports compute units. Use when a user says 'simulate', 'dry run', 'preflight', 'will this work', 'check before signing', 'why did this fail', or 'decode this error'."
argument-hint: "Project ID, instruction name, accounts, args, feePayer, network."
---

<!--
  Mirror of https://github.com/berkayoztunc/orquestra/blob/47d8961e34ca8015fa84864c023b1f59385b4fc3/agents/skills/orquestra-simulator/SKILL.md hosted by kit.superteam.codes.
  Relative links were rewritten to GitHub URLs pinned to the mirrored commit —
  companion files are not hosted here; the upstream repo is the source of truth.
-->


# Orquestra Simulator

Pre-signature dry-run skill. Uses ONLY the Orquestra `simulate_instruction` MCP tool.

## Constraints

- ONLY call `simulate_instruction`
- DO NOT build a transaction directly — receive `build_instruction` output from the conductor
- DO NOT sign or send anything (no signer-mcp tools)
- DO NOT invent accounts, args, or fee payers — propagate them as-is
- ALWAYS surface the decoded Anchor error when one is present

## Procedure

1. Receive from the conductor: `projectId`, `instruction`, `accounts`, `args`, `feePayer`, `network`
2. Call `simulate_instruction` with those exact inputs
3. Branch on `success`:
   - **success** → report compute units + risk level, hand off to `orquestra-signer`
   - **failure** → lead with `decodedError` (or raw `err`), show last 5 log lines, STOP the pipeline

## Output Format

**Simulation Result**
- Project / Instruction / Network
- ✅ success or ❌ failure
- Compute units (when present)
- Risk level + reasons

**On failure**
- Decoded Anchor error: `<name>` (code `<code>`) — `<msg>`
- OR raw err: `<json>`
- Recent logs (last 5 lines)

**Handoff**
- → `orquestra-signer` on success
- → STOP on failure, surface error to user
