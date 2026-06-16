# Mellow Syntax Reference v1.4.8

> Detailed language reference for **Mellow 1.4.8**, written for website documentation.
>
> This reference is based on the shipped `lexer.py`, `parser.py`, and bundled docs in the v1.4.8 package. It describes the syntax the parser accepts in this version.

---

## 1. Overview

Mellow 1.4.8 is a scripting language with these characteristics:

- **indentation-based blocks** like Python
- supports some **Lua-style `end`** terminators in several block forms
- supports both **Mellow-style keywords** and several **modern aliases**
- includes a **module call syntax** using `get` and `call`
- supports **lists, maps, f-strings, named arguments, events, save/load, and loop variants**

Example:

```mellow
keep hp = 100
keep name = "Mellow"

check hp > 0:
    show f"{name} is ready"
else:
    show "down"
```

---

## 2. File Format and Comments

### File extension

```text
.mellow
```

### Single-line comments

Mellow supports both comment styles:

```mellow
# comment
// comment
```

Inline comments are also supported:

```mellow
keep hp = 10  # starting hp
show hp       // print value
```

Notes:
- comment stripping respects string literals
- `#` and `//` inside strings are not treated as comments

---

## 3. Blocks and Indentation

Mellow uses **indentation** to define blocks.

A block usually begins after a line ending in `:`.

```mellow
check true:
    show "inside block"
show "outside block"
```

Recommended style:
- use **4 spaces** per indentation level
- avoid mixing tabs and spaces

### Optional `end`

Some constructs also allow an optional Lua-style `end` after the indented block:

```mellow
do:
    show "hello"
end
```

This is accepted for several loop-like and block-like constructs, but indentation is still the primary structure rule.

---

## 4. Keywords

### Core / legacy-style keywords

```text
keep, show, precision, check, also, else, loop, skill,
return, stop, wait, save, load, into, put, in,
and, or, not, true, false, none, null,
try, catch, finally, repeat, until,
break, continue, import, on, do
```

### Modern aliases accepted by the parser

```text
let, var, def, fn, function, print, if, elif, while, for
```

### Module system keywords

```text
get, call
```

Notes:
- `let` and `var` are rewritten to `keep`
- `def`, `fn`, and `function` are rewritten to `skill`
- `if` becomes `check`
- `elif` becomes `also`
- `while` becomes `loop (...)`
- `for x in y:` becomes `loop x in y:`

---

## 5. Identifiers

Identifiers are used for:
- variables
- function names
- event parameters
- import aliases
- loop variables

Examples:

```mellow
keep player_name = "Ari"
skill heal_target(amount):
    return amount
```

For assignments and several declarations, targets must be valid identifiers.

---

## 6. Literals and Runtime Values

### Numbers

```mellow
keep a = 10
keep b = 3.14
keep c = -5
```

### Strings

Double-quoted and single-quoted strings are supported by the lexer.

```mellow
keep s1 = "hello"
keep s2 = 'world'
```

Common escapes include:

```text
\n  newline
\t  tab
\r  carriage return
\\  backslash
\"  quote
\'  apostrophe
\uXXXX unicode
```

### Booleans

```mellow
keep ok = true
keep fail = false
```

### Null values

Both forms map to null-like runtime values:

```mellow
keep a = none
keep b = null
```

### Lists

```mellow
keep items = [1, 2, 3]
keep mixed = [1, "two", true, none]
```

### Maps / dictionaries

```mellow
keep player = {"name": "Mellow", "hp": 100}
```

### F-strings

Mellow 1.4.8 supports interpolated strings using the `f"..."` form.

```mellow
keep hp = 25
keep max_hp = 100
show f"HP {hp}/{max_hp}"
```

Interpolation rules:
- expressions inside `{...}` are parsed as normal Mellow expressions
- nested braces are handled best-effort by the parser
- `{{` and `}}` are treated as escaped braces in f-string parsing

---

## 7. Expressions

Mellow expressions support:
- variables
- literals
- unary operators
- binary operators
- function calls
- list/map literals
- indexing
- parenthesized expressions
- `get` / `call` module expressions
- f-strings

### Example

```mellow
keep result = (1 + 2) * 3
keep alive = (hp > 0) and not dead
```

---

## 8. Operator Precedence

From lower to higher precedence:

1. `or`
2. `and`
3. comparisons: `== != > < >= <=`
4. `+ -`
5. `* /`
6. unary `not` and unary `-`

### Supported operators

#### Arithmetic

```text
+  -  *  /  %
```

Examples:

```mellow
keep total = 10 + 5
keep left = total - 2
keep mult = 3 * 4
keep div = 8 / 2
keep rem = 7 % 3
```

#### Comparison

```text
==  !=  <  <=  >  >=
```

Examples:

```mellow
check hp <= 0:
    show "dead"
```

#### Boolean

```text
and  or  not
```

Examples:

```mellow
check visible and not hidden:
    show "render"
```

---

## 9. Parentheses

Use parentheses to group expressions:

```mellow
keep x = (1 + 2) * (3 + 4)
check (hp > 0) and (shield > 0):
    show "safe"
```

---

## 10. Variables and Declarations

### `keep`

The primary declaration keyword is `keep`.

```mellow
keep hp = 100
keep name = "Mellow"
```

### `let` and `var`

These aliases are accepted and normalized to `keep`.

```mellow
let score = 0
var ready = true
```

### Multi-variable declaration

Mellow supports declaration of multiple identifiers at once.

```mellow
keep a, b = 1, 2
let x, y = 10, 20
```

Rules:
- the number of names must match the number of values
- each target must be a valid identifier

---

## 11. Assignment

### Single assignment

```mellow
hp = 90
name = "New Name"
```

### Parallel / multi-assignment

```mellow
a, b = 1, 2
x, y = y, x
```

Rules:
- assignment targets must be identifiers
- the number of targets must equal the number of right-hand expressions
- direct assignment to `arr[i] = ...` is **not** handled as a statement form in this parser

---

## 12. Multiline Expressions

The parser can continue reading an expression across multiple lines when brackets, braces, or parentheses remain open.

```mellow
keep player = {
    "name": "Mellow",
    "hp": 100,
    "items": [
        "potion",
        "sword"
    ]
}
```

This behavior applies to declaration, assignment, and module-call argument collection.

---

## 13. Indexing

Indexing uses square brackets.

```mellow
keep xs = [10, 20, 30]
show xs[0]

keep m = {"name": "Mellow"}
show m["name"]
```

Supported form:

```text
expr[expr]
```

---

## 14. Function Definitions

### `skill`

The native function definition keyword is `skill`.

```mellow
skill add(a, b):
    return a + b
```

### Aliases

These forms are also accepted:

```mellow
def add(a, b):
    return a + b

fn add(a, b):
    return a + b

function add(a, b):
    return a + b
```

### Rules

- the header must end with `:`
- the header must look like `name(arg1, arg2)`
- parameters are comma-separated

### Example

```mellow
skill greet(name):
    show f"Hello {name}"
```

---

## 15. Function Calls

### Positional arguments

```mellow
show add(2, 3)
heal(10)
spawn_enemy("slime", 3)
```

### Named arguments

The expression parser supports named arguments in function calls.

```mellow
file_write("notes.txt", "hello", mode="w")
save_data(path="save.json", pretty=true)
```

Notes:
- named arguments are stored separately in the AST
- runtime support depends on the host implementation of the called function

---

## 16. Expression Statements

A bare expression can be used as a statement.
This is mainly useful for function calls.

```mellow
heal(10)
spawn_enemy("bat")
```

If a line does not match a dedicated statement form, the parser attempts to treat it as an expression statement.

---

## 17. Output: `show` and `print`

### `show`

```mellow
show "hello"
show hp
show "hp", hp, true
```

### `print`

`print` is accepted as an alias of `show`.

```mellow
print("hello")
print("hp", hp)
print hp, max_hp
```

Rules:
- both parenthesized and non-parenthesized forms are accepted
- multiple comma-separated values are supported

---

## 18. Precision

`precision` sets a numeric precision-related value handled by the runtime.

```mellow
precision 0.001
```

---

## 19. Conditionals

### `check / also / else`

The native conditional chain uses these keywords:

```mellow
check score >= 90:
    show "A"
also score >= 80:
    show "B"
else:
    show "C"
```

### `if / elif / else`

Python-style aliases are accepted:

```mellow
if score >= 90:
    show "A"
elif score >= 80:
    show "B"
else:
    show "C"
```

### Supported condition forms

The parser accepts:

```mellow
check hp > 0:
    show "alive"

check(hp > 0):
    show "alive"
```

The same applies to `if`, `also`, and `elif`.

---

## 20. While Loops

### Native `loop`

The native while-style loop uses `loop`.

```mellow
loop hp > 0:
    hp = hp - 10
```

Parenthesized form is also accepted:

```mellow
loop(hp > 0):
    hp = hp - 10
```

### Alias `while`

`while` is rewritten to `loop (...)`.

```mellow
while hp > 0:
    hp = hp - 10
```

### Optional `end`

```mellow
loop hp > 0:
    hp = hp - 1
end
```

---

## 21. Foreach Loops

### Single variable iteration

```mellow
loop item in items:
    show item
```

### Map-style iteration with two variables

```mellow
loop key, value in player:
    show key, value
```

### Alias using `for ... in ...`

```mellow
for item in items:
    show item
```

This is rewritten to the native `loop ... in ...:` form.

### Optional `end`

```mellow
loop item in items:
    show item
end
```

---

## 22. Numeric `for` Loops

Mellow 1.4.8 also supports a Lua-like numeric `for`.

### Form 1: only end value

```mellow
for i = 5:
    show i
```

Interpreted as:
- `start = 1`
- `end = 5`
- `step = default`

### Form 2: start and end

```mellow
for i = 1, 5:
    show i
```

### Form 3: start, end, step

```mellow
for i = 10, 0, -2:
    show i
```

### `do` form

The parser also accepts `do` variants.

```mellow
for i = 1, 5 do
    show i
end
```

### Notes

- the loop variable must be an identifier
- 1 to 3 range expressions are supported
- an optional `end` may follow the indented block

---

## 23. `loop count < N:`

Mellow includes a count-bounded loop form.

```mellow
loop count < 3:
    show "tick"
```

This is intended as a sandbox-friendly loop pattern.

Rules:
- must contain `<`
- must use the exact left side `count`

---

## 24. `repeat ... until`

A Lua-style repeat loop is supported.

```mellow
repeat:
    hp = hp - 1
until hp <= 0
```

Rules:
- block begins with `repeat:`
- must be followed by `until <condition>` at the same indentation level

---

## 25. `break` and `continue`

```mellow
loop x < 10:
    x = x + 1
    check x == 5:
        continue
    check x == 8:
        break
    show x
```

---

## 26. `do` Blocks

Mellow supports explicit scope-like `do` blocks.

```mellow
do:
    show "scoped block"
end
```

Accepted forms:

```mellow
do:
    show "hello"
```

or

```mellow
do
    show "hello"
end
```

The parser recognizes `do` and `do:`.

---

## 27. Error Handling: `try / catch / finally`

### Full form

```mellow
try:
    risky_call()
catch err:
    show err
finally:
    show "cleanup"
```

### Catch without variable

```mellow
try:
    risky_call()
catch:
    show "failed"
```

When omitted, the catch name defaults to `err`.

### Notes

- `catch` must end with `:`
- `finally` is optional
- the catch variable, if present, must be an identifier

---

## 28. `return`

### Return with value

```mellow
return hp + 1
```

### Empty return

```mellow
return
```

---

## 29. `stop`

Stops execution through a dedicated statement.

```mellow
stop
```

---

## 30. `wait`

Wait/sleep style statement:

```mellow
wait 0.5
```

The actual behavior depends on runtime permissions and host configuration.

---

## 31. `put ... into ...`

Adds a value into a named list target.

```mellow
put 5 into scores
put "potion" into inventory
```

Rules:
- syntax must contain `into`
- the right side is parsed as a name string, not a general expression target

---

## 32. Save / Load

### Save

```mellow
save {"score": 42} into "profile"
```

### Load

```mellow
load "profile" into data
show data
```

Notes:
- `save` parses both sides as expressions
- `load` parses the source as an expression and stores into a variable-like target name

---

## 33. Imports

Import syntax is sugar over module retrieval.

### String module name

```mellow
import "math" as math
```

### Bare module name

```mellow
import math as math
```

Rules:
- `as` is required
- alias must be a valid identifier

Implementation note:
- the parser rewrites imports into an assignment using `get`

---

## 34. Module System: `get` and `call`

Mellow 1.4.8 introduces explicit module access syntax.

### Statement form

```mellow
get math.sqrt(25)
call string.upper("hi")
get math.pi
```

### Expression form

```mellow
keep value = get math.sqrt(25)
keep pi = get math.pi
keep upper = call string.upper("mellow")
```

### Supported shapes

```text
get module.member
get module.member(...)
call module.member(...)
```

Notes:
- the parser expects `module.member`
- member access in general expressions is not a full free-form dot operator system
- `get` and `call` are the supported parser-level route for module-style access

---

## 35. Events: `on(...)`

Mellow supports event handler definitions.

```mellow
on("spawn", x, y):
    show x, y
```

Rules:
- first argument must be a **string literal** event name
- remaining items must be identifiers
- header must end with `:`

Example:

```mellow
on("damage", amount, source):
    show f"took {amount} from {source}"
```

---

## 36. Lists and Maps in Detail

### List literal

```mellow
keep xs = [1, 2, 3]
keep nested = [[1, 2], [3, 4]]
```

### Map literal

```mellow
keep config = {
    "title": "Mellow",
    "version": 148,
    "debug": true
}
```

Maps use `key: value` pairs separated by commas.

---

## 37. Boolean and Null Keywords

These are parsed as literal values:

```mellow
true
false
none
null
```

Example:

```mellow
keep enabled = true
keep fallback = none
```

---

## 38. Unsupported or Restricted Statement Targets

Important parser limitations in v1.4.8:

### Assignment targets

These work:

```mellow
a = 1
x, y = 1, 2
```

These are **not statement assignment targets** in the parser:

```mellow
items[0] = 1
player.name = "Ari"
```

### Dot access in general expressions

The parser does **not** expose general-purpose member access like:

```mellow
player.name
```

Instead, module-style dot access is handled through `get` / `call`:

```mellow
get math.sqrt(16)
```

---

## 39. Alias Summary

### Variable declarations

```mellow
keep x = 1
let x = 1
var x = 1
```

### Function definitions

```mellow
skill add(a, b):
    return a + b

def add(a, b):
    return a + b

fn add(a, b):
    return a + b

function add(a, b):
    return a + b
```

### Conditionals

```mellow
check x > 0:
    show "ok"

if x > 0:
    show "ok"
```

### Else-if

```mellow
also x > 0:
    show "ok"

elif x > 0:
    show "ok"
```

### Loops

```mellow
loop x < 5:
    x = x + 1

while x < 5:
    x = x + 1
```

### Foreach loops

```mellow
loop item in items:
    show item

for item in items:
    show item
```

### Output

```mellow
show "hello"
print("hello")
```

---

## 40. Practical Syntax Examples

### Example: state update

```mellow
keep hp = 100
keep dead = false

loop hp > 0:
    hp = hp - 25
    show f"HP = {hp}"

check hp <= 0:
    dead = true
    show "down"
```

### Example: function + conditionals

```mellow
skill rank(score):
    check score >= 90:
        return "A"
    also score >= 80:
        return "B"
    else:
        return "C"

show rank(87)
```

### Example: foreach loop

```mellow
keep items = ["potion", "ether", "elixir"]

for item in items:
    show item
```

### Example: numeric loop

```mellow
for i = 1, 5:
    show i
```

### Example: module calls

```mellow
keep root = get math.sqrt(81)
show root

call string.upper("hello")
```

### Example: try / catch

```mellow
try:
    risky_call()
catch err:
    show f"error: {err}"
finally:
    show "done"
```

---

## 41. Parser-Oriented Mini Grammar

This section is intentionally simplified for docs and onboarding.

```ebnf
program        = { statement } ;

statement      = keep_stmt
               | assign_stmt
               | skill_def
               | if_stmt
               | loop_stmt
               | foreach_stmt
               | numeric_for_stmt
               | repeat_until_stmt
               | try_stmt
               | return_stmt
               | show_stmt
               | precision_stmt
               | stop_stmt
               | wait_stmt
               | put_stmt
               | save_stmt
               | load_stmt
               | import_stmt
               | get_call_stmt
               | on_stmt
               | do_stmt
               | break_stmt
               | continue_stmt
               | expr_stmt ;

keep_stmt      = ("keep" | "let" | "var") ident_list "=" expr_list ;
assign_stmt    = ident_list "=" expr_list ;
skill_def      = ("skill" | "def" | "fn" | "function") ident "(" [params] ")" ":" block ;
if_stmt        = ("check" | "if") condition ":" block { ("also" | "elif") condition ":" block } [ "else:" block ] ;
loop_stmt      = ("loop" | "while") condition ":" block ;
foreach_stmt   = ("loop" | "for") ident_list "in" expr ":" block ;
numeric_for_stmt = "for" ident "=" expr_list ":" block ;
repeat_until_stmt = "repeat:" block "until" expr ;
try_stmt       = "try:" block [ "catch" [ident] ":" block ] [ "finally:" block ] ;
return_stmt    = "return" [expr] ;
show_stmt      = ("show" | "print") expr_list ;
precision_stmt = "precision" expr ;
stop_stmt      = "stop" ;
wait_stmt      = "wait" expr ;
put_stmt       = "put" expr "into" ident ;
save_stmt      = "save" expr "into" expr ;
load_stmt      = "load" expr "into" ident ;
import_stmt    = "import" (string | ident) "as" ident ;
get_call_stmt  = ("get" | "call") ident "." ident [ "(" [expr_list] ")" ] ;
on_stmt        = "on(" string { "," ident } "):" block ;
do_stmt        = "do" [":"] block ["end"] ;
expr_stmt      = expr ;

block          = INDENT { statement } DEDENT ["end"] ;
ident_list     = ident { "," ident } ;
expr_list      = expr { "," expr } ;
params         = ident { "," ident } ;
```

---

## 42. Version Notes for Docs Writers

When documenting Mellow 1.4.8 on a website, these points are worth highlighting:

1. **Mellow-first style**
   - `keep`, `check`, `also`, `loop`, `skill`, `show`

2. **Modern aliases**
   - `let`, `var`, `if`, `elif`, `while`, `for`, `def`, `fn`, `print`

3. **Module syntax**
   - `get math.sqrt(25)`
   - `call string.upper("hi")`

4. **Hybrid block style**
   - indentation is required
   - optional `end` exists in several constructs

5. **Parser limitations**
   - no general dot-access syntax for arbitrary expressions
   - assignment targets are identifier-only

---

## 43. Recommended Website Structure

For a docs website, this file can be split into these pages:

- Introduction
- Comments and blocks
- Variables and values
- Expressions and operators
- Functions
- Conditionals
- Loops
- Error handling
- Save/load and imports
- Module system (`get` / `call`)
- Events
- Full syntax reference

---

## 44. Short Cheat Sheet

```mellow
# variable
keep x = 10
let y = 20

# output
show x
print("hello", x)

# function
skill add(a, b):
    return a + b

# condition
check x > 0:
    show "positive"
also x == 0:
    show "zero"
else:
    show "negative"

# loops
loop x < 5:
    x = x + 1

for item in [1, 2, 3]:
    show item

for i = 1, 5:
    show i

repeat:
    x = x - 1
until x == 0

# module calls
keep root = get math.sqrt(16)
call string.upper("mellow")

# storage
save {"hp": 100} into "profile"
load "profile" into data

# events
on("spawn", x, y):
    show x, y
```

---

## 45. Final Note

This document reflects the syntax accepted by the **Mellow 1.4.8 parser** and is suitable as a detailed reference for website docs, handbooks, or a docs portal.
