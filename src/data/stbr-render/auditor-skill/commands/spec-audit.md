
# auditor-skill — Spec Compliance (Mode 5)

**Arguments:** $ARGUMENTS

1. Extract a requirement list (Spec-IR) from the supplied spec.
2. Run Phase 0 setup + Phase 0.5 Context Reconstruction; map each instruction / state field to the spec's stated behavior.
3. Build a **Compliance Matrix**: each requirement → `[MET]` / `[VIOLATED-N]` / `[UNIMPLEMENTED]` / `[UNDOCUMENTED-BEHAVIOR]`, cited to code `L#`.
4. Any `[VIOLATED-N]` with N≥6 must pass the Rule 5b gate. `[UNDOCUMENTED-BEHAVIOR]` (code does something the spec never authorizes) is itself a finding.
5. Report the Compliance Matrix + findings.
