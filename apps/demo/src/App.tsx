/**
 * The demo site.
 *
 * One section per package. Each section runs the real package — the Vite config
 * aliases every `@straightedge/*` import at this package's source — and shows what
 * it emits, so the page doubles as the surface an end-to-end run drives.
 */

import { useState } from 'react';
import { QaScope, qaAttr, qaSelector, useQaAttr } from '@straightedge/agent-qa-attrs';

type UploadStatus = 'idle' | 'loading' | 'ready' | 'error';

const STATUS_ORDER: readonly UploadStatus[] = ['idle', 'loading', 'ready', 'error'];

/** A scoped button, to show the prefix arriving from the tree rather than the call site. */
const ScopedButton = ({ id, label }: { id: string; label: string }) => (
  <button className="button" {...useQaAttr({ id })}>
    {label}
  </button>
);

/** The attributes an element is actually carrying, read back off the DOM. */
const Emitted = ({ attributes }: { attributes: Record<string, string> }) => (
  <pre className="emitted">
    {Object.entries(attributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join('\n')}
  </pre>
);

export const App = () => {
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState<UploadStatus>('idle');

  return (
    <main className="page">
      <header className="header">
        <h1>straightedge</h1>
        <p className="tagline">React primitives that encode mechanism, not markup.</p>
      </header>

      <section className="section" {...qaAttr({ id: 'section-agent-qa-attrs' })}>
        <h2>
          <code>@straightedge/agent-qa-attrs</code>
        </h2>
        <p>
          A <code>data-qa-*</code> contract that makes this page drivable by an end-to-end test or a
          browser-driving agent, without a single CSS or text selector.
        </p>

        <div className="demo">
          <h3>A value a test can assert on</h3>
          <p>The visible text is formatted; the attribute is not. A test reads the attribute.</p>
          <div className="row">
            <span className="balance" {...qaAttr({ id: 'balance', value: balance })}>
              {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </span>
            <button
              className="button"
              onClick={() => setBalance((n) => n + 1)}
              {...qaAttr({ id: 'balance-increment' })}
            >
              Add one
            </button>
            <button className="button" onClick={() => setBalance(0)} {...qaAttr({ id: 'balance-reset' })}>
              Reset
            </button>
          </div>
          <Emitted attributes={qaAttr({ id: 'balance', value: balance })} />
        </div>

        <div className="demo">
          <h3>A state a test can wait for</h3>
          <p>A status token, so a test waits on a known state instead of guessing on a spinner.</p>
          <div className="row">
            <div className="status" {...qaAttr({ id: 'upload', status })}>
              {status}
            </div>
            {STATUS_ORDER.map((next) => (
              <button
                key={next}
                className="button"
                onClick={() => setStatus(next)}
                {...qaAttr({ id: `upload-set-${next}` })}
              >
                {next}
              </button>
            ))}
          </div>
          <Emitted attributes={qaAttr({ id: 'upload', status })} />
          <p className="hint">
            The query that waits for it: <code>{qaSelector({ id: 'upload', status: 'ready' })}</code>
          </p>
        </div>

        <div className="demo">
          <h3>An id scoped by the tree</h3>
          <p>
            Both buttons are the same component asking for the id <code>submit</code>. The area comes from the
            scope around them.
          </p>
          <div className="row">
            <QaScope name="login">
              <ScopedButton id="submit" label="login-submit" />
            </QaScope>
            <QaScope name="wallet">
              <QaScope name="transfer">
                <ScopedButton id="submit" label="wallet-transfer-submit" />
              </QaScope>
            </QaScope>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a href="https://github.com/firu-daniel/straightedge" {...qaAttr({ id: 'footer-repository-link' })}>
          github.com/firu-daniel/straightedge
        </a>
      </footer>
    </main>
  );
};
