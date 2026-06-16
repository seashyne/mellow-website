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
            สถานะการพัฒนา MellowLang จาก release notes และ stability plan ของโปรเจกต์จริง
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
              <h3 style={{ margin: 0, fontWeight: 900 }}>v2.9.2</h3>
            </div>
            <p style={{ marginTop: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
              เพิ่ม <code>mellow bench</code>, <code>mellow security audit</code> และ <code>mellow release-gate</code> พร้อม AI tool policy แบบ default-deny, sandbox checks และ package integrity gate
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
              เพิ่ม official <code>core-llm</code>, native tensor backend foundation, compiler cache, fast CLI version path และทำให้ native C VM เป็น default engine สำหรับ <code>mellow run</code>
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
              แผนถัดไปคือ v3 stability track: ล็อก contract ของภาษา, tooling, modules/packages, error behavior และตัวอย่างที่ต้องผ่าน gate เดียวกัน
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
