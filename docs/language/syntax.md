---
sidebar_position: 1
title: Syntax
---

# Syntax

The Frozen Mellow 2.9 Core Profile uses indentation-based blocks and a compact stable core.

```mellow
let score = 0

def add(a, b):
    return a + b

for i in range(0, 6):
    score = add(score, i)

print(score)
```

## Files and Comments

Mellow source files use `.mellow`.

```mellow
# preferred comment
let hp = 100

// compatibility comment
print("https://example.com")
```

## Blocks

Use four spaces for indentation:

```mellow
if score >= 10:
    print("win")
else:
    print("keep going")
```

Legacy `end` and `do ... end` forms may still be accepted for compatibility, but new code should prefer indentation.

## Values

The Frozen Mellow 2.9 Core Profile includes:

- `none`
- booleans: `true`, `false`
- signed integers
- floating-point numbers
- strings
- lists
- maps
- direct function calls

## Built-ins and Helpers

Core scripts can use built-ins such as `range`, `print`, `len`, `str`, `type`, `abs`, `floor`, `ceil`, `sqrt`, `min`, and `max`.

Host helpers extend the stable runtime with string, math, list, map, JSON, money, data, and ledger operations.
