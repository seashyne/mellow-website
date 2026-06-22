import React, { useState } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { runMellowCode, type RuntimeLine } from "../lib/mellowBrowserRuntime";
import styles from "./playground.module.css";

const SAMPLE_CODES = {
  hello: `# Hello Mellow
print("Hello, Mellow World!")`,

  core: `# Stable Core
let score = 0

def add(a, b):
    return a + b

for i in range(0, 6):
    score = add(score, i)

print(score)`,

  condition: `# Conditions and maps
let player = {"name": "Mira", "score": 12}

if player["score"] >= 10:
    print(player["name"] + " wins")
else:
    print(player["name"] + " keeps going")`,

  money: `# Money-safe rules
let subtotal = money("0.10", "THB")
let fee = money("0.20", "THB")
let total = money_add(subtotal, fee)

print(money_format(total))`,

  ledger: `# Immutable ledger
let book = ledger_create("THB")
book = ledger_post(
    book,
    "sale-001",
    [
        {"account": "cash", "amount": "100.00"},
        {"account": "revenue", "amount": "-100.00"}
    ],
    "cash sale"
)

print(money_format(ledger_balance(book, "cash")))
print(ledger_verify(book)["ok"])`,
};

export default function Playground(): React.JSX.Element {
  const [code, setCode] = useState<string>(SAMPLE_CODES.hello);
  const [output, setOutput] = useState<RuntimeLine[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedSample, setSelectedSample] = useState<string>("hello");

  const runCode = () => {
    setIsRunning(true);
    setOutput(runMellowCode(code));
    setIsRunning(false);
  };

  const loadSample = (sampleKey: keyof typeof SAMPLE_CODES) => {
    setCode(SAMPLE_CODES[sampleKey]);
    setSelectedSample(sampleKey);
    setOutput([]);
  };

  const clearAll = () => {
    setCode("");
    setOutput([]);
    setSelectedSample("");
  };

  return (
    <Layout
      title="Playground"
      description="Run Frozen Mellow 2.9 Core Profile programs in your browser"
    >
      <main className={styles.playgroundContainer}>
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Mellow Playground
          </Heading>
          <p className={styles.subtitle}>
            Run Frozen Mellow 2.9 Core Profile programs locally in your browser.
          </p>
          <div className={styles.runtimeStatus}>
            <span className={styles.runtimeDot} />
            Browser Core Runtime
            <span>Frozen 2.9</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.sampleSelector}>
            <label htmlFor="sample">Sample:</label>
            <select
              id="sample"
              value={selectedSample}
              onChange={(e) => loadSample(e.target.value as keyof typeof SAMPLE_CODES)}
              className={styles.select}
            >
              <option value="hello">Hello World</option>
              <option value="core">Stable Core</option>
              <option value="condition">Conditions</option>
              <option value="money">Money</option>
              <option value="ledger">Ledger</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              onClick={clearAll}
              className={styles.buttonSecondary}
              disabled={isRunning}
            >
              Clear
            </button>
            <button
              onClick={runCode}
              className={styles.buttonPrimary}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Run code"}
            </button>
          </div>
        </div>

        <div className={styles.editorGrid}>
          <div className={styles.editorSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Editor</span>
              <span className={styles.sectionBadge}>.mellow</span>
            </div>
            <textarea
              className={styles.codeEditor}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder="Type Mellow code here..."
            />
          </div>

          <div className={styles.outputSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Output</span>
              {output.length > 0 && (
                <span className={styles.outputCount}>{output.length} results</span>
              )}
            </div>
            <div className={styles.outputConsole}>
              {output.length === 0 ? (
                <div className={styles.emptyOutput}>
                  <span>Run a sample to see output here.</span>
                </div>
              ) : (
                output.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${styles.outputLine} ${styles[item.type]}`}
                  >
                    <span className={styles.outputIcon}>
                      {item.type === "stdout" && ">"}
                      {item.type === "success" && "OK"}
                      {item.type === "error" && "ERR"}
                      {item.type === "info" && "i"}
                    </span>
                    <span>{item.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.reference}>
          <Heading as="h3" className={styles.referenceTitle}>
            Frozen 2.9 quick reference
          </Heading>
          <div className={styles.referenceGrid}>
            <div className={styles.referenceCard}>
              <code>{`let x = 10`}</code>
              <span>variable</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`def func():`}</code>
              <span>function</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`# comment`}</code>
              <span>comment</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`print("hi")`}</code>
              <span>print</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`if x < 10:`}</code>
              <span>condition</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`mellow run app.mellow`}</code>
              <span>run</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`--sandbox=data`}</code>
              <span>data sandbox</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`mellow release-gate`}</code>
              <span>release gate</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`for i in range(0, 5):`}</code>
              <span>loop</span>
            </div>
          </div>
        </div>

        <div className={styles.infoBanner}>
          <div className={styles.infoContent}>
            <strong>Runs locally:</strong> Code is executed by the Browser Core Runtime and is not uploaded.
            The browser runtime covers the Frozen Mellow 2.9 Core Profile and selected in-memory helpers.
            Install MellowLang 2.9.5 for the native C VM, filesystem, network, sandbox profiles, and full host integrations.
          </div>
          <a
            href="/docs/intro/installation"
            className={styles.infoLink}
          >
            Install CLI
          </a>
        </div>
      </main>
    </Layout>
  );
}
