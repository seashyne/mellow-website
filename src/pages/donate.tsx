import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

import donation from '../data/donations.json';

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString('th-TH')} ${currency}`;
  }
}

export default function Donate(): React.JSX.Element {
  const currency = donation.currency || 'THB';
  const raised = Number(donation.raised || 0);
  const goal = Math.max(Number(donation.goal || 0), 1);
  const pct = Math.min(100, Math.max(0, Math.round((raised / goal) * 100)));
  const cryptoWalletAddress = '';

  return (
    <Layout title="สนับสนุน" description="สนับสนุนการพัฒนา Mellow">
      <main className={styles.pageMain}>
        <div className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>
            💖 สนับสนุนโปรเจกต์
          </Heading>
          <p className={styles.pageLead}>
            การพัฒนา Mellow ต้องใช้เวลาและทรัพยากร หากคุณชอบโปรเจกต์นี้
            การสนับสนุนของคุณช่วยให้พัฒนาได้เร็วและไกลขึ้น
          </p>
        </div>

        <div className={styles.donateGrid}>
          <div className={styles.card}>
            <div className={styles.donateHeaderRow}>
              <div>
                <h2 className={styles.donateH2}>ยอดสนับสนุนรวม</h2>
                <p className={styles.donateMeta}>
                  อัปเดตล่าสุด: <strong>{donation.lastUpdated || '-'}</strong>
                </p>
              </div>
              <span className={styles.donateBadge}>🎯 เป้าหมาย {formatMoney(goal, currency)}</span>
            </div>

            <div className={styles.donateNumbers}>
              <div className={styles.donateNumberBox}>
                <div className={styles.donateBig}>{formatMoney(raised, currency)}</div>
                <div className={styles.donateSmall}>ได้รับแล้ว</div>
              </div>
              <div className={styles.donateNumberBox}>
                <div className={styles.donateBig}>{pct}%</div>
                <div className={styles.donateSmall}>ความคืบหน้า</div>
              </div>
            </div>

            <div className={styles.progressOuter} aria-label="donation progress">
              <div className={styles.progressInner} style={{ width: `${pct}%` }} />
            </div>

            {donation.note ? <p className={styles.donateNote}>{donation.note}</p> : null}
          </div>

          <div className={styles.card}>
            <h2 className={styles.donateH2}>เงินสนับสนุนถูกใช้เพื่อ</h2>
            <ul className={styles.donateList}>
              <li>📦 พัฒนา CLI / Runtime ให้เสถียรขึ้น</li>
              <li>🧪 เพิ่ม Test Suite และ CI</li>
              <li>📚 ทำเอกสารไทย + ตัวอย่างโปรเจกต์</li>
              <li>🛡️ เพิ่ม Sandbox/Deterministic tools</li>
            </ul>
            <p className={styles.mutedNote} style={{ marginTop: '1rem', textAlign: 'left' }}>
              ขอบคุณมากครับ ❤️ ทุกบาทช่วยให้ Mellow ไปได้ไกลขึ้น
            </p>
          </div>
        </div>

        <div className={styles.card} style={{ marginTop: '1.25rem' }}>
          <div className={styles.buttonRow}>
            <Link
              className={`${styles.btn} ${styles.btnDanger}`}
              to="https://github.com/sponsors/seashyne"
              target="_blank"
              rel="noreferrer"
            >
              💜 GitHub Sponsors
            </Link>

            <Link
              className={`${styles.btn} ${styles.btnYellow}`}
              to="https://buymeacoffee.com/seashyne"
              target="_blank"
              rel="noreferrer"
            >
              ☕ Buy Me a Coffee
            </Link>

            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              type="button"
              disabled={!cryptoWalletAddress}
              onClick={() => {
                if (!cryptoWalletAddress) return;
                navigator.clipboard.writeText(cryptoWalletAddress);
                alert('คัดลอกที่อยู่ Wallet แล้ว!');
              }}
            >
              ₿ Crypto Wallet เร็ว ๆ นี้
            </button>
          </div>

          <p className={styles.mutedNote}>
            ถ้าคุณอยากให้ยอดขึ้น “อัตโนมัติ” เราสามารถเชื่อม endpoint (เช่น Vercel Serverless) เพื่อรวมยอดจากหลายช่องทางได้
          </p>
        </div>
      </main>
    </Layout>
  );
}
