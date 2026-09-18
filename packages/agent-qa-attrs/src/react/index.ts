/**
 * The React half of the contract. It binds `src/core`'s attribute helper to a
 * scope that travels down the tree; it adds no attribute family of its own.
 */

export { QaScope, useQaScope, useQaAttr } from './QaScope.js';
export type { QaScopeProps } from './QaScope.js';
