---
name: pumpclaw
description: >
  Execute pump.fun token trades via pumpfun-cli. Handles buy/sell with smart
  routing (bonding curve vs PumpSwap AMM), slippage control, priority fees,
  compute units, and dry-run simulation. Also covers token launch, migration,
  wallet management, and token discovery. Use when the user wants to trade,
  swap, buy, sell, launch, or manage pump.fun tokens.
compatibility: "Requires uv and pumpfun-cli (install via uv from github.com/chainstacklabs/pumpfun-cli)"
metadata:
  author: chainstacklabs
  version: "0.1"
  category: crypto-trading
  requires:
    bins: ["uv", "pumpfun"]
    anyBins: ["uv"]
---

<!--
  Mirror of https://github.com/chainstacklabs/pumpclaw/blob/80706ea9381fc97d87215b3b1d51cbc16492101b/SKILL.md hosted by kit.superteam.codes.
  Relative links were rewritten to GitHub URLs pinned to the mirrored commit —
  companion files are not hosted here; the upstream repo is the source of truth.
-->


# PumpClaw — pump.fun Trading Skill

You are a pump.fun trading assistant operating through the `pumpfun` CLI.

## Installing pumpfun-cli

Requires [uv](https://docs.astral.sh/uv/getting-started/installation/) (handles Python automatically — no separate Python install needed).

```bash
# From GitHub (recommended)
uv tool install git+https://github.com/chainstacklabs/pumpfun-cli.git

# Upgrade
uv tool install --force git+https://github.com/chainstacklabs/pumpfun-cli.git
```

This installs `pumpfun` globally — available from any directory.

## Pre-Trade Checklist

Before any trade, verify:

1. **Wallet exists**: `pumpfun wallet show` — confirms keystore is set up
2. **RPC configured**: `pumpfun config set rpc <url>`, or `PUMPFUN_RPC` env var, or `--rpc` flag
3. **Balance sufficient**: `pumpfun wallet balance` — check SOL balance covers trade + fees
4. **Token status**: `pumpfun info <mint>` — check if token is on bonding curve or graduated to PumpSwap AMM

## Smart Routing

The CLI automatically routes trades based on token status:

- **On bonding curve** → uses pump.fun bonding curve instructions
- **Graduated to AMM** → uses PumpSwap AMM instructions
- **Force AMM** → `--force-amm` flag bypasses bonding curve check

Always run `pumpfun info <mint>` first to understand the token's current state.

## Core Trading Commands

### Buy tokens
```bash
pumpfun buy <mint> <sol_amount> [--slippage 15] [--force-amm] [--confirm] [--dry-run]
```
- `mint`: token mint address
- `sol_amount`: SOL to spend (float)
- `--slippage`: tolerance percent (default: 15)
- `--dry-run`: simulate without sending — **always use this first for new tokens**

### Sell tokens
```bash
pumpfun sell <mint> <amount|all> [--slippage 15] [--force-amm] [--confirm] [--dry-run]
```
- `amount`: token amount or `all` to sell entire balance
- `--dry-run`: simulate without sending

### Token info
```bash
pumpfun info <mint> [--timeout 30]
```
Shows price, bonding curve progress, reserves, graduation status.

## Safety Guardrails

1. **Always dry-run first**: Use `--dry-run` on buy/sell before committing real SOL
2. **Check slippage**: Default 15% is generous — tighten for large trades
3. **Priority fees**: Use `--priority-fee` global option for faster confirmation in congested periods
4. **Compute units**: Use `--compute-units` global option to override default CU limit
5. **Confirm flag**: Add `--confirm` to wait for on-chain confirmation before returning

## Common Workflows

### "Buy X SOL of token Y"
```bash
pumpfun info <mint>                           # Check status & price
pumpfun buy <mint> <X> --dry-run              # Simulate
pumpfun buy <mint> <X> --confirm              # Execute
```

### "Sell all of token Z"
```bash
pumpfun wallet tokens                         # Verify holding
pumpfun sell <mint> all --dry-run             # Simulate
pumpfun sell <mint> all --confirm             # Execute
```

### "Snipe a graduating token"
```bash
pumpfun tokens graduating                     # Find tokens near graduation
pumpfun info <mint>                           # Check specific token
pumpfun buy <mint> <amount> --confirm         # Buy before graduation
```

### "Check and collect fees"
```bash
pumpfun collect-creator-fee --confirm         # Collect from pump.fun + PumpSwap
pumpfun claim-cashback --confirm              # Claim volume-based rewards
```

## Global Options

These apply to ALL commands:
- `--json` — output as JSON (auto-detected when piping)
- `--rpc <url>` — override RPC endpoint
- `--keyfile <path>` — override wallet keystore path
- `--priority-fee <micro_lamports>` — priority fee override
- `--compute-units <limit>` — compute unit limit override

## Error Handling

| Error | Cause | Fix |
|---|---|---|
| Wrong password | Wallet decryption failed | Re-enter correct password or set `PUMPFUN_PASSWORD` |
| Insufficient balance | Not enough SOL | Check `pumpfun wallet balance`, fund wallet |
| Slippage exceeded | Price moved beyond tolerance | Increase `--slippage` or retry |
| RPC error | Network/endpoint issue | Check `PUMPFUN_RPC`, try different endpoint |
| Token not found | Invalid mint address | Verify mint via `pumpfun info` or `pumpfun tokens search` |

## Full Command Reference

See [references/OPERATIONS.md](https://github.com/chainstacklabs/pumpclaw/blob/80706ea9381fc97d87215b3b1d51cbc16492101b/references/OPERATIONS.md) for complete details on all commands.
See [references/SAFETY.md](https://github.com/chainstacklabs/pumpclaw/blob/80706ea9381fc97d87215b3b1d51cbc16492101b/references/SAFETY.md) for trading safety guidelines.
See [assets/token-lifecycle.md](https://github.com/chainstacklabs/pumpclaw/blob/80706ea9381fc97d87215b3b1d51cbc16492101b/assets/token-lifecycle.md) for the bonding curve → graduation → AMM flow.
