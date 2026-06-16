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
  label: string;
};

type UseCaseItem = {
  title: string;
  examples: string[];
  icon: string;
};

type PathItem = {
  title: string;
  description: string;
  to: string;
  action: string;
};

type ReleaseItem = {
  label: string;
  title: string;
  text: string;
};

type ProofItem = {
  value: string;
  label: string;
};

const FEATURE_LIST: FeatureItem[] = [
  {
    title: 'Small language core',
    description:
      'Use familiar control flow, functions, lists, maps, and direct calls without turning scripts into a framework.',
    label: 'Core',
  },
  {
    title: 'Native runtime path',
    description:
      'Run stable scripts on the C VM first, with Python fallback reserved for capabilities that still need it.',
    label: 'Runtime',
  },
  {
    title: 'Explicit host access',
    description:
      'Apply finance and data sandbox profiles so file, data, network, and AI tool access can be reviewed.',
    label: 'Policy',
  },
  {
    title: 'Operational checks',
    description:
      'Use doctor, check, benchmark, security audit, and release-gate commands before publishing changes.',
    label: 'Ship',
  },
];

const USE_CASE_LIST: UseCaseItem[] = [
  {
    title: 'Core scripts',
    examples: ['CLI tasks', 'Rule scripts', 'Build checks', 'Small automations'],
    icon: '01',
  },
  {
    title: 'Finance and data',
    examples: ['Precise money rules', 'JSONL/CSV batches', 'SQLite queries', 'Ledger checks'],
    icon: '02',
  },
  {
    title: 'AI tooling',
    examples: ['Explicit tool access', 'Default-deny policy', 'core-llm package', 'Native batching'],
    icon: '03',
  },
  {
    title: 'Runtime work',
    examples: ['C lexer/compiler', 'bytecode runtime', 'standalone executable', 'Python fallback'],
    icon: '04',
  },
];

const LATEST_VERSION = 'v2.9.2';
const SOURCE_REPO = 'https://github.com/seashyne/mellow-programming-language';
const PACKAGE_REGISTRY = 'https://mellow-public-registry.jirayut-wh.workers.dev/packages';
const PROOF_ITEMS: ProofItem[] = [
  { value: 'C VM', label: 'Default engine' },
  { value: '2.9.2', label: 'Current release' },
  { value: 'deny', label: 'Default AI tool policy' },
  { value: 'registry', label: 'Public packages' },
];
const RELEASE_ITEMS: ReleaseItem[] = [
  {
    label: 'Security',
    title: 'Default-deny AI tools',
    text: 'Agent tools must be explicitly allowed, which makes automation safer to review.',
  },
  {
    label: 'Runtime',
    title: 'Native execution first',
    text: 'The C VM is the default engine for stable scripts, with Python fallback where needed.',
  },
  {
    label: 'Quality',
    title: 'Release gates',
    text: 'Benchmarks, sandbox checks, and package integrity checks are part of the release flow.',
  },
  {
    label: 'Packages',
    title: 'Public registry',
    text: 'Browse shared packages through the public Mellow registry when you need reusable building blocks.',
  },
];

const QUICK_STEPS = [
  {
    title: 'Clone the source',
    text: 'Use the language repository as the source of truth for releases and examples.',
    code: 'git clone https://github.com/seashyne/mellow-programming-language.git',
  },
  {
    title: 'Install locally',
    text: 'Install the CLI from the checkout, then confirm the current version.',
    code: 'python -m pip install -e .[dev]',
  },
  {
    title: 'Run and check',
    text: 'Execute scripts and use project checks before relying on a local build.',
    code: 'mellow run examples/hello.mellow',
  },
];

const PATH_ITEMS: PathItem[] = [
  {
    title: 'I am new to Mellow',
    description: 'Get the language shape, the stable core, and the mental model in a few minutes.',
    to: '/docs/intro/what-is-mellow',
    action: 'Read the overview',
  },
  {
    title: 'I want to run code',
    description: 'Install the CLI, run a .mellow file, and check your local environment.',
    to: '/docs/intro/installation',
    action: 'Install the CLI',
  },
  {
    title: 'I need the syntax',
    description: 'Scan variables, functions, loops, maps, lists, and the 2.9 Core Profile.',
    to: '/docs/language/syntax',
    action: 'Open syntax docs',
  },
];

function Feature({ title, description, label }: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCard)}>
      <div className={styles.featureLabel}>{label}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
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

function PathCard({ title, description, to, action }: PathItem) {
  return (
    <Link className={styles.pathCard} to={to}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{action}</span>
    </Link>
  );
}

function ReleaseItem({ label, title, text }: ReleaseItem) {
  return (
    <div className={styles.releaseItem}>
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const logoSrc = useBaseUrl('/img/Logo.png');

  const DOC_WHAT_IS = '/docs/intro/what-is-mellow';
  const DOC_INSTALL = '/docs/intro/installation';
  const DOC_SYNTAX = '/docs/language/syntax';

  return (
    <Layout
      title={`${siteConfig.title} - Sandbox Scripting Language`}
      description="MellowLang 2.9.2 is a readable sandbox scripting language for tools, data, finance, games, and AI-era automation."
    >
      <header className={clsx('hero hero--dark', styles.heroBanner)}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.badgePulse}>●</span> Current release {LATEST_VERSION}
            </div>

            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              Controlled scripting for real automation.
            </Heading>

            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              MellowLang is built for scripts that need readable code, predictable runtime behavior, and reviewable access to the host system.
            </p>

            <p className={styles.heroDescription}>
              Version 2.9.2 focuses the public surface around the native C VM, sandbox profiles,
              release gates, and explicit AI tool policy.
            </p>

            <div className={styles.heroButtons}>
              <Link className={clsx('button button--primary button--lg', styles.heroButton)} to={DOC_WHAT_IS}>
                Read the docs
              </Link>

              <Link className={clsx('button button--secondary button--lg', styles.heroButton)} to={DOC_SYNTAX}>
                View syntax
              </Link>

              <Link
                className={clsx('button button--outline button--lg', styles.heroButton)}
                to={SOURCE_REPO}
                target="_blank"
                rel="noreferrer"
              >
                Source repo
              </Link>

              <Link
                className={clsx('button button--outline button--lg', styles.heroButton)}
                to={PACKAGE_REGISTRY}
                target="_blank"
                rel="noreferrer"
              >
                Registry
              </Link>
            </div>

            <div className={styles.proofGrid}>
              {PROOF_ITEMS.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.productPanel}>
              <div className={styles.panelHeader}>
                <img src={logoSrc} alt="Mellow Logo" />
                <div>
                  <strong>MellowLang</strong>
                  <span>Language source checkout</span>
                </div>
              </div>
              <pre className={styles.heroTerminal}>
                <code>{`git clone <language-source>
cd mellow-programming-language
python -m pip install -e .[dev]
mellow run examples/hello.mellow`}</code>
              </pre>
              <div className={styles.panelGrid}>
                <div>
                  <span>Default engine</span>
                  <strong>C VM</strong>
                </div>
                <div>
                  <span>Current</span>
                  <strong>{LATEST_VERSION}</strong>
                </div>
                <div>
                  <span>Safety mode</span>
                  <strong>Sandboxed</strong>
                </div>
                <div>
                  <span>Release flow</span>
                  <strong>Gated</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.quickStart}>
          <div className="container">
            <div className={styles.quickIntro}>
              <Heading as="h2" className={styles.sectionTitle}>
                Start from the real repository
              </Heading>
              <p className={styles.sectionSubtitle}>
                The website points to the language source directly, so installation, examples, and release notes stay tied to the project that ships the CLI.
              </p>
            </div>
            <div className={styles.stepGrid}>
              {QUICK_STEPS.map((step, idx) => (
                <div className={styles.stepCard} key={step.title}>
                  <span className={styles.stepNumber}>{idx + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <code>{step.code}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.releaseBand}>
          <div className="container">
            <div className={styles.releaseHeader}>
              <span>{LATEST_VERSION}</span>
              <Heading as="h2">Built for scripts people need to trust</Heading>
              <p>
                The latest release puts emphasis on runtime behavior, safety policy,
                and checks that make language changes easier to inspect.
              </p>
            </div>
            <div className={styles.releaseGrid}>
              {RELEASE_ITEMS.map((item) => (
                <ReleaseItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2" className={styles.sectionTitle}>
                What Mellow is for
              </Heading>
              <p className={styles.sectionSubtitle}>
                A compact scripting layer for automation that should be easy to audit before it runs.
              </p>
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
                  Syntax kept close to the task
                </Heading>
                <p className={styles.sectionSubtitle}>
                  Mellow code is intentionally direct: declarations, functions, loops, records, and controlled helpers.
                </p>

                <div className={styles.codeExamples}>
                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#fbbf24' }}>Core syntax</h4>
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
                    <h4 style={{ color: '#4ade80' }}>Money-safe rules</h4>
                    <pre>
                      <code>{`let subtotal = money("0.10", "THB")
let fee = money("0.20", "THB")
let total = money_add(subtotal, fee)

print(money_format(total))`}</code>
                    </pre>
                  </div>

                  <div className={styles.codeExample}>
                    <h4 style={{ color: '#f472b6' }}>Batched data</h4>
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
                  <h3>What matters in 2.9.2</h3>
                  <p>Mellow separates stable runtime behavior from optional or experimental systems, so teams know what is ready to rely on.</p>
                  <ul className={styles.visionList}>
                    <li>
                      Native C VM is the default engine for <code>mellow run</code>
                    </li>
                    <li>
                      Python VM handles fallback for debugger, events, and record/replay
                    </li>
                    <li>
                      <code>--sandbox=finance</code> and <code>--sandbox=data</code> limit host access
                    </li>
                    <li>AI tools are denied by default unless explicitly allowed</li>
                  </ul>
                </div>

                <div className={styles.cliCard}>
                  <h3>CLI usage</h3>
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
                Use cases
              </Heading>
              <p className={styles.sectionSubtitle}>
                Think of Mellow as scripting for places where safety, repeatability, and reviewability matter.
              </p>
            </div>
            <div className="row">
              {USE_CASE_LIST.map((props, idx) => (
                <UseCase key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pathSection}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2" className={styles.sectionTitle}>
                Choose your path
              </Heading>
              <p className={styles.sectionSubtitle}>
                The site is organized around what you are trying to do next.
              </p>
            </div>
            <div className={styles.pathGrid}>
              {PATH_ITEMS.map((item) => (
                <PathCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.ctaSection, 'hero hero--primary')}>
          <div className="container text--center">
            <Heading as="h2" className={styles.ctaTitle}>
              Ready to try Mellow?
            </Heading>
            <p className={styles.ctaDescription}>
              Start with installation or open the playground to scan the syntax quickly.
            </p>
            <div className={styles.ctaButtons}>
              <Link className={clsx('button button--secondary button--lg', styles.ctaButton)} to={DOC_INSTALL}>
                Install
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.ctaButton)} to="/playground">
                Playground
              </Link>
              <Link
                className={clsx('button button--outline button--lg', styles.ctaButton)}
                to={SOURCE_REPO}
                target="_blank"
                rel="noreferrer"
              >
                Source repo
              </Link>
              <Link
                className={clsx('button button--outline button--lg', styles.ctaButton)}
                to={PACKAGE_REGISTRY}
                target="_blank"
                rel="noreferrer"
              >
                Registry
              </Link>
              <Link className={clsx('button button--outline button--lg', styles.ctaButton)} to="/donate">
                Support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
