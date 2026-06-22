---
sidebar_position: 4
title: What Can Mellow Do?
---

# What Can Mellow Do

MellowLang 2.9.5 implements the Frozen Mellow 2.9 Core Profile plus focused host helpers.

## Core Scripts

- CLI automation
- deterministic rule scripts
- game and tool scripting
- validation scripts for build pipelines

## Finance and Data Rules

- exact money-style rules with Decimal-backed helpers
- `--sandbox=finance` for stricter rule-script execution
- bounded JSONL and CSV batch processing
- parameterized SQLite query/execute APIs
- immutable double-entry ledger primitives with hash-chain verification

## Native Runtime

- native C VM is the default engine
- stable `.mellow` source can run through the standalone `mellow` executable
- Python fallback remains available for features without native parity
- native parity gates cover core language, money, data, and ledger behavior

## AI-era Tooling

- official `core-llm` package surface
- native tensor batch dispatch plumbing
- AI tools are default-deny unless explicitly allowed
- release gates include benchmark, sandbox, and package integrity checks
