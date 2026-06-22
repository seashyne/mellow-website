export type RuntimeLine = {
  type: 'stdout' | 'success' | 'error' | 'info';
  message: string;
};

type SourceLine = {
  indent: number;
  text: string;
  lineNumber: number;
};

type Env = Record<string, unknown>;

type UserFunction = {
  params: string[];
  body: SourceLine[];
};

type RuntimeState = {
  stdout: string[];
  functions: Record<string, UserFunction>;
};

type ReturnSignal = {
  __return: true;
  value: unknown;
};

const MAX_LOOP_ITERATIONS = 1000;

const FORBIDDEN_EXPR_TOKENS = [
  'window',
  'document',
  'globalThis',
  'Function',
  'constructor',
  'prototype',
  'eval',
  'fetch',
  'XMLHttpRequest',
  'localStorage',
  'sessionStorage',
  'navigator',
  'location',
  'history',
  'parent',
  'frames',
  'self',
  'top',
  'alert',
  'open',
  'setTimeout',
  'setInterval',
  'WebSocket',
  'Worker',
  'indexedDB',
  'import',
  'require',
  'process',
];

function normalizeSource(source: string): SourceLine[] {
  const lines: SourceLine[] = [];
  let pending: SourceLine | null = null;
  let nesting = 0;

  source
    .replace(/\r\n/g, '\n')
    .split('\n')
    .forEach((raw, index) => {
      const withoutComment = stripComment(raw);
      const text = withoutComment.trim();
      if (!text) return;

      if (!pending) {
        pending = {
          indent: withoutComment.match(/^ */)?.[0].length ?? 0,
          text,
          lineNumber: index + 1,
        };
      } else {
        pending.text = `${pending.text} ${text}`;
      }

      nesting += expressionNestingDelta(text);
      if (nesting < 0) {
        throw new Error(`Line ${index + 1}: unexpected closing bracket`);
      }

      if (nesting === 0 && pending) {
        lines.push(pending);
        pending = null;
      }
    });

  if (pending || nesting !== 0) {
    throw new Error(`Line ${pending?.lineNumber ?? 1}: unclosed expression`);
  }

  return lines;
}

function expressionNestingDelta(text: string): number {
  let delta = 0;
  let inString: '"' | "'" | null = null;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const prev = text[index - 1];

    if ((char === '"' || char === "'") && prev !== '\\') {
      inString = inString === char ? null : inString ?? char;
      continue;
    }

    if (inString) continue;
    if (char === '(' || char === '[' || char === '{') delta += 1;
    if (char === ')' || char === ']' || char === '}') delta -= 1;
  }

  return delta;
}

function stripComment(line: string): string {
  let inString: '"' | "'" | null = null;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const prev = line[index - 1];

    if ((char === '"' || char === "'") && prev !== '\\') {
      inString = inString === char ? null : inString ?? char;
    }

    if (char === '#' && !inString) {
      return line.slice(0, index);
    }
  }

  return line;
}

function collectBlock(lines: SourceLine[], start: number, parentIndent: number) {
  const block: SourceLine[] = [];
  let cursor = start;

  while (cursor < lines.length && lines[cursor].indent > parentIndent) {
    block.push(lines[cursor]);
    cursor += 1;
  }

  if (block.length === 0) {
    throw new Error(`Line ${lines[start - 1]?.lineNumber ?? start}: expected an indented block`);
  }

  return { block, next: cursor };
}

function isReturnSignal(value: unknown): value is ReturnSignal {
  return Boolean(value && typeof value === 'object' && (value as ReturnSignal).__return);
}

function createBuiltins(state: RuntimeState, env: Env) {
  const builtins: Record<string, unknown> = {
    len: (value: unknown) => {
      if (Array.isArray(value) || typeof value === 'string') return value.length;
      if (value && typeof value === 'object') return Object.keys(value).length;
      return 0;
    },
    range: (start: number, end?: number) => {
      const from = end === undefined ? 0 : start;
      const to = end === undefined ? start : end;
      const out: number[] = [];
      for (let value = from; value < to; value += 1) out.push(value);
      return out;
    },
    str: (value: unknown) => String(value),
    int: (value: unknown) => Number.parseInt(String(value), 10),
    float: (value: unknown) => Number.parseFloat(String(value)),
    type: typeName,
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    sqrt: Math.sqrt,
    min: (...values: number[]) => Math.min(...values),
    max: (...values: number[]) => Math.max(...values),
    money,
    money_add,
    money_format,
    ledger_create,
    ledger_post,
    ledger_balance,
    ledger_verify,
  };

  Object.entries(state.functions).forEach(([name, fn]) => {
    builtins[name] = (...args: unknown[]) => {
      const localEnv: Env = { ...env };
      fn.params.forEach((param, index) => {
        localEnv[param] = args[index];
      });

      const result = executeBlock(fn.body, localEnv, state);
      return isReturnSignal(result) ? result.value : null;
    };
  });

  return builtins;
}

function assertSafeExpression(expression: string, lineNumber: number) {
  if (/[`;]|=>/.test(expression)) {
    throw new Error(`Line ${lineNumber}: unsupported expression syntax`);
  }

  const padded = ` ${expression} `;
  const forbidden = FORBIDDEN_EXPR_TOKENS.find((token) =>
    new RegExp(`[^A-Za-z0-9_]${token}[^A-Za-z0-9_]`).test(padded),
  );

  if (forbidden) {
    throw new Error(`Line ${lineNumber}: '${forbidden}' is not available in the browser runtime`);
  }
}

function toJavaScriptExpression(expression: string) {
  return expression
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\b/g, '!')
    .replace(/\bnone\b/g, 'null')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null');
}

function evaluateExpression(expression: string, env: Env, state: RuntimeState, lineNumber: number): unknown {
  assertSafeExpression(expression, lineNumber);

  const builtins = createBuiltins(state, env);
  const scope = { ...builtins, ...env };
  const names = Object.keys(scope);
  const values = Object.values(scope);
  const jsExpression = toJavaScriptExpression(expression);

  try {
    return Function(...names, `"use strict"; return (${jsExpression});`)(...values);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Line ${lineNumber}: ${message}`);
  }
}

function executeBlock(lines: SourceLine[], env: Env, state: RuntimeState): ReturnSignal | undefined {
  let cursor = 0;

  while (cursor < lines.length) {
    const line = lines[cursor];
    const text = line.text;

    if (text.startsWith('def ') && text.endsWith(':')) {
      const match = text.match(/^def\s+([A-Za-z_][A-Za-z0-9_]*)\(([^)]*)\):$/);
      if (!match) throw new Error(`Line ${line.lineNumber}: invalid function definition`);
      const { block, next } = collectBlock(lines, cursor + 1, line.indent);
      state.functions[match[1]] = {
        params: match[2].split(',').map((param) => param.trim()).filter(Boolean),
        body: block,
      };
      cursor = next;
      continue;
    }

    if (text.startsWith('for ') && text.endsWith(':')) {
      const match = text.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+):$/);
      if (!match) throw new Error(`Line ${line.lineNumber}: invalid for loop`);
      const { block, next } = collectBlock(lines, cursor + 1, line.indent);
      const iterable = evaluateExpression(match[2], env, state, line.lineNumber);
      if (!Array.isArray(iterable)) throw new Error(`Line ${line.lineNumber}: for loop expects a list`);

      for (const item of iterable) {
        env[match[1]] = item;
        const result = executeBlock(block, env, state);
        if (result) return result;
      }

      cursor = next;
      continue;
    }

    if (text.startsWith('while ') && text.endsWith(':')) {
      const condition = text.slice(6, -1).trim();
      const { block, next } = collectBlock(lines, cursor + 1, line.indent);
      let iterations = 0;

      while (Boolean(evaluateExpression(condition, env, state, line.lineNumber))) {
        iterations += 1;
        if (iterations > MAX_LOOP_ITERATIONS) {
          throw new Error(`Line ${line.lineNumber}: loop stopped after ${MAX_LOOP_ITERATIONS} iterations`);
        }

        const result = executeBlock(block, env, state);
        if (result) return result;
      }

      cursor = next;
      continue;
    }

    if (text.startsWith('if ') && text.endsWith(':')) {
      const condition = text.slice(3, -1).trim();
      const { block, next } = collectBlock(lines, cursor + 1, line.indent);
      const conditionPassed = Boolean(evaluateExpression(condition, env, state, line.lineNumber));

      if (conditionPassed) {
        const result = executeBlock(block, env, state);
        if (result) return result;
      }

      if (lines[next]?.indent === line.indent && lines[next]?.text === 'else:') {
        const elseBranch = collectBlock(lines, next + 1, line.indent);
        if (!conditionPassed) {
          const result = executeBlock(elseBranch.block, env, state);
          if (result) return result;
        }
        cursor = elseBranch.next;
      } else {
        cursor = next;
      }
      continue;
    }

    if (text === 'else:') {
      throw new Error(`Line ${line.lineNumber}: else must follow an if block`);
    }

    if (text.startsWith('return ')) {
      return {
        __return: true,
        value: evaluateExpression(text.slice(7), env, state, line.lineNumber),
      };
    }

    const letMatch = text.match(/^let\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
    if (letMatch) {
      env[letMatch[1]] = evaluateExpression(letMatch[2], env, state, line.lineNumber);
      cursor += 1;
      continue;
    }

    if (text.startsWith('let ')) {
      throw new Error(`Line ${line.lineNumber}: invalid declaration; expected 'let name = expression'`);
    }

    const assignMatch = text.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
    if (assignMatch) {
      env[assignMatch[1]] = evaluateExpression(assignMatch[2], env, state, line.lineNumber);
      cursor += 1;
      continue;
    }

    const printMatch = text.match(/^print\((.*)\)$/);
    if (printMatch) {
      state.stdout.push(formatValue(evaluateExpression(printMatch[1], env, state, line.lineNumber)));
      cursor += 1;
      continue;
    }

    evaluateExpression(text, env, state, line.lineNumber);
    cursor += 1;
  }

  return undefined;
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return 'none';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function typeName(value: unknown): string {
  if (value === null || value === undefined) return 'none';
  if (Array.isArray(value)) return 'list';
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float';
  if (typeof value === 'boolean') return 'bool';
  if (typeof value === 'string') return 'str';
  if (typeof value === 'function') return 'function';
  return 'map';
}

function money(amount: string | number, currency: string) {
  return { amount: Number.parseFloat(String(amount)), currency };
}

function money_add(left: ReturnType<typeof money>, right: ReturnType<typeof money>) {
  if (left.currency !== right.currency) throw new Error('currency mismatch');
  return { amount: left.amount + right.amount, currency: left.currency };
}

function money_format(value: ReturnType<typeof money>) {
  return `${value.amount.toFixed(2)} ${value.currency}`;
}

function ledger_create(currency: string) {
  return { currency, entries: [] as Array<{ account: string; amount: string }> };
}

function ledger_post(
  book: ReturnType<typeof ledger_create>,
  _id: string,
  entries: Array<{ account: string; amount: string }>,
  _memo: string,
) {
  return { ...book, entries: [...book.entries, ...entries] };
}

function ledger_balance(book: ReturnType<typeof ledger_create>, account: string) {
  const amount = book.entries
    .filter((entry) => entry.account === account)
    .reduce((sum, entry) => sum + Number.parseFloat(entry.amount), 0);
  return money(amount, book.currency);
}

function ledger_verify(book: ReturnType<typeof ledger_create>) {
  const sum = book.entries.reduce((total, entry) => total + Number.parseFloat(entry.amount), 0);
  return { ok: Math.abs(sum) < 0.000001 };
}

export function runMellowCode(source: string): RuntimeLine[] {
  const state: RuntimeState = {
    stdout: [],
    functions: {},
  };

  try {
    const lines = normalizeSource(source);
    executeBlock(lines, {}, state);

    return [
      ...state.stdout.map((message) => ({ type: 'stdout' as const, message })),
      { type: 'success', message: `Program finished (${state.stdout.length} output line${state.stdout.length === 1 ? '' : 's'})` },
    ];
  } catch (error) {
    return [
      {
        type: 'error',
        message: error instanceof Error ? error.message : String(error),
      },
    ];
  }
}
