import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Roadmap(): React.JSX.Element {
  return (
    <Layout title="Roadmap" description="แผนการพัฒนา Mellow">
      <main className={styles.pageMain}>
        <div className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>
            🗺️ Roadmap
          </Heading>
          <p className={styles.pageLead}>
            แผนการพัฒนาเพื่อพา Mellow ไปสู่ระดับ Industry Standard Runtime
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
              }}>✅ เสร็จสิ้น</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>v1.4.7</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              ปรับหน้าเว็บ + Docs, เพิ่ม Donate progress, เพิ่ม Playground UI
            </p>
          </div>

          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: '999px',
                border: '1px solid rgba(250,204,21,0.35)',
                background: 'rgba(250,204,21,0.14)', color: '#fde047', fontWeight: 800
              }}>🔄 กำลังทำ</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>v1.5.0</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Package Manager, Better Error Messages, Docs แบบ Rust-level, API reference
            </p>
          </div>

          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.20)',
                background: 'rgba(148,163,184,0.10)', color: '#cbd5e1', fontWeight: 800
              }}>⏳ รอทำ</span>
              <h3 style={{ margin: 0, fontWeight: 900 }}>v2.0.0</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              WebAssembly runtime (run in browser), Concurrency, Plugin System, Package registry
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}