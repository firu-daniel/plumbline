/**
 * `@plumbline/agent-qa-attrs` — the `data-qa-*` contract that makes an
 * application deterministically drivable by browser-driving agents and
 * end-to-end tests.
 *
 * This entry point carries both halves. Consumers with no React dependency —
 * a test runner, a Node script — import `@plumbline/agent-qa-attrs/core`
 * instead, which pulls none of it.
 */

export * from './core/index.js';
export * from './react/index.js';
