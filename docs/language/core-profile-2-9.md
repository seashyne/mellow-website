---
sidebar_position: 2
title: Frozen Mellow 2.9 Core Profile
---

# Frozen Mellow 2.9 Core Profile

The Frozen Mellow 2.9 Core Profile is the current portable language contract for Mellow.

**Status: Frozen and current.** MellowLang 2.9.6 is the current implementation release of this profile.

Patch releases in the 2.9 line may fix bugs, but they must not change the meaning of valid programs. New syntax belongs in Mellow 2.10 or later.

## Source Text

- source files use `.mellow`
- source text is UTF-8
- keywords are ASCII and case-sensitive
- blocks use four spaces of indentation
- `#` starts a comment outside a string
- strict tools should reject tabs in indentation

## Reserved Core Keywords

```text
let keep def return if else while for in
true false none and or not
```

`range`, `print`, `len`, `str`, `type`, `abs`, `floor`, `ceil`, `sqrt`, `min`, and `max` are standard built-in names.

## Statements

The portable core includes:

- declarations: `let name = expression`
- reassignment: `name = expression`
- expression statements
- `return`
- `if` / `else`
- `while`
- `for name in range(start, end)`
- `def name(args):`

## Expressions

Operators are evaluated with the usual precedence:

- `or`
- `and`
- comparisons: `==`, `!=`, `<`, `<=`, `>`, `>=`
- addition and subtraction
- multiplication, division, and modulo
- unary `-` and `not`

Core values include `none`, booleans, signed integers, floating-point numbers, strings, lists, maps, and function values used by direct calls.

## Runtime Contract

A Core Profile program should run through both the Python implementation and the full native C implementation. Extensions may exist, but they should be identified as extended, experimental, or legacy.
