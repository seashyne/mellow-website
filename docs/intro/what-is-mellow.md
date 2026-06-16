---
sidebar_position: 1
title: What is Mellow?
---

# What is Mellow

Mellow Programming Language 2.9.2, also known as MellowLang, is a sandbox scripting language focused on games, tools, and AI behavior experiments.

The stable surface in 2.9.2 is the language core:

- `let` assignment and reassignment
- `def` functions and return values
- `if`, `while`, and `for`
- `range(...)`
- list and map literals
- strings, numbers, booleans, and `none` / `null`
- string, math, list, map, JSON, money, data, and ledger helpers

Mellow 2.9.2 uses the native C VM as the default engine for `mellow run`. It falls back to the Python VM when a script requests features that do not yet have native parity, such as debugger, events, or record/replay.

Larger systems such as agents, MMG, desktop bundles, package registries, and MELV video tooling exist in the repository, but they are treated as extended or experimental surfaces unless their own tests are green.
