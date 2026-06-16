import React, { useState } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./playground.module.css";

// --- Types ---
type OutputType = {
  type: "success" | "error" | "info";
  message: string;
};

// --- Sample Code Templates ---
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

  money: `# Money-safe rules
let subtotal = money("0.10", "THB")
let fee = money("0.20", "THB")
let total = money_add(subtotal, fee)

print(money_format(total))`,

  data: `# Bounded data processing
let stream = data_open_jsonl("records.jsonl", 1000)
let batch = data_next(stream)

while len(batch) > 0:
    let sales = data_where(batch, "kind", "==", "sale")
    print(data_sum(sales, "amount"))
    batch = data_next(stream)`,

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

// --- Main Component ---
export default function Playground(): React.JSX.Element {
  const [code, setCode] = useState<string>(SAMPLE_CODES.hello);
  const [output, setOutput] = useState<OutputType[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedSample, setSelectedSample] = useState<string>("hello");

  // Run code simulation
  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const lines = code.split("\n");
      const results: OutputType[] = [];

      // Check for basic syntax
      let hasError = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith("#")) continue;

        // Check for common syntax issues
        if (line.includes("func ") && !line.includes("def ")) {
          results.push({
            type: "error",
            message: `Line ${i + 1}: Use 'def' instead of 'func' for functions`,
          });
          hasError = true;
        }

        if (line.includes("//")) {
          results.push({
            type: "info",
            message: `Line ${i + 1}: Use '#' for comments, not '//'`,
          });
        }

        // Check for print statements
        if (line.startsWith("print(")) {
          const match = line.match(/print\("(.+)"\)/);
          if (match) {
            results.push({
              type: "success",
              message: `Output: ${match[1]}`,
            });
          }
        }
      }

      if (!hasError && results.length === 0) {
        results.push({
          type: "success",
          message: "✓ Code executed successfully!",
        });
      }

      setOutput(results);
    } catch (error: any) {
      setOutput([
        {
          type: "error",
          message: `Error: ${error.message}`,
        },
      ]);
    }

    setIsRunning(false);
  };

  // Reset to sample code
  const loadSample = (sampleKey: keyof typeof SAMPLE_CODES) => {
    setCode(SAMPLE_CODES[sampleKey]);
    setSelectedSample(sampleKey);
    setOutput([]);
  };

  // Clear everything
  const clearAll = () => {
    setCode("");
    setOutput([]);
    setSelectedSample("");
  };

  return (
    <Layout
      title="Playground"
      description="ลองเขียนโค้ด Mellow ออนไลน์"
    >
      <main className={styles.playgroundContainer}>
        <div className={styles.header}>
          <Heading as="h1" className={styles.title}>
            🎮 Mellow Playground
          </Heading>
          <p className={styles.subtitle}>
            ลองเขียนและรันโค้ด Mellow ได้ทันทีในเบราว์เซอร์
          </p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.sampleSelector}>
            <label htmlFor="sample">📚 ตัวอย่าง:</label>
            <select
              id="sample"
              value={selectedSample}
              onChange={(e) => loadSample(e.target.value as keyof typeof SAMPLE_CODES)}
              className={styles.select}
            >
              <option value="hello">Hello World</option>
              <option value="core">Stable Core</option>
              <option value="money">Money</option>
              <option value="data">Data</option>
              <option value="ledger">Ledger</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              onClick={clearAll}
              className={styles.buttonSecondary}
              disabled={isRunning}
            >
              🗑️ ล้าง
            </button>
            <button
              onClick={runCode}
              className={styles.buttonPrimary}
              disabled={isRunning}
            >
              {isRunning ? "⏳ กำลังรัน..." : "▶️ รันโค้ด"}
            </button>
          </div>
        </div>

        <div className={styles.editorGrid}>
          {/* Code Editor */}
          <div className={styles.editorSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>💻 Code Editor</span>
              <span className={styles.sectionBadge}>.mellow</span>
            </div>
            <textarea
              className={styles.codeEditor}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder="พิมพ์โค้ด Mellow ที่นี่..."
            />
          </div>

          {/* Output */}
          <div className={styles.outputSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>📤 Output</span>
              {output.length > 0 && (
                <span className={styles.outputCount}>{output.length} results</span>
              )}
            </div>
            <div className={styles.outputConsole}>
              {output.length === 0 ? (
                <div className={styles.emptyOutput}>
                  <span>👈 กดปุ่ม "รันโค้ด" เพื่อดูผลลัพธ์</span>
                </div>
              ) : (
                output.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${styles.outputLine} ${styles[item.type]}`}
                  >
                    <span className={styles.outputIcon}>
                      {item.type === "success" && "✓"}
                      {item.type === "error" && "✗"}
                      {item.type === "info" && "ℹ"}
                    </span>
                    <span>{item.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className={styles.reference}>
          <Heading as="h3" className={styles.referenceTitle}>
            📖 Quick Reference
          </Heading>
          <div className={styles.referenceGrid}>
            <div className={styles.referenceCard}>
              <code>{`let x = 10`}</code>
              <span>ตัวแปร</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`def func():`}</code>
              <span>ฟังก์ชัน</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`# comment`}</code>
              <span>คอมเมนต์</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`print("hi")`}</code>
              <span>พิมพ์</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`if x < 10:`}</code>
              <span>เงื่อนไข</span>
            </div>
            <div className={styles.referenceCard}>
              <code>{`mellow run app.mellow`}</code>
              <span>รัน</span>
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
              <span>ลูป</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className={styles.infoBanner}>
          <span className={styles.infoIcon}>ℹ️</span>
          <div className={styles.infoContent}>
            <strong>หมายเหตุ:</strong> Playground นี้เป็นแบบจำลองสำหรับการสาธิต
            สำหรับการรันโค้ดจริง กรุณาติดตั้ง Mellow CLI บนเครื่องของคุณ
          </div>
          <a
            href="/docs/intro/installation"
            className={styles.infoLink}
          >
            ติดตั้ง CLI →
          </a>
        </div>
      </main>
    </Layout>
  );
}
