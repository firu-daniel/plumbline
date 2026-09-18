/**
 * The scope's two claims: it prefixes the ids beneath it, and it renders nothing.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { qaSelector } from '../core/qaSelector.js';
import { QaScope, useQaAttr } from './QaScope.js';

const Button = ({ id }: { id: string }) => <button {...useQaAttr({ id })}>press</button>;

describe('QaScope', () => {
  it('leaves an id unprefixed outside every scope', () => {
    render(<Button id="submit" />);
    expect(document.querySelector(qaSelector({ id: 'submit' }))).not.toBeNull();
  });

  it('prefixes an id with the enclosing area', () => {
    render(
      <QaScope name="login">
        <Button id="submit" />
      </QaScope>,
    );
    expect(document.querySelector(qaSelector({ id: 'login-submit' }))).not.toBeNull();
  });

  it('extends rather than replaces an enclosing scope', () => {
    render(
      <QaScope name="wallet">
        <QaScope name="list">
          <Button id="row-3" />
        </QaScope>
      </QaScope>,
    );
    expect(document.querySelector(qaSelector({ id: 'wallet-list-row-3' }))).not.toBeNull();
  });

  it('contributes nothing for an empty area name', () => {
    render(
      <QaScope name="">
        <Button id="submit" />
      </QaScope>,
    );
    expect(document.querySelector(qaSelector({ id: 'submit' }))).not.toBeNull();
  });

  it('renders no element of its own', () => {
    const { container } = render(
      <QaScope name="login">
        <Button id="submit" />
      </QaScope>,
    );
    expect(container.firstChild).toBe(screen.getByRole('button'));
    expect(container.childElementCount).toBe(1);
  });
});
