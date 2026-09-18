/**
 * Test setup, shared by every package's suite.
 *
 * `globals: false` is deliberate — a test imports what it uses — and the cost
 * of it is that Testing Library's automatic cleanup, which registers itself
 * through the global `afterEach`, never runs. Without the hook below, each
 * render is left mounted and a `screen` query in a later test in the same file
 * matches elements from an earlier one.
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  // Elements a test built by hand, outside a render, are not Testing Library's
  // to clean up and would otherwise leak into the next test's queries.
  document.body.replaceChildren();
});
