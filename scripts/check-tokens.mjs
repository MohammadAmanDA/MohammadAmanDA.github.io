/**
 * Enforces two rules from CLAUDE.md that are otherwise a matter of memory:
 *
 *   check:tokens — no hardcoded colour anywhere in src/ except the token
 *                  definitions in src/styles/global.css.
 *   check:tk     — no `TK:` placeholder survives into a production build.
 *
 * The TK check is advisory until launch (it reports, and only fails when run
 * with --strict), because the site is deliberately full of TKs during drafting.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = 'src';
const TOKEN_FILE = join('src', 'styles', 'global.css');
const COLOUR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g;
const strict = process.argv.includes('--strict');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

const files = walk(SRC).filter((f) => /\.(astro|css|ts|tsx|js|jsx)$/.test(f));

let colourViolations = 0;
let tkCount = 0;

for (const file of files) {
  const rel = relative('.', file);
  const text = readFileSync(file, 'utf8');

  if (rel !== TOKEN_FILE) {
    text.split('\n').forEach((line, i) => {
      // Comments may mention colours; declarations may not.
      const stripped = line.replace(/\/\*.*?\*\//g, '').replace(/^\s*(\/\/|\*|#).*/, '');
      const hits = stripped.match(COLOUR);
      if (hits) {
        console.error(`  ${rel}:${i + 1}  hardcoded colour ${hits.join(', ')}`);
        colourViolations++;
      }
    });
  }

  tkCount += (text.match(/TK:/g) ?? []).length;
}

// Content files carry TKs too.
for (const file of walk('src/content').filter((f) => /\.(yaml|md)$/.test(f))) {
  tkCount += (readFileSync(file, 'utf8').match(/TK:/g) ?? []).length;
}

if (colourViolations > 0) {
  console.error(`\nFAIL: ${colourViolations} hardcoded colour(s) outside ${TOKEN_FILE}.`);
  process.exit(1);
}
console.log(`OK: no hardcoded colours outside ${TOKEN_FILE}.`);

if (tkCount > 0) {
  const msg = `${tkCount} unresolved TK placeholder(s) remain.`;
  if (strict) {
    console.error(`FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`NOTE: ${msg} These must be zero before launch (run with --strict).`);
} else {
  console.log('OK: no TK placeholders remain.');
}
