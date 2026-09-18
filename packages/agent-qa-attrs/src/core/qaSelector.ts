/**
 * The read side of the `data-qa-*` contract: turning the attributes a component
 * emits into the selector a test or a browser-driving agent looks them up by.
 *
 * It exists so the two sides cannot drift. A test that hand-writes
 * `[data-qa-id="login-submit"]` has copied an attribute name that only
 * `qaAttr` should know; when the contract gains or renames a family, the
 * hand-written selector keeps compiling and silently stops matching.
 */

import { QA_ATTRIBUTE, type QaAttrOptions } from './qaAttr.js';

/** Escape a value for use inside a CSS attribute selector's quoted string. */
const escapeAttributeValue = (value: string): string => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

/**
 * Build a CSS attribute selector matching the elements {@link qaAttr} would
 * emit for the same options.
 *
 * Every provided option narrows the selector, in the contract's own order, so
 * `{ id: 'upload', status: 'ready' }` yields
 * `[data-qa-id="upload"][data-qa-status="ready"]` — the "wait until this
 * element reaches this state" query, expressed once.
 */
export const qaSelector = (options: QaAttrOptions): string => {
  let selector = `[${QA_ATTRIBUTE.id}="${escapeAttributeValue(options.id)}"]`;

  if (options.value !== undefined) {
    selector += `[${QA_ATTRIBUTE.value}="${escapeAttributeValue(String(options.value))}"]`;
  }

  if (options.status !== undefined) {
    selector += `[${QA_ATTRIBUTE.status}="${escapeAttributeValue(options.status)}"]`;
  }

  return selector;
};
