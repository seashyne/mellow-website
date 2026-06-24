import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './release-pipeline.module.css';

const SOURCE_REPO = 'https://github.com/seashyne/mellow-programming-language';
const LATEST_BRANCH = 'https://github.com/seashyne/mellow-programming-language/tree/dev/2.9.6';
const REGISTRY_URL = 'https://mellow-public-registry.jirayut-wh.workers.dev/packages';

const STAGES = [
  {
    label: 'Profile',
    title: 'Freeze the language contract',
    text: 'Frozen Mellow 2.9 Core Profile is the compatibility target. Patch releases keep valid 2.9 programs stable.',
    command: 'mellow check examples/',
  },
  {
    label: 'Runtime',
    title: 'Validate the implementation',
    text: 'The native C VM, Python engine fallback, sandbox behavior, and browser core runtime are checked against the same user-facing rules.',
    command: 'mellow run app.mellow --engine=c',
  },
  {
    label: 'Security',
    title: 'Run policy and sandbox gates',
    text: 'AI tool access starts from deny. Package integrity, sandbox profiles, and audit output must be explicit before release.',
    command: 'mellow security audit',
  },
  {
    label: 'Publish',
    title: 'Ship artifacts and packages',
    text: 'Release notes, binaries, examples, and public registry packages should point back to the same source revision.',
    command: 'mellow release-gate',
  },
];

const TIMELINE = [
  {
    title: 'Source change lands',
    text: 'A language or tooling change starts in the source repository with examples or docs that prove the intended behavior.',
  },
  {
    title: 'Compatibility is checked',
    text: 'The release must preserve Frozen 2.9 semantics unless the change is clearly outside the frozen profile.',
  },
  {
    title: 'Quality gates run',
    text: 'Doctor, check, format, tests, benchmarks, sandbox checks, security audit, and release-gate commands block weak releases.',
  },
  {
    title: 'Artifacts are published',
    text: 'CLI builds, docs, examples, registry packages, and website copy are updated together so users do not see mixed versions.',
  },
];

const ARTIFACTS = [
  {
    title: 'MellowLang 2.9.6',
    text: 'Current implementation release for the Frozen 2.9 profile on the dev/2.9.6 branch, including native C VM work and operational release tooling.',
  },
  {
    title: 'Public package registry',
    text: 'Reusable packages should be discoverable from the public registry and linked from release notes when they are part of a release.',
  },
  {
    title: 'Website and docs',
    text: 'The website is the readable product surface. It should explain what is stable, what is browser-only, and what requires the CLI.',
  },
];

function StageCard({ label, title, text, command }: (typeof STAGES)[number]) {
  return (
    <article className={styles.stageCard}>
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <code>{command}</code>
    </article>
  );
}

export default function ReleasePipeline(): React.JSX.Element {
  return (
    <Layout
      title="Release Pipeline"
      description="How Mellow turns Frozen 2.9 language changes into tested releases, registry updates, and website documentation."
    >
      <main className={styles.releasePage}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>Frozen Mellow 2.9 Core Profile</span>
              <Heading as="h1" className={styles.title}>
                Release pipeline for a real language project.
              </Heading>
              <p className={styles.lead}>
                Mellow releases should move as one chain: source change, compatibility check,
                runtime validation, security gate, package publishing, and website documentation.
                This page explains what has to be true before MellowLang 2.9.x is presented as ready.
              </p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to={SOURCE_REPO} target="_blank" rel="noreferrer">
                  Source repository
                </Link>
                <Link className="button button--secondary button--lg" to={LATEST_BRANCH} target="_blank" rel="noreferrer">
                  Latest branch
                </Link>
                <Link className="button button--outline button--lg" to={REGISTRY_URL} target="_blank" rel="noreferrer">
                  Package registry
                </Link>
                <Link className="button button--outline button--lg" to="/playground">
                  Try playground
                </Link>
              </div>
            </div>

            <aside className={styles.summaryPanel} aria-label="Release status summary">
              <div className={styles.panelHead}>
                <strong>MellowLang 2.9.6</strong>
                <span className={styles.status}>Current</span>
              </div>
              <ul className={styles.checkList}>
                <li>
                  <span className={styles.checkMark}>1</span>
                  <span>
                    <strong>Frozen profile</strong>
                    Portable language behavior is tied to Frozen Mellow 2.9 Core Profile.
                  </span>
                </li>
                <li>
                  <span className={styles.checkMark}>2</span>
                  <span>
                    <strong>Runtime gates</strong>
                    Native, fallback, and browser runtimes expose clear capability boundaries.
                  </span>
                </li>
                <li>
                  <span className={styles.checkMark}>3</span>
                  <span>
                    <strong>Publish gates</strong>
                    Registry, release notes, examples, and web copy stay in sync.
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionDark)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <Heading as="h2">Release gates</Heading>
              <p>
                Each gate answers one practical question before publishing: did the language stay stable,
                did the runtime behave correctly, did security stay explicit, and can users find the shipped artifacts?
              </p>
            </div>
            <div className={styles.stageGrid}>
              {STAGES.map((stage) => (
                <StageCard key={stage.title} {...stage} />
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionLight)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <Heading as="h2">From commit to public release</Heading>
              <p>
                This is the intended path for a Mellow release. It keeps the product surface believable
                because every public page points back to the same tested implementation.
              </p>
            </div>

            <div className={styles.flow}>
              <div className={styles.timeline}>
                {TIMELINE.map((item, index) => (
                  <article className={styles.timelineItem} key={item.title}>
                    <span className={styles.number}>{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <aside className={styles.commandPanel} aria-label="Release command checklist">
                <h3>Command checklist</h3>
                <pre className={styles.commandBlock}>
                  <code>{`mellow --version
mellow doctor
mellow fmt src/ examples/
mellow check src/ examples/
mellow bench
mellow security audit
mellow release-gate`}</code>
                </pre>
              </aside>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionLight)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <Heading as="h2">Release outputs</Heading>
              <p>
                A release is not done when the binary builds. The visible product has to match the actual shipped system.
              </p>
            </div>
            <div className={styles.artifactGrid}>
              {ARTIFACTS.map((artifact) => (
                <article className={styles.artifactCard} key={artifact.title}>
                  <h3>{artifact.title}</h3>
                  <p>{artifact.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.callout}>
              The playground currently runs a local Browser Core Runtime for the Frozen 2.9 profile.
              Native C VM behavior, filesystem access, network features, and full sandbox profiles still belong to the MellowLang CLI.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
