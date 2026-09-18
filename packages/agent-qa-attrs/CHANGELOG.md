# @firu-daniel/agent-qa-attrs

## 0.1.0

### Minor Changes

- b7ae4be: First release: the `data-qa-*` contract — `qaAttr` for the emitting side, `qaSelector` for the
  reading side so the two cannot drift, and `QaScope` / `useQaAttr` to make the id-prefix convention
  structural rather than something each call site has to remember. The `/core` entry point carries the
  framework-agnostic half and pulls no React.
