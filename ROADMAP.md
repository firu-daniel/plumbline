# Roadmap

What is planned beyond what is in the tree today. For what ships now, see [`README.md`](README.md).

Nothing here is a schedule. The order below is the intended one; it changes when something learned
while building an earlier package says it should.

**Status:** `Open` · `In progress` · `Released`

## Packages

| Package | What it is, and the invariant it exists to hold | Status |
|---|---|---|
| `@straightedge/agent-qa-attrs` | A `data-qa-*` contract shared by the component that emits an attribute and the test that reads it back, so the two cannot drift. Scoped ids, a status token to wait on, a selector builder for the reading side. | In progress |
| `@straightedge/virtual-list` | A virtualisation engine with **reversed-chat anchoring**: the viewport holds its position while content is prepended above it, across variable row heights and asynchronous measurement. The flagship, and the one mechanism here with no good equivalent on npm. | Open |
| `@straightedge/cached-image` | Image caching with a cache key that changes exactly when the bytes do — no stale image after a bust, no re-fetch after a re-render — and a size estimate that does not lie to a layout. | Open |
| `@straightedge/runtime-hooks` | Environment and performance hooks an application keeps rewriting: keyboard inset from `visualViewport`, measured height over a callback-ref `ResizeObserver`, connectivity, tab visibility, body scroll locking. SSR-defensive throughout. | Open |
| `@straightedge/micro-interactions` | Small animated controls — a play/pause morph, an animated bubble button, expandable rich text — with their timing, reduced-motion behaviour and style-injection already argued out. | Open |

## Considered for later

| Package | What it would be | Status |
|---|---|---|
| Collapsing headers | A collapsing top bar and the list that drives it, sharing one scroll source without a second scroll listener. | Open |
| Video toolkit | An encrypted HLS loader, a element registry that keeps one video playing at a time, and a progress bar that does not fight the player's own seeking. | Open |
| Keep-alive router | Route-level keep-alive caching for React Router, with an explicit page lifecycle (`onInit` / `onPush` / `onPopNext` / `onDispose`) and frame-time-aware trimming of what is kept. The largest mechanism of the set. | Open |

## Distribution

| Item | What it is | Status |
|---|---|---|
| npm releases via changesets | Every package versioned and published from a changeset, with provenance, on merge to `main`. | In progress |
| Demo site | One page per package, running the packages' own source, deployed. It is also the surface the end-to-end runs drive. | In progress |
| Vendorable distribution | A shadcn-style registry beside the npm packages for the smaller ones, so a consumer can take the code instead of the dependency. | Open |
| Agent-legible docs | `llms.txt` and per-package docs written to be read by a coding agent as well as a person, since that is how a good share of these packages will actually be consumed. | Open |

## Engineering

| Item | What it is | Status |
|---|---|---|
| `src/core` / `src/react` boundary | The mechanism knows nothing about a rendering library; only the binding layer does. Enforced by lint. | Released |
| Bundle-size budgets in CI | A published size per package, failing the build on an unexplained jump — the number a consumer of a small package actually cares about. | Open |
| Browser matrix for the mechanisms | The scroll, measurement and caching packages verified beyond a single engine, since their invariants are exactly where engines differ. | Open |
| A second rendering binding | `src/core` is framework-agnostic by construction, so a non-React binding is a question of demand rather than of design. | Open |
