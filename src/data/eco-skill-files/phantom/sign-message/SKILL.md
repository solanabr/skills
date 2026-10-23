---
name: sign-message
description: Implement message signing with Phantom Connect SDK for Solana and EVM, including Sign-in with Solana (SIWS) authentication
---

<!--
  Mirror of https://github.com/phantom/phantom-connect-cursor-plugin/blob/4162aa88131f0a6b6f0c050b176736f0773d038c/skills/sign-message/SKILL.md hosted by kit.superteam.codes.
  Relative links were rewritten to GitHub URLs pinned to the mirrored commit —
  companion files are not hosted here; the upstream repo is the source of truth.
-->


# Sign Message

## When to use
- User asks to sign a message
- User wants to implement SIWS (Sign-in with Solana)
- User wants to verify wallet ownership or add wallet-based authentication

## Workflow

### Step 1: Sign a Message on Solana (React SDK)

```tsx
import { useSolana } from "@phantom/react-sdk";

function SignMessage() {
  const solana = useSolana();

  const handleSign = async () => {
    const message = new TextEncoder().encode("Hello from my dApp!");

    try {
      const { signature } = await solana.signMessage(message);
      console.log("Signature:", signature);
    } catch (error) {
      console.error("Signing failed:", error);
    }
  };

  return <button onClick={handleSign}>Sign Message</button>;
}
```

### Step 2: Sign a Message on Solana (Browser SDK)

```ts
async function signMessage(sdk: BrowserSDK) {
  const message = new TextEncoder().encode("Hello from my dApp!");

  try {
    const { signature } = await sdk.solana.signMessage(message);
    console.log("Signature:", signature);
  } catch (error) {
    console.error("Signing failed:", error);
  }
}
```

### Step 3: Sign a Message on EVM

For Ethereum/EVM chains, use `signPersonalMessage`:

```tsx
import { useEthereum } from "@phantom/react-sdk";

function SignEVMMessage() {
  const ethereum = useEthereum();

  const handleSign = async () => {
    try {
      const { signature } = await ethereum.signPersonalMessage("Hello from my dApp!");
      console.log("Signature:", signature);
    } catch (error) {
      console.error("Signing failed:", error);
    }
  };

  return <button onClick={handleSign}>Sign EVM Message</button>;
}
```

### Step 4: Sign-in with Solana (SIWS)

SIWS provides a standardized authentication flow — proving wallet ownership to your backend:

```tsx
import { useSolana, useAccounts } from "@phantom/react-sdk";

function SignInWithSolana() {
  const solana = useSolana();
  const { accounts } = useAccounts();

  const handleSIWS = async () => {
    const solanaAccount = accounts.find((a) => a.chain === "solana");
    if (!solanaAccount) return;

    // Construct the SIWS message
    const domain = window.location.host;
    const uri = window.location.origin;
    const nonce = await fetch("/api/auth/nonce").then((r) => r.text()); // Must be server-issued
    const issuedAt = new Date().toISOString();

    const message = [
      `${domain} wants you to sign in with your Solana account:`,
      solanaAccount.address,
      "",
      "Sign in to access your account.",
      "",
      `URI: ${uri}`,
      `Version: 1`,
      `Nonce: ${nonce}`,
      `Issued At: ${issuedAt}`,
    ].join("\n");

    try {
      const { signature } = await solana.signMessage(
        new TextEncoder().encode(message)
      );

      // Send signature + message to your backend for verification
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          signature,
          publicKey: solanaAccount.address,
        }),
      });

      if (response.ok) {
        console.log("Authenticated successfully!");
      }
    } catch (error) {
      console.error("SIWS failed:", error);
    }
  };

  return <button onClick={handleSIWS}>Sign in with Solana</button>;
}
```

## API Reference

| Chain    | Method                          | Input                | Output        |
| -------- | ------------------------------- | -------------------- | ------------- |
| Solana   | `solana.signMessage(bytes)`     | `Uint8Array`         | `{ signature }` |
| Ethereum | `ethereum.signPersonalMessage(msg)` | `string`         | `{ signature }` |

## Important Notes

- Solana `signMessage` expects a `Uint8Array` — use `new TextEncoder().encode(...)` to convert strings.
- EVM `signPersonalMessage` accepts a plain string.
- For SIWS, the nonce **must** be issued by your backend, stored server-side, and validated as single-use on verification. A client-generated nonce provides no replay protection.
- Always wrap signing calls in try-catch to handle user rejections.
