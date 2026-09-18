/**
 * The emit side of the contract: which attributes appear, and which do not.
 *
 * The cases that matter are the absences — an option left out must produce no
 * attribute at all, because a test distinguishing "no status" from "empty
 * status" is reading the difference this file pins down.
 */

import { describe, expect, it } from 'vitest';

import { joinQaId, QA_ATTRIBUTE, qaAttr } from './qaAttr.js';

describe('qaAttr', () => {
  it('emits only the id attribute when only an id is given', () => {
    expect(qaAttr({ id: 'login-submit' })).toEqual({ 'data-qa-id': 'login-submit' });
  });

  it('emits a string value', () => {
    expect(qaAttr({ id: 'upload', value: 'ready' })).toEqual({
      'data-qa-id': 'upload',
      'data-qa-value': 'ready',
    });
  });

  it('stringifies a numeric value', () => {
    expect(qaAttr({ id: 'balance', value: 42 })).toEqual({
      'data-qa-id': 'balance',
      'data-qa-value': '42',
    });
  });

  it('emits a zero value rather than dropping it as falsy', () => {
    expect(qaAttr({ id: 'balance', value: 0 })).toEqual({
      'data-qa-id': 'balance',
      'data-qa-value': '0',
    });
  });

  it('emits an empty-string value rather than dropping it as falsy', () => {
    expect(qaAttr({ id: 'caption', value: '' })).toEqual({
      'data-qa-id': 'caption',
      'data-qa-value': '',
    });
  });

  it('emits a status token', () => {
    expect(qaAttr({ id: 'login-form', status: 'loading' })).toEqual({
      'data-qa-id': 'login-form',
      'data-qa-status': 'loading',
    });
  });

  it('emits value and status together', () => {
    expect(qaAttr({ id: 'upload', value: 'file.png', status: 'ready' })).toEqual({
      'data-qa-id': 'upload',
      'data-qa-value': 'file.png',
      'data-qa-status': 'ready',
    });
  });

  it('names the three attributes of the contract and no others', () => {
    expect(QA_ATTRIBUTE).toEqual({
      id: 'data-qa-id',
      value: 'data-qa-value',
      status: 'data-qa-status',
    });
  });
});

describe('joinQaId', () => {
  it('joins an area prefix to a local id', () => {
    expect(joinQaId('wallet', 'balance')).toBe('wallet-balance');
  });

  it('returns the local id unchanged when there is no prefix', () => {
    expect(joinQaId(undefined, 'balance')).toBe('balance');
  });

  it('returns the local id unchanged for an empty prefix', () => {
    expect(joinQaId('', 'balance')).toBe('balance');
  });
});
