# `@firu-daniel/agent-qa-attrs`

A `data-qa-*` attribute contract that makes a React application deterministically drivable — by an
end-to-end test, and by a browser-driving agent that has to find an element without being told where
it is on screen.

```bash
npm i @firu-daniel/agent-qa-attrs
```

## Why an attribute contract rather than test ids scattered by hand

A test that clicks `button.primary:nth-child(2)` breaks on a layout change. A test that clicks the
button reading "Continue" breaks on a copy change, and breaks in every locale but one. Both failures
look like a broken feature and are not one.

The alternative is an attribute whose only job is to be stable. That part is well understood. What is
not is keeping the two sides of it honest: the component that emits the attribute and the test that
looks it up have to agree on the attribute's name, on what an absent value means, and on how an id is
composed — and nothing checks that agreement when each side spells it out separately.

This package is that agreement, written once.

## The three families

| Attribute | Carries | Use it when |
|---|---|---|
| `data-qa-id` | A stable, human-readable element identifier | Anything a test refers to by name |
| `data-qa-value` | The asserted value of an element | Visible text is formatted, localized, or otherwise not a reliable assertion target |
| `data-qa-status` | A coarse lifecycle token — `loading`, `ready`, `error` | A test must wait for a state rather than guess on a spinner |

There is no fourth family, and adding one is a change to this package rather than a new attribute
name invented at a call site.

## Emitting them

```tsx
import { qaAttr } from '@firu-daniel/agent-qa-attrs';

<button {...qaAttr({ id: 'login-submit' })}>Continue</button>
<span {...qaAttr({ id: 'balance', value: balance })}>{formatted}</span>
<div {...qaAttr({ id: 'upload', status: 'ready' })} />
```

An option that is not given produces no attribute at all — never an empty-string one, so a test can
distinguish "no status" from "empty status". `0` and `''` are values like any other: the check is
against `undefined`, never against falsiness.

## Scoping ids to their feature

Every id carries the area it belongs to, so two features never collide on a bare `submit`. Typing
that prefix at each call site is a rule someone has to remember; a scope makes it structural.

```tsx
import { QaScope, useQaAttr } from '@firu-daniel/agent-qa-attrs';

const Submit = () => <button {...useQaAttr({ id: 'submit' })}>Continue</button>;

<QaScope name="login">
  <Submit /> {/* data-qa-id="login-submit" */}
</QaScope>;
```

Scopes nest and extend rather than replace, so a component that carries its own scope can be mounted
anywhere: a `list` scope inside a `wallet` scope tags `wallet-list-row-3`. `QaScope` renders no
element of its own, so dropping one into a layout cannot change the DOM a test is driving.

## Reading them back

```ts
import { qaSelector } from '@firu-daniel/agent-qa-attrs/core';

await page.click(qaSelector({ id: 'login-submit' }));
await page.waitForSelector(qaSelector({ id: 'upload', status: 'ready' }));
```

`qaSelector` builds the selector matching exactly what `qaAttr` emits for the same options, so the
two sides cannot drift: when the contract changes, a hand-written `[data-qa-id="…"]` keeps compiling
and silently stops matching, and this does not.

The `/core` entry point is framework-agnostic and pulls no React — it is what a test runner, a Node
script or a non-React application imports.

## Shipping them to production

These attributes are inert `data-*` attributes. They carry no logic, affect no rendering, and are
deliberately **not** stripped behind an environment flag: an attribute that exists only in a test
build cannot be relied on by a test that drives the real one.

Their values are test tokens rather than user-visible copy — hardcoded identifier strings, exempt
from localization by design.

## API

| Export | Entry point | What it does |
|---|---|---|
| `qaAttr(options)` | root, `/core` | Builds the attribute bag to spread onto an element |
| `qaSelector(options)` | root, `/core` | Builds the CSS selector matching what `qaAttr` emits |
| `joinQaId(prefix, id)` | root, `/core` | Joins an area prefix to a local id |
| `QA_ATTRIBUTE` | root, `/core` | The three attribute names, spelled once |
| `QaScope` | root | Declares the area every id beneath it belongs to |
| `useQaAttr(options)` | root | `qaAttr` with the enclosing scope applied |
| `useQaScope()` | root | The prefix in effect at this point in the tree |

MIT © firu-daniel
