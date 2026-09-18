/**
 * The read side of the contract, pinned to the emit side: a selector built from
 * a set of options must match the element those same options produce.
 */

import { describe, expect, it } from 'vitest';

import { qaAttr } from './qaAttr.js';
import { qaSelector } from './qaSelector.js';

/** Render an element carrying exactly the attributes `qaAttr` emits for these options. */
const elementFor = (options: Parameters<typeof qaAttr>[0]): HTMLElement => {
  const element = document.createElement('div');
  for (const [name, value] of Object.entries(qaAttr(options))) {
    element.setAttribute(name, value);
  }
  document.body.replaceChildren(element);
  return element;
};

describe('qaSelector', () => {
  it('selects on the id alone', () => {
    expect(qaSelector({ id: 'login-submit' })).toBe('[data-qa-id="login-submit"]');
  });

  it('narrows on value and status, in contract order', () => {
    expect(qaSelector({ id: 'upload', value: 'file.png', status: 'ready' })).toBe(
      '[data-qa-id="upload"][data-qa-value="file.png"][data-qa-status="ready"]',
    );
  });

  it('escapes a quote in a value so the selector stays parseable', () => {
    const selector = qaSelector({ id: 'caption', value: 'a "quoted" word' });
    expect(selector).toBe('[data-qa-id="caption"][data-qa-value="a \\"quoted\\" word"]');
    expect(() => document.querySelector(selector)).not.toThrow();
  });

  it('matches the element qaAttr emits for the same options', () => {
    const options = { id: 'upload', value: 'file.png', status: 'ready' } as const;
    const element = elementFor(options);
    expect(document.querySelector(qaSelector(options))).toBe(element);
  });

  it('does not match when the status has not been reached yet', () => {
    elementFor({ id: 'upload', status: 'loading' });
    expect(document.querySelector(qaSelector({ id: 'upload', status: 'ready' }))).toBeNull();
  });
});
