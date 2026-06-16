import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

type UseCaseItem = {
  title: string;
  examples: string[];
  icon: string;
};

const FEATURE_LIST: FeatureItem[] = [
  {
    title: '🧩 Stable Core',
    description:
      'Mellow 2.9.2 ล็อก surface หลัก: let, def, if/while/for, range, list/map literals และ helpers ที่ใช้จริงใน production scripts',
    icon: '🧩',
    color: '#f472b6',
  },
  {
    title: '⚙️ Native by Default',
    description:
      'mellow run ใช้ native C VM เป็นค่าเริ่มต้น พร้อม fallback ไป Python VM เมื่อใช้ debugger, events หรือ record/replay',
    icon: '⚙️',
    color: '#4ade80',
  },
  {
    title: '🛡️ Sandboxed Data',
    description:
      'มี sandbox profile สำหรับ finance/data, money precision, bounded JSONL/CSV, SQLite แบบจำกัด และ immutable ledger primitives',
    icon: '🛡️',
    color: '#fbbf24',
  },
  {
    title: '🚦 Release Gates',
    description:
      'เพิ่ม mellow bench, mellow security audit และ mellow release-gate สำหรับ benchmark, sandbox checks และ package integrity',
    icon: '🚦',
    color: '#38bdf8',
  },
];

const USE_CASE_LIST: UseCaseItem[] = [
  {
    title: '🧪 Core Scripts',
    examples: ['CLI automation', 'Rule scripts', 'Tooling tasks', 'Deterministic tests'],
    icon: '🧪',
  },
  {
    title: '💰 Finance/Data',
    examples: ['Decimal money', 'Ledger rules', 'JSONL/CSV batches', 'SQLite queries'],
    icon: '💰',
  },
  {
    title: '🤖 AI Tooling',
    examples: ['Default-deny tools', 'Explicit allow policy', 'Core LLM package', 'Native tensor batching'],
    icon: '🤖',
  },
  {
    title: '🚀 Native Runtime',
    examples: ['C lexer/compiler', 'Bytecode runtime', 'Standalone executable', 'Python fallback'],
    icon: '🚀',
  },
];

const LATEST_VERSION = 'v2.9.2';

function Feature({ title, description, icon, color }: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCard)}>
      <div className={styles.featureIcon} style={{ backgroundColor: `${color}20`, color }}>
        <span style={{ fontSize: '2.5rem' }}>{icon}</span>
      </div>
      <h3 className={styles.featureTitle} style={{ color }}>
        {title}
      </h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function UseCase({ title, examples, icon }: UseCaseItem) {
  return (
    <div className={clsx('col col--3', styles.useCaseCard)}>
      <div className={styles.useCaseIcon}>
        <span style={{ fontSize: '2.5rem' }}>{icon}</span>
      </div>
      <h3 className={styles.useCaseTitle}>{title}</h3>
      <ul className={styles.useCaseList}>
        {examples.map((example, idx) => (
          <li key={idx}>{example}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  // ✅ สำคัญ: กัน logo หายบน Vercel/GitHub Pages/custom domain
  const logoSrc = useBaseUrl('/img/Logo.png');

  const DOC_WHAT_IS = '/docs/intro/what-is-mellow';
  const DOC_INSTALL = '/docs/intro/installation';
  const DOC_SYNTAX = '/docs/language/syntax';
  const DOC_CAN_DO = '/docs/intro/what-can-mellow-do';

  return (
      <Layout
      title={`${siteConfig.title} - Sandbox Scripting Language`}
      description="MellowLang 2.9.2 คือ sandbox scripting language สำหรับ games, tools และ AI-era automation"
    >
      <header className={clsx('hero hero--dark', styles.heroBanner)}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.badgePulse}>✨</span> {LATEST_VERSION}
            </div>

            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              Mellow
            </Heading>

            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              &quot;Small, deterministic, auditable scripting for tools, games, and AI-era workflows.&quot;
            </p>

            <p className={styles.heroDescription}>
              MellowLang 2.9.2 โฟกัส stable language core, native C runtime,
              <br />
              sandbox profiles และ release gates ที่ตรวจสอบได้
            </p>

            <div className={styles.heroButtons}>
              <Link className={clsx('button button--primary button--lg', styles.heroButton)} to={DOC_WHAT_IS}>
                🚀 เริ่มต้นใช้งาน
              </Link>

              <Link className={clsx('button button--secondary button--lg', styles.heroButton)} to="/playground">
                🧪 Playground
              </Link>

              <Link className={clsx('button button--secondary button--lg', styles.heroButton)} to={DOC_SYNTAX}>
                📖 Syntax
              </Link>

              <Link className={clsx('button button--secondary button--lg', styles.heroButton)} to={DOC_CAN_DO}>
                ✅ ทำอะไรได้บ้าง
              </Link>

              <Link
                className={clsx('button button--outline button--lg', styles.heroButton)}
                to="https://github.com/seashyne/Mellowlang"
                target="_blank"
                rel="noreferrer"
              >
                ⬇️ ดาวน์โหลด CLI
              </Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroLogoWrap}>
              <img src={logoSrc} alt="Mellow Logo" className={styles.heroLogo} />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2" className={styles.sectionTitle}>
                ✨ ทำไมต้อง Mellow?
              </Heading>
              <p className={styles.sectionSubtitle}>ออกแบบมาเพื่อ Game Developers และ AI Engineers โดยเฉพาะ</p>
            </div>
            <div className="row">
              {FEATURE_LIST.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.codeShowcase}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <Heading as="h2" className={styles.sectionTitle}>
                  💻 Syntax ง่าย เหมือน Python
                </Heading>
                <p className={styles.sectionSubtitle}>
                  stable core รองรับ let, def, if/while/for, range, list/map literals และ stdlib helpers
                </p>

                <div className={styles.codeExamples}>
                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#fbbf24' }}>⚡ Stable Core</h4>
                    <pre>
                      <code>{`# comment
let score = 0

def add(a, b):
    return a + b

for i in range(0, 6):
    score = add(score, i)

print(score)`}</code>
                    </pre>
                  </div>

                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#4ade80' }}>💰 Money-safe Rules</h4>
                    <pre>
                      <code>{`let subtotal = money("0.10", "THB")
let fee = money("0.20", "THB")
let total = money_add(subtotal, fee)

print(money_format(total))`}</code>
                    </pre>
                  </div>

                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#f472b6' }}>📊 Bounded Data</h4>
                    <pre>
                      <code>{`let stream = data_open_jsonl("records.jsonl", 1000)
let batch = data_next(stream)
while len(batch) > 0:
    let sales = data_where(batch, "kind", "==", "sale")
    print(data_sum(sales, "amount"))
    batch = data_next(stream)`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="col col--6">
                <div className={styles.visionCard}>
                  <h3>🎯 Stable Core in 2.9.2</h3>
                  <p> MellowLang 2.9.2 treats the language core as the stable surface and keeps larger systems clearly marked as optional or experimental. </p>
                  <ul className={styles.visionList}>
                    <li>
                      ✅ Native C VM is the default for <code>mellow run</code>
                    </li>
                    <li>
                      ✅ Python fallback handles debugger, events, and record/replay gaps
                    </li>
                    <li>
                      ✅ <code>--sandbox=finance</code> and <code>--sandbox=data</code> tighten host access
                    </li>
                    <li>✅ AI tools are default-deny unless explicitly allowed</li>
                  </ul>
                </div>

                <div className={styles.cliCard}>
                  <h3>🖥️ CLI Usage</h3>
                  <pre>
                    <code>{`mellow --version
mellow run examples/hello.mellow
mellow check examples/hello.mellow
mellow run rules.mellow --sandbox=finance
mellow run job.mellow --sandbox=data
mellow bench
mellow security audit
mellow release-gate`}</code>
                  </pre>
                </div>

                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#fbbf24' }}>
                      {LATEST_VERSION}
                    </span>
                    <span className={styles.statLabel}>Latest</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#4ade80' }}>
                      C VM
                    </span>
                    <span className={styles.statLabel}>Default Engine</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#38bdf8' }}>
                      3
                    </span>
                    <span className={styles.statLabel}>Release Gates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.useCases}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2" className={styles.sectionTitle}>
                🚀 ใช้ Mellow สร้างอะไรได้บ้าง?
              </Heading>
              <p className={styles.sectionSubtitle}>จาก scripts ขนาดเล็ก ไปจนถึง data, finance และ AI tooling ที่ต้องตรวจสอบได้</p>
            </div>
            <div className="row">
              {USE_CASE_LIST.map((props, idx) => (
                <UseCase key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.ctaSection, 'hero hero--primary')}>
          <div className="container text--center">
            <Heading as="h2" className={styles.ctaTitle}>
              พร้อมเริ่มสร้างด้วย Mellow?
            </Heading>
            <p className={styles.ctaDescription}>
              เริ่มจาก docs หรือเข้า Playground แล้วลองรันตัวอย่างได้เลย
            </p>
            <div className={styles.ctaButtons}>
              <Link className={clsx('button button--secondary button--lg', styles.ctaButton)} to={DOC_INSTALL}>
                📦 ติดตั้ง
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.ctaButton)} to="/playground">
                🧪 Playground
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.ctaButton)} to="/donate">
                💖 สนับสนุน
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
