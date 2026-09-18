/**
 * The React binding: an area prefix that travels down the tree, so a call site
 * names only the element it is tagging.
 *
 * The contract's naming rule — every id carries the feature area it belongs to,
 * so two features never collide on a bare `"submit"` — is a rule a call site
 * has to remember on its own the moment the prefix is typed by hand. A scope
 * makes the prefix structural instead: a feature declares its area once, and
 * every `useQaAttr` beneath it emits `"<area>-<id>"` whether or not whoever
 * wrote that line was thinking about the convention.
 *
 * Scopes nest, and a nested scope extends rather than replaces its parent's
 * prefix: a `list` scope inside a `wallet` scope tags `"wallet-list-row-3"`.
 * That is what lets a component that is reused in two places carry its own
 * scope without deciding where it will be mounted.
 */

import { createContext, createElement, useContext, useMemo, type ReactNode } from 'react';

import { joinQaId, qaAttr, type QaAttributes, type QaAttrOptions } from '../core/qaAttr.js';

/** The prefix in effect for the subtree, or `undefined` at the root where there is none. */
const QaScopeContext = createContext<string | undefined>(undefined);

export interface QaScopeProps {
  /**
   * The area name contributed by this scope, joined to any enclosing one.
   * An empty name contributes nothing, which is what makes a conditionally
   * scoped component legal without a second code path.
   */
  name: string;
  children: ReactNode;
}

/**
 * Declare the area every `data-qa-id` beneath this point belongs to.
 *
 * It renders no element of its own — it is a context provider and nothing else,
 * so dropping one into a layout can never change the DOM a test is driving.
 */
export const QaScope = ({ name, children }: QaScopeProps) => {
  const parent = useContext(QaScopeContext);
  const value = useMemo(() => joinQaId(parent, name), [parent, name]);

  return createElement(QaScopeContext.Provider, { value }, children);
};

/**
 * The prefix in effect at this point in the tree, or `undefined` outside every
 * scope. Exposed for the case a component needs the id string itself — a test
 * hook that reports which element it will drive, for instance — rather than the
 * attribute bag.
 */
export const useQaScope = (): string | undefined => useContext(QaScopeContext);

/**
 * Build the `data-qa-*` attribute bag for an element, with the enclosing scope's
 * area already applied to its id.
 *
 * Outside any scope it is exactly `qaAttr`, so a component is free to use it
 * before anyone has decided whether the feature around it gets a scope.
 */
export const useQaAttr = (options: QaAttrOptions): QaAttributes => {
  const prefix = useQaScope();
  const { id, value, status } = options;

  return useMemo(() => qaAttr({ id: joinQaId(prefix, id), value, status }), [prefix, id, value, status]);
};
