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

  variables: `# ตัวแปรและประเภทข้อมูล
let hp = 100
let name = "Hero"
let alive = true

print(f"Name: {name}, HP: {hp}")`,

  functions: `# ฟังก์ชัน
def add(a, b):
    return a + b

def greet(name):
    print("Hello, " + name)

let result = add(5, 3)
greet("Mellow")
print(f"Result: {result}")`,

  conditionals: `# เงื่อนไข
let hp = 50

if hp < 10:
    print("Critical!")
elif hp < 50:
    print("Warning")
else:
    print("OK")`,

  loops: `# ลูป
for i in range(0, 5):
    print(f"Count: {i}")

let j = 0
while j < 3:
    print(f"While: {j}")
    j = j + 1`,

  game: `# Game Module (v1.4.7)
let grid = [[0,0,0,0],[0,1,0,0],[0,0,0,0]]
let x = 1
let y = 1
let path = astar(grid, [0,0], [3,2])
let t = ease_in_quad(0.25)
let wp = neighbors4(x, y, 10, 10)

print(f"Path: {path}")
print(f"Easing: {t}")`,

  ai: `# AI Module
let vel = ai_seek([100,100], [200,200], 3.0)
let can_see = ai_in_sight([100,100], 0, [150,150], 120, 150)

print(f"Velocity: {vel}")
print(f"Can See: {can_see}")`,
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
              <option value="variables">ตัวแปร</option>
              <option value="functions">ฟังก์ชัน</option>
              <option value="conditionals">เงื่อนไข</option>
              <option value="loops">ลูป</option>
              <option value="game">Game Module</option>
              <option value="ai">AI Module</option>
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
              <code>{`for i in range(5):`}</code>
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
