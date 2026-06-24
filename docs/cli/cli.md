---
sidebar_position: 1
title: CLI
---

# CLI

Stable commands in MellowLang 2.9.6:

```bash
mellow --version
mellow run <file>
mellow check <file-or-dir>
mellow fmt <files...>
mellow modules --json
mellow doctor
```

Native C is the default engine:

```bash
mellow run app.mellow
mellow run app.mellow --engine=py
mellow run app.mellow --engine=c --native-required
```

Sandbox profiles:

```bash
mellow run rules.mellow --sandbox=finance
mellow run job.mellow --sandbox=data
mellow run import.mellow --sandbox=data --data-write
```

Release and policy tooling added in 2.9.2:

```bash
mellow bench
mellow security audit
mellow release-gate
```

Legacy direct-run mode is still supported:

```bash
mellow <file>
mellow <file> --check
```
