import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

import donation from '../data/donations.json';

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString('en-US')} ${currency}`;
  }
}

export default function Donate(): React.JSX.Element {
  const currency = donation.currency || 'THB';
  const raised = Number(donation.raised || 0);
  const goal = Math.max(Number(donation.goal || 0), 1);
  const pct = Math.min(100, Math.max(0, Math.round((raised / goal) * 100)));
  const cryptoWalletAddress = '0xe505C178c891F91Ce94c8EDbA8a1611E32c8574c';

  return (
    <Layout title="Support" description="Support Mellow development">
      <main className={styles.pageMain}>
        <div className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>
            Support the Project
          </Heading>
          <p className={styles.pageLead}>
            Mellow is an independent language project. Support helps keep the runtime, docs, tests, and examples moving forward.
          </p>
        </div>

        <div className={styles.donateGrid}>
          <div className={styles.card}>
            <div className={styles.donateHeaderRow}>
              <div>
                <h2 className={styles.donateH2}>Funding Progress</h2>
                <p className={styles.donateMeta}>
                  Last updated: <strong>{donation.lastUpdated || '-'}</strong>
                </p>
              </div>
              <span className={styles.donateBadge}>Goal {formatMoney(goal, currency)}</span>
            </div>

            <div className={styles.donateNumbers}>
              <div className={styles.donateNumberBox}>
                <div className={styles.donateBig}>{formatMoney(raised, currency)}</div>
                <div className={styles.donateSmall}>Raised</div>
              </div>
              <div className={styles.donateNumberBox}>
                <div className={styles.donateBig}>{pct}%</div>
                <div className={styles.donateSmall}>Complete</div>
              </div>
            </div>

            <div className={styles.progressOuter} aria-label="donation progress">
              <div className={styles.progressInner} style={{ width: `${pct}%` }} />
            </div>

            {donation.note ? <p className={styles.donateNote}>{donation.note}</p> : null}
          </div>

          <div className={styles.card}>
            <h2 className={styles.donateH2}>Support helps with</h2>
            <ul className={styles.donateList}>
              <li>CLI and runtime stability</li>
              <li>Test suites and CI coverage</li>
              <li>Documentation and runnable examples</li>
              <li>Sandbox and release-gate tooling</li>
            </ul>
            <p className={styles.mutedNote} style={{ marginTop: '1rem', textAlign: 'left' }}>
              Thank you for helping Mellow keep moving.
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
              onClick={() => {
                navigator.clipboard.writeText(cryptoWalletAddress);
                alert('Ethereum wallet address copied.');
              }}
            >
              Copy Ethereum Wallet
            </button>
          </div>

          <p className={styles.walletAddress}>
            Ethereum: <code>{cryptoWalletAddress}</code>
          </p>

          <p className={styles.mutedNote}>
            Funding totals are currently updated manually from available support channels.
          </p>
        </div>
      </main>
    </Layout>
  );
}
