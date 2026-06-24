---
sidebar_position: 1
title: What is Mellow?
---

# What is Mellow

Mellow, also known as MellowLang, is a sandbox scripting language focused on games, tools, and AI behavior experiments.

The **Frozen Mellow 2.9 Core Profile** is the current stable language contract. MellowLang 2.9.6 is the current implementation release of that profile.

The frozen language surface includes:

- `let` assignment and reassignment
- `def` functions and return values
- `if`, `while`, and `for`
- `range(...)`
- list and map literals
- strings, numbers, booleans, and `none` / `null`
- string, math, list, map, JSON, money, data, and ledger helpers

MellowLang 2.9.6 uses the native C VM as the default engine for `mellow run`. It falls back to the Python VM when a script requests features that do not yet have native parity, such as debugger, events, or record/replay.

Larger systems such as agents, MMG, desktop bundles, package registries, and MELV video tooling exist in the repository, but they are treated as extended or experimental surfaces unless their own tests are green.
