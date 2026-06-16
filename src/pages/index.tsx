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
    title: '🤖 AI & Steering',
    description:
      'AI Module ในตัว รองรับ Steering Behaviors (Seek, Flee, Patrol) และ Perception (Sight, Range)',
    icon: '🧠',
    color: '#f472b6',
  },
  {
    title: '🎮 Game-Ready',
    description:
      'Game utilities เช่น astar, easing, grid helpers — เรียกใช้ได้ง่ายสำหรับเกม',
    icon: '🎮',
    color: '#4ade80',
  },
  {
    title: '⚡ Python-like',
    description:
      'Indentation-based blocks, ใช้ def สำหรับฟังก์ชัน, let สำหรับตัวแปร เรียนรู้ได้ใน 5 นาที',
    icon: '🐍',
    color: '#fbbf24',
  },
  {
    title: '🔒 Deterministic',
    description:
      'รองรับ --seed, --record, --replay รันซ้ำได้ผลลัพธ์เหมือนเดิม เหมาะสำหรับเกมและเทส',
    icon: '🎯',
    color: '#38bdf8',
  },
];

const USE_CASE_LIST: UseCaseItem[] = [
  {
    title: '🎮 Game Logic',
    examples: ['NPC behaviors', 'Pathfinding (A*)', 'Dialogue System', 'Event System'],
    icon: '🎮',
  },
  {
    title: '🤖 AI Behaviors',
    examples: ['Steering (Seek/Flee)', 'Perception (Sight/Range)', 'Utility AI', 'Decision Flow'],
    icon: '🧠',
  },
  {
    title: '🛠️ Automation',
    examples: ['CLI tools', 'File processing', 'System scripts', 'Build pipelines'],
    icon: '🛠️',
  },
  {
    title: '🛡️ Safe Sandbox',
    examples: ['Modding support', 'User scripts', 'Restricted access', 'Budget limits'],
    icon: '🛡️',
  },
];

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
      title={`${siteConfig.title} - AI-Native Programming Language`}
      description="สร้างเกม, AI และแอปพลิเคชันอัจฉริยะได้ง่ายๆ ด้วยภาษาที่เข้าใจคุณ"
    >
      <header className={clsx('hero hero--dark', styles.heroBanner)}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.badgePulse}>✨</span> v1.4.7
            </div>

            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              Mellow
            </Heading>

            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              &quot;Make development simple, expressive, and AI-powered.&quot;
            </p>

            <p className={styles.heroDescription}>
              ภาษาสคริปต์ที่ปลอดภัยและกำหนดผลลัพธ์ได้ (Deterministic)
              <br />
              สำหรับเกมและ AI
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
                  ใช้ Indentation, def สำหรับฟังก์ชัน และ let สำหรับตัวแปร
                </p>

                <div className={styles.codeExamples}>
                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#fbbf24' }}>⚡ Basic Syntax</h4>
                    <pre>
                      <code>{`# comment
let hp = 100
let name = "Hero"

def add(a, b):
    return a + b

print(add(2, 3))

if hp < 10:
    print("low health")
elif hp < 50:
    print("warning")
else:
    print("ok")`}</code>
                    </pre>
                  </div>

                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#4ade80' }}>🎮 Game utilities</h4>
                    <pre>
                      <code>{`let path = astar(grid, [0,0], [3,2])
let t = ease_in_quad(0.25)
let wp = neighbors4(x, y, 10, 10)`}</code>
                    </pre>
                  </div>

                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#f472b6' }}>🤖 AI</h4>
                    <pre>
                      <code>{`let vel = ai_seek(pos, target, speed)
let near = ai_in_range(pos, target, 60)
let closest = ai_nearest(pos, enemies)`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="col col--6">
                <div className={styles.visionCard}>
                  <h3>🎯 Deterministic by Design</h3>
                  <p> Mellow ออกแบบมาให้รันซ้ำได้ผลลัพธ์เหมือนเดิม เหมาะสำหรับเกมและ Testing </p>
                  <ul className={styles.visionList}>
                    <li>
                      ✅ <code>--seed 123</code> กำหนด Random Seed
                    </li>
                    <li>
                      ✅ <code>--record run.jsonl</code> บันทึกการรัน
                    </li>
                    <li>
                      ✅ <code>--replay run.jsonl</code> รันซ้ำเหมือนเดิม
                    </li>
                    <li>✅ <code>save/load</code> ระบบเก็บสถานะในตัว</li>
                  </ul>
                </div>

                <div className={styles.cliCard}>
                  <h3>🖥️ CLI Usage</h3>
                  <pre>
                    <code>{`mellow run game.mellow
mellow run game.mellow --seed 123
mellow run game.mellow --record out.jsonl
mellow run game.mellow --replay out.jsonl
mellow check game.mellow
mellow modules`}</code>
                  </pre>
                </div>

                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#fbbf24' }}>
                      v1.4.7
                    </span>
                    <span className={styles.statLabel}>Latest</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#4ade80' }}>
                      10+
                    </span>
                    <span className={styles.statLabel}>Modules</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber} style={{ color: '#38bdf8' }}>
                      ∞
                    </span>
                    <span className={styles.statLabel}>Possibilities</span>
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
              <p className={styles.sectionSubtitle}>จากเกมไปจนถึง AI workflow</p>
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
