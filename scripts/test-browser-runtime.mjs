import assert from 'node:assert/strict';
import { runMellowCode } from '../src/lib/mellowBrowserRuntime.ts';

function stdout(source) {
  const result = runMellowCode(source);
  const error = result.find((line) => line.type === 'error');
  assert.equal(error, undefined, error?.message);
  return result.filter((line) => line.type === 'stdout').map((line) => line.message);
}

assert.deepEqual(stdout('print("Hello, Mellow")'), ['Hello, Mellow']);

assert.deepEqual(stdout(`let score = 0

def add(a, b):
    return a + b

for i in range(0, 6):
    score = add(score, i)

print(score)`), ['15']);

assert.deepEqual(stdout(`let score = 4

if score >= 10:
    print("win")
else:
    print("keep going")`), ['keep going']);

assert.deepEqual(stdout(`let subtotal = money("0.10", "THB")
let fee = money("0.20", "THB")
let total = money_add(subtotal, fee)
print(money_format(total))`), ['0.30 THB']);

assert.deepEqual(stdout(`print(type([1, 2, 3]))
print(max(2, 8, 4))
print(floor(sqrt(10)))`), ['list', '8', '3']);

assert.deepEqual(stdout(`let book = ledger_create("THB")
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
print(ledger_verify(book)["ok"])`), ['100.00 THB', 'true']);

const syntaxError = runMellowCode('let value =');
assert.equal(syntaxError[0]?.type, 'error');
assert.match(syntaxError[0]?.message ?? '', /Line 1/);

const loopGuard = runMellowCode(`let value = 0
while true:
    value = value + 1`);
assert.equal(loopGuard[0]?.type, 'error');
assert.match(loopGuard[0]?.message ?? '', /1000 iterations/);

console.log('Browser runtime tests passed.');
