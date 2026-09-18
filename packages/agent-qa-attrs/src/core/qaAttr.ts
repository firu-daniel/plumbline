/**
 * The `data-qa-*` attribute contract, and the helper that emits it.
 *
 * This is a test affordance, not a styling or behaviour hook: a single,
 * documented way to tag DOM elements with deterministic attributes so a
 * browser-driving agent or an end-to-end test can locate elements, read their
 * state, and assert on values without relying on brittle CSS selectors or on
 * matching user-visible text. A test plan written in terms of these ids is a
 * contract between whoever writes the plan and whoever writes the component.
 *
 * ## The three attribute families (all prefixed `data-qa-`)
 *
 * - `data-qa-id="<stable-element-id>"` — a stable, human-readable identifier
 *   for an element a test needs to find or click (`"login-submit"`,
 *   `"message-input"`). Keep it unique within a page; for list rows, suffix the
 *   entity id (`"message-<messageId>"`).
 * - `data-qa-value="<value>"` — the asserted value of an element when the
 *   visible text is not a reliable assertion target (a formatted balance, a
 *   localized label). Use it when the test must read state, not just presence.
 * - `data-qa-status="<state>"` — a coarse lifecycle token for stateful widgets
 *   (`"loading" | "ready" | "error"`), so a test can wait for a known token
 *   rather than guessing on a spinner.
 *
 * ## Rules
 *
 * - The attributes are **additive and inert**: they never carry business logic,
 *   never affect rendering, and are safe to ship to production. They are
 *   deliberately *not* stripped behind an environment flag — an attribute that
 *   exists only in a test build cannot be relied on by a test that drives the
 *   real one.
 * - Only these three families. A new need extends the contract by a documented
 *   change here, never by a one-off attribute name invented at a call site.
 * - The values are test tokens, not user-visible copy. They are intentionally
 *   hardcoded identifier strings and are exempt from localization by design.
 *
 * ## Usage
 *
 * ```tsx
 * <button {...qaAttr({ id: 'login-submit' })}>Continue</button>
 * <span {...qaAttr({ id: 'balance', value: balance })}>{formatted}</span>
 * <div {...qaAttr({ id: 'upload', status: 'ready' })} />
 * ```
 */

/** The three attribute names this contract defines, spelled once. */
export const QA_ATTRIBUTE = {
  id: 'data-qa-id',
  value: 'data-qa-value',
  status: 'data-qa-status',
} as const;

/** What {@link qaAttr} accepts. Only `id` is required; the rest are emitted when present. */
export interface QaAttrOptions {
  /** Stable, human-readable element identifier (`data-qa-id`). */
  id: string;
  /** Asserted value when visible text is not a reliable target (`data-qa-value`). */
  value?: string | number;
  /** Coarse lifecycle token, e.g. `loading` | `ready` | `error` (`data-qa-status`). */
  status?: string;
}

/** The emitted attribute bag: attribute name to string value, ready to spread onto an element. */
export type QaAttributes = Record<string, string>;

/**
 * Build the `data-qa-*` attribute bag to spread onto an element.
 *
 * Only the keys whose option was provided are emitted, so an absent option
 * produces no attribute rather than an empty-string one — a test asserting on
 * `data-qa-status` must be able to distinguish "no status" from "empty status".
 * `value` is stringified, and `0` and `''` are values like any other: the check
 * is against `undefined`, never against falsiness.
 */
export const qaAttr = (options: QaAttrOptions): QaAttributes => {
  const attributes: QaAttributes = { [QA_ATTRIBUTE.id]: options.id };

  if (options.value !== undefined) {
    attributes[QA_ATTRIBUTE.value] = String(options.value);
  }

  if (options.status !== undefined) {
    attributes[QA_ATTRIBUTE.status] = options.status;
  }

  return attributes;
};

/**
 * Join an area prefix and a local id into one contract-shaped id.
 *
 * The naming rule is that an id carries the feature area it belongs to, so two
 * features never collide on a bare `"submit"`. An empty or absent prefix
 * returns the local id unchanged, which is what makes an unscoped call site and
 * a scoped one produce the same shape.
 */
export const joinQaId = (prefix: string | undefined, id: string): string =>
  prefix === undefined || prefix === '' ? id : `${prefix}-${id}`;
