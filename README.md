# straightedge

React primitives that encode **mechanism, not markup**.

A straightedge has no scale on it. Its whole job is to answer one question — is this true, or only
nearly true — and it is the tool you reach for where "nearly" is the expensive part. These packages
are the parts of an application where nearly right costs you a bug report six months later:
virtualised lists that must not drift while the content above them grows, image caching that must
not serve a stale byte after a cache bust, test attributes that must mean the same thing to the
component emitting them and the test reading them back.

Each package installs on its own. Nothing here is a design system, and nothing here styles anything.

Packages publish under the `@firu-daniel` scope; `straightedge` is the repository they live in.

## Packages

| Package | What it is | Status |
|---|---|---|
| [`@firu-daniel/agent-qa-attrs`](packages/agent-qa-attrs) | A `data-qa-*` contract that makes an app deterministically drivable by end-to-end tests and browser-driving agents | Unreleased |
| `@firu-daniel/virtual-list` | A virtualisation engine with reversed-chat anchoring — the list stays put while content grows above it | Planned |
| `@firu-daniel/cached-image` | Image caching that survives a cache bust without serving a stale byte | Planned |
| `@firu-daniel/runtime-hooks` | Environment and performance hooks: keyboard inset, measured height, connectivity, tab visibility, scroll locking | Planned |
| `@firu-daniel/micro-interactions` | Small animated controls with their timing and reduced-motion behaviour already argued out | Planned |

[`ROADMAP.md`](ROADMAP.md) has what is coming and in what order.

## Why these and not others

The market for small presentational components is gone, and it is not coming back: teams vendor the
code, and a coding assistant writes a bespoke one on request. What survives is the package that
encodes an invariant somebody had to discover — a scroll anchor that holds under a prepend, a cache
key that changes when it must and not when it must not. Those are the ones a generated one-off gets
quietly wrong, and they are what this repository is limited to.

Every package ships the reasoning with the code. Where a design exists to prevent a specific bug, the
write-up for that bug is in the source, not lost in a commit message.

## Using a package

```bash
npm i @firu-daniel/agent-qa-attrs
```

Each package has its own README with its API and its arguments. React 18+ where React is involved;
TypeScript types ship with every package; ESM and CJS builds both.

## Working in this repository

```bash
npm install          # one install for every workspace
npm run dev          # the demo site, running every package's source
npm test             # the whole suite
npm run typecheck    # project references, all packages
npm run lint
```

- `packages/*` — one npm package each. Inside, `src/core` is the mechanism and imports no rendering
  library; `src/react` binds it. That boundary is enforced by lint, not by review.
- `apps/demo` — the demo site, aliased at the packages' sources so a change is on screen without a
  build step.
- Releases run on [changesets](https://github.com/changesets/changesets): a change that should ship
  carries a changeset, and the release workflow versions and publishes from it.

## How this repository is built

Every package after the first is extracted, tested, documented and released by an autonomous agentic
pipeline — [`autonomous-sdlc-harness`](https://github.com/firu-daniel/autonomous-sdlc-harness) —
running against this repository: it plans the work, implements it layer by layer, reviews its own
diff through several independent reviewers, drives the demo site in a real browser, and reports what
it cost. The run artifacts for each branch are committed under `sdlc-harness/`, so what the pipeline
decided is auditable next to what it produced.

This is a claim that is easy to make and hard to verify, which is why the evidence is in the tree
rather than in this paragraph.

## Licence

MIT © firu-daniel
