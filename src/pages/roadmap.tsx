import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Roadmap(): React.JSX.Element {
  return (
    <Layout title="Roadmap" description="Mellow development roadmap">
      <main className={styles.pageMain}>
        <div className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>
            🗺️ Roadmap
          </Heading>
          <p className={styles.pageLead}>
            The Frozen Mellow 2.9 Core Profile is the current language contract. Runtime patch releases implement that frozen surface.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: '999px',
                border: '1px solid rgba(74,222,128,0.35)',
                background: 'rgba(74,222,128,0.14)', color: '#86efac', fontWeight: 800
              }}>✅ Current</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>Frozen Mellow 2.9 Core Profile</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Current frozen language contract. MellowLang <code>v2.9.5</code> is the current implementation release, with benchmark, security audit, release-gate, sandbox, and package integrity tooling.
            </p>
          </div>

          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: '999px',
                border: '1px solid rgba(250,204,21,0.35)',
                background: 'rgba(250,204,21,0.14)', color: '#fde047', fontWeight: 800
              }}>✅ Previous</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>v2.9.1</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Adds the official <code>core-llm</code> package, native tensor backend foundations, compiler caching, a faster CLI version path, and native C VM as the default engine for <code>mellow run</code>.
            </p>
          </div>

          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.20)',
                background: 'rgba(148,163,184,0.10)', color: '#cbd5e1', fontWeight: 800
              }}>🔄 Stability Track</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>v3.0</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              The next track focuses on locking the language contract, tooling behavior, modules and packages, error behavior, and examples behind the same gates.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
