/**
 * The framework-agnostic half of the contract: the attribute names, the helper
 * that emits them, and the selector that reads them back. Nothing here imports
 * a rendering library, so a test runner, a Node script or a non-React
 * application can depend on `@firu-daniel/agent-qa-attrs/core` alone.
 */

export { QA_ATTRIBUTE, qaAttr, joinQaId } from './qaAttr.js';
export type { QaAttrOptions, QaAttributes } from './qaAttr.js';
export { qaSelector } from './qaSelector.js';
