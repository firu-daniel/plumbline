---
'@straightedge/agent-qa-attrs': minor
---

First release: the `data-qa-*` contract — `qaAttr` for the emitting side, `qaSelector` for the
reading side so the two cannot drift, and `QaScope` / `useQaAttr` to make the id-prefix convention
structural rather than something each call site has to remember. The `/core` entry point carries the
framework-agnostic half and pulls no React.
