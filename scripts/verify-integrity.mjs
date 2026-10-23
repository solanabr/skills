#!/usr/bin/env node
/**
 * Assert that every sha256 the registry advertises matches the bytes the
 * built site actually serves. Run after `npm run build`.
 *
 * The registry claims `integrity[relPath] = sha256(hosted file)` for every
 * mirrored skill file; if dist/ drifts from those hashes (tampered store,
 * broken build copy, stale registry), fail loudly. Entries without an
 * integrity map (not yet re-pinned by refresh) are skipped.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(ROOT, "src/data/registry.json"), "utf8"));
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

let checked = 0;
const failures = [];

function verify(distRel, expected, label) {
  const path = join(ROOT, "dist", distRel);
  if (!existsSync(path)) {
    failures.push(`${label}: dist/${distRel} missing`);
    return;
  }
  const actual = sha256(readFileSync(path));
  if (actual !== expected) {
    failures.push(`${label}: dist/${distRel} sha256 ${actual} ≠ registry ${expected}`);
    return;
  }
  checked++;
}

/** A hosted entry with no (or an incomplete) integrity map is a fail-open
 * coverage collapse, not a pass — every mirrored file must carry a hash. */
function assertCoverage(integrity, hostedFiles, label) {
  const expected = 1 + (hostedFiles ?? []).length; // SKILL.md + companions
  const got = Object.keys(integrity ?? {}).length;
  if (got !== expected) {
    failures.push(`${label}: integrity covers ${got}/${expected} hosted files`);
  }
}

for (const s of registry.official) {
  assertCoverage(s.integrity, s.hostedFiles, `official ${s.id}`);
  for (const [rel, hash] of Object.entries(s.integrity ?? {})) {
    verify(`s/${s.id}/${rel}`, hash, `official ${s.id}`);
  }
  // Legacy flat route serves the same bytes — keep it inside coverage too.
  if (s.integrity?.["SKILL.md"]) {
    verify(`s/${s.id}.md`, s.integrity["SKILL.md"], `official ${s.id} (flat)`);
  }
}
for (const r of registry.ecosystem) {
  for (const s of r.skills) {
    if (!s.hostedPath) continue;
    assertCoverage(s.integrity, s.hostedFiles, `eco ${r.id}/${s.slug}`);
    for (const [rel, hash] of Object.entries(s.integrity ?? {})) {
      verify(`s/${r.id}/${s.slug}/${rel}`, hash, `eco ${r.id}/${s.slug}`);
    }
  }
}

for (const st of registry.superteam ?? []) {
  const got = Object.keys(st.integrity ?? {}).length;
  if (got !== (st.files ?? []).length) {
    failures.push(`superteam ${st.id}: integrity covers ${got}/${(st.files ?? []).length} hosted files`);
  }
  for (const [rel, hash] of Object.entries(st.integrity ?? {})) {
    verify(`s/${st.id}/${rel}`, hash, `superteam ${st.id}`);
  }
}

if (failures.length > 0) {
  console.error(`✗ ${failures.length} integrity failures:`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ ${checked} hosted files match their advertised sha256`);
