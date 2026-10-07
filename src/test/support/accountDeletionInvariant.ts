// AD-1 — account-deletion cascade invariant: static repository contract (Layer 1).
//
// Builds a foreign-key and NOT NULL model from migration SQL text and checks every
// blocking foreign key (ON DELETE RESTRICT or NO ACTION) that protects an account-owned
// journey/family parent. The rule is 41B.0-R section 30.4. A row that can block deletion
// of such a parent must disappear in the account-deletion statement's first firing cycle.
// So its table needs its own direct user_id -> auth.users(id) ON DELETE CASCADE, user_id
// must be NOT NULL, and the protective FK must carry that same user_id, paired with the
// parent's user_id.
//
// The parser fails closed. SQL that could create, change or remove a foreign key, a
// user_id column or its NOT NULL state, and that this file does not understand, is an
// error and never silently skipped. That includes dynamic SQL outside the one recognised
// 41B.1A loop shape, unknown ALTER TABLE actions, and FK clauses with unexpected tails.
// This is a static early warning. The authoritative check is the Layer 2 catalogue query
// in docs/strategy/rehearsal-support/ad1-catalogue-contract.sql.

export type DeleteAction = "cascade" | "restrict" | "no action" | "set null" | "set default";

export interface ForeignKey {
  table: string;
  name: string;
  columns: string[];
  refTable: string;
  /** null = the referenced table's primary key (no column list written). */
  refColumns: string[] | null;
  onDelete: DeleteAction;
  deferrable: boolean;
  initiallyDeferred: boolean;
  source: string;
}

export interface TableModel {
  name: string;
  columns: Map<string, { notNull: boolean }>;
  fks: Map<string, ForeignKey>;
}

export interface SchemaModel {
  tables: Map<string, TableModel>;
  errors: string[];
}

export interface SqlSource {
  name: string;
  sql: string;
}

/** Explicitly registered protected family-parent types. Any account-owned table is protected as well. */
export const REGISTERED_PROTECTED_PARENTS = ["public.pregnancy_episodes", "public.babies"] as const;

const AUTH_USERS = "auth.users";
const AUTH_USERS_PK = ["id"];
const OWNER = "user_id";

// ---------------------------------------------------------------------------
// Lexing: strip comments, mask single-quoted literals (kept for the dynamic-SQL pass),
// make dollar-quote delimiters transparent so DO-block bodies are parsed as SQL.
// Treating every dollar-quoted body as executable SQL is deliberately conservative.
// ---------------------------------------------------------------------------
interface Lexed {
  text: string;
  literals: string[];
}

export function lex(sql: string, source: string, errors: string[]): Lexed {
  let out = "";
  const literals: string[] = [];
  let i = 0;
  while (i < sql.length) {
    const c = sql[i];
    const next = sql[i + 1];
    if (c === "-" && next === "-") {
      while (i < sql.length && sql[i] !== "\n") i++;
      out += " ";
      continue;
    }
    if (c === "/" && next === "*") {
      const end = sql.indexOf("*/", i + 2);
      if (end < 0) {
        errors.push(`${source}: unterminated block comment`);
        return { text: out, literals };
      }
      i = end + 2;
      out += " ";
      continue;
    }
    if (c === "$") {
      const tag = /^\$([a-z_][a-z0-9_]*)?\$/i.exec(sql.slice(i));
      if (tag) {
        out += " ";
        i += tag[0].length;
        continue;
      }
    }
    if (c === "'") {
      const escapeBackslash = /[eE]$/.test(out) && !/[a-z0-9_]$/i.test(out.slice(0, -1));
      let j = i + 1;
      let value = "";
      for (;;) {
        if (j >= sql.length) {
          errors.push(`${source}: unterminated string literal`);
          return { text: out, literals };
        }
        if (escapeBackslash && sql[j] === "\\") {
          value += sql[j + 1] ?? "";
          j += 2;
          continue;
        }
        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            value += "'";
            j += 2;
            continue;
          }
          break;
        }
        value += sql[j];
        j++;
      }
      literals.push(value);
      out += `'§${literals.length - 1}'`;
      i = j + 1;
      continue;
    }
    out += c;
    i++;
  }
  return { text: out, literals };
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
const IDENT = String.raw`(?:"[^"]+"|[a-z_][a-z0-9_$]*)`;
const QNAME = String.raw`(${IDENT}(?:\s*\.\s*${IDENT})?)`;

function normIdent(raw: string): string {
  const t = raw.trim();
  return t.startsWith('"') ? t.slice(1, -1) : t.toLowerCase();
}

export function normName(raw: string): string {
  const parts = raw.split(".").map(normIdent);
  return parts.length === 1 ? `public.${parts[0]}` : `${parts[0]}.${parts[1]}`;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

/** Index just after the parenthesised group that opens at `open`, or -1. */
function closeParen(text: string, open: number): number {
  let depth = 0;
  for (let k = open; k < text.length; k++) {
    if (text[k] === "(") depth++;
    if (text[k] === ")") {
      depth--;
      if (depth === 0) return k + 1;
    }
  }
  return -1;
}

/** Statement end: the next ';' at parenthesis depth 0 (literals are masked). */
function statementEnd(text: string, from: number): number {
  let depth = 0;
  for (let k = from; k < text.length; k++) {
    if (text[k] === "(") depth++;
    if (text[k] === ")") depth--;
    if (text[k] === ";" && depth <= 0) return k;
  }
  return text.length;
}

function identList(raw: string): string[] {
  return raw.split(",").map((s) => normIdent(s)).filter(Boolean);
}

const countReferences = (s: string) => (s.match(/\breferences\b/gi) ?? []).length;

// ---------------------------------------------------------------------------
// FK clause parsing
// ---------------------------------------------------------------------------
interface ParsedRef {
  refTable: string;
  refColumns: string[] | null;
  onDelete: DeleteAction;
  deferrable: boolean;
  initiallyDeferred: boolean;
  rest: string;
}

const ACTION = /^(cascade|restrict|no\s+action|set\s+null|set\s+default)(\s*\([^)]*\))?/i;

/** Parses `REFERENCES name [(cols)] [tail]`. With strictTail, the tail must be FK grammar only. */
function parseReferences(text: string, strictTail: boolean): ParsedRef | string {
  const m = new RegExp(String.raw`^references\s+${QNAME}\s*`, "i").exec(text);
  if (!m) return `cannot parse REFERENCES clause: "${text.slice(0, 80)}"`;
  let rest = text.slice(m[0].length);
  let refColumns: string[] | null = null;
  if (rest.startsWith("(")) {
    const end = closeParen(rest, 0);
    if (end < 0) return "unbalanced referenced column list";
    refColumns = identList(rest.slice(1, end - 1));
    rest = rest.slice(end).trim();
  }
  let onDelete: DeleteAction = "no action";
  let deferrable = false;
  let initiallyDeferred = false;
  for (;;) {
    rest = rest.trim();
    let mm: RegExpExecArray | null;
    if ((mm = /^match\s+(full|simple|partial)\b/i.exec(rest))) {
      rest = rest.slice(mm[0].length);
    } else if ((mm = /^on\s+(delete|update)\s+/i.exec(rest))) {
      const after = rest.slice(mm[0].length);
      const a = ACTION.exec(after);
      if (!a) return `unknown referential action: "${after.slice(0, 40)}"`;
      if (mm[1].toLowerCase() === "delete") {
        onDelete = a[1].toLowerCase().replace(/\s+/g, " ") as DeleteAction;
      }
      rest = after.slice(a[0].length);
    } else if ((mm = /^not\s+deferrable\b/i.exec(rest))) {
      deferrable = false;
      rest = rest.slice(mm[0].length);
    } else if ((mm = /^deferrable\b/i.exec(rest))) {
      deferrable = true;
      rest = rest.slice(mm[0].length);
    } else if ((mm = /^initially\s+(deferred|immediate)\b/i.exec(rest))) {
      initiallyDeferred = mm[1].toLowerCase() === "deferred";
      rest = rest.slice(mm[0].length);
    } else if ((mm = /^not\s+valid\b/i.exec(rest))) {
      rest = rest.slice(mm[0].length);
    } else {
      break;
    }
  }
  if (strictTail && rest.trim() !== "") return `unexpected text after foreign key: "${rest.trim().slice(0, 60)}"`;
  if (initiallyDeferred && !deferrable) deferrable = true;
  return { refTable: normName(m[1]), refColumns, onDelete, deferrable, initiallyDeferred, rest };
}

// ---------------------------------------------------------------------------
// Model mutation
// ---------------------------------------------------------------------------
function tableOf(model: SchemaModel, name: string): TableModel {
  let t = model.tables.get(name);
  if (!t) {
    t = { name, columns: new Map(), fks: new Map() };
    model.tables.set(name, t);
  }
  return t;
}

function defaultFkName(table: string, cols: string[]): string {
  return `${table.split(".")[1]}_${cols.join("_")}_fkey`;
}

function addFk(model: SchemaModel, fk: ForeignKey) {
  tableOf(model, fk.table).fks.set(fk.name, fk);
}

/** Column definition (CREATE TABLE element or ADD COLUMN body). */
function applyColumnDef(model: SchemaModel, table: string, def: string, where: string) {
  const m = new RegExp(String.raw`^(${IDENT})\s+`, "i").exec(def);
  if (!m) {
    model.errors.push(`${where}: cannot parse column definition "${def.slice(0, 60)}"`);
    return;
  }
  const col = normIdent(m[1]);
  const body = def.slice(m[0].length);
  const withoutIsNotNull = body.replace(/\bis\s+not\s+null\b/gi, " ");
  const notNull = /\bnot\s+null\b/i.test(withoutIsNotNull) || /\bprimary\s+key\b/i.test(withoutIsNotNull);
  tableOf(model, table).columns.set(col, { notNull });
  const refs = countReferences(body);
  if (refs === 0) return;
  if (refs > 1) {
    model.errors.push(`${where}: more than one REFERENCES on column ${col}`);
    return;
  }
  const idx = body.search(/\breferences\b/i);
  const before = body.slice(0, idx);
  const named = new RegExp(String.raw`\bconstraint\s+(${IDENT})\s*$`, "i").exec(before.trim());
  const parsed = parseReferences(body.slice(idx), false);
  if (typeof parsed === "string") {
    model.errors.push(`${where}: ${parsed}`);
    return;
  }
  if (countReferences(parsed.rest) > 0) {
    model.errors.push(`${where}: nested REFERENCES on column ${col}`);
    return;
  }
  addFk(model, {
    table,
    name: named ? normIdent(named[1]) : defaultFkName(table, [col]),
    columns: [col],
    ...stripRest(parsed),
    source: where,
  });
}

function stripRest(p: ParsedRef): Omit<ParsedRef, "rest"> {
  const { rest: _rest, ...keep } = p;
  return keep;
}

/** Table-level `[CONSTRAINT n] FOREIGN KEY (cols) REFERENCES ...`. */
function applyTableFk(model: SchemaModel, table: string, element: string, where: string) {
  const m = new RegExp(String.raw`^(?:constraint\s+(${IDENT})\s+)?foreign\s+key\s*\(([^)]*)\)\s*`, "i").exec(element);
  if (!m) {
    model.errors.push(`${where}: cannot parse FOREIGN KEY "${element.slice(0, 80)}"`);
    return;
  }
  const columns = identList(m[2]);
  const parsed = parseReferences(element.slice(m[0].length), true);
  if (typeof parsed === "string") {
    model.errors.push(`${where}: ${parsed}`);
    return;
  }
  if (parsed.refColumns && parsed.refColumns.length !== columns.length) {
    model.errors.push(`${where}: FK column count differs from referenced column count`);
    return;
  }
  addFk(model, {
    table,
    name: m[1] ? normIdent(m[1]) : defaultFkName(table, columns),
    columns,
    ...stripRest(parsed),
    source: where,
  });
}

const TABLE_CONSTRAINT = /^(?:constraint\s+\S+\s+)?(primary\s+key|unique|check|exclude|foreign\s+key)\b/i;

function applyCreateTable(model: SchemaModel, table: string, body: string, where: string) {
  for (const element of splitTopLevel(body)) {
    const kind = TABLE_CONSTRAINT.exec(element);
    if (/^like\b/i.test(element)) {
      model.errors.push(`${where}: CREATE TABLE ... LIKE is not supported`);
    } else if (kind && /^foreign\s+key$/i.test(kind[1].replace(/\s+/g, " "))) {
      applyTableFk(model, table, element, where);
    } else if (kind) {
      if (countReferences(element) > 0) model.errors.push(`${where}: REFERENCES inside non-FK table constraint`);
    } else {
      applyColumnDef(model, table, element, where);
    }
  }
}

function dropColumn(model: SchemaModel, table: string, col: string) {
  const t = tableOf(model, table);
  t.columns.delete(col);
  for (const [name, fk] of t.fks) if (fk.columns.includes(col)) t.fks.delete(name);
}

const IGNORABLE_ALTER_ACTIONS: RegExp[] = [
  /^(enable|disable|force|no\s+force)\s+row\s+level\s+security$/i,
  /^validate\s+constraint\s+\S+$/i,
  /^owner\s+to\b/i,
  /^replica\s+identity\b/i,
  /^(enable|disable)\s+(always\s+|replica\s+)?trigger\b/i,
  /^set\s*\(/i,
  /^reset\s*\(/i,
];

function applyAlterAction(model: SchemaModel, table: string, action: string, where: string) {
  let m: RegExpExecArray | null;
  if ((m = /^add\s+(?:constraint\s+\S+\s+)?(unique|primary\s+key|check|exclude)\b/i.exec(action))) {
    if (countReferences(action) > 0) model.errors.push(`${where}: REFERENCES inside non-FK constraint`);
    return;
  }
  if (/^add\s+(?:constraint\s+\S+\s+)?foreign\s+key\b/i.test(action)) {
    applyTableFk(model, table, action.replace(/^add\s+/i, ""), where);
    return;
  }
  if (/^add\s+constraint\b/i.test(action)) {
    model.errors.push(`${where}: unsupported ADD CONSTRAINT form "${action.slice(0, 80)}"`);
    return;
  }
  if ((m = /^add\s+(?:column\s+)?(?:if\s+not\s+exists\s+)?([\s\S]+)$/i.exec(action))) {
    applyColumnDef(model, table, m[1], where);
    return;
  }
  if ((m = new RegExp(String.raw`^drop\s+constraint\s+(?:if\s+exists\s+)?(${IDENT})(\s+(cascade|restrict))?$`, "i").exec(action))) {
    tableOf(model, table).fks.delete(normIdent(m[1]));
    return;
  }
  if ((m = new RegExp(String.raw`^drop\s+(?:column\s+)?(?:if\s+exists\s+)?(${IDENT})(\s+(cascade|restrict))?$`, "i").exec(action))) {
    dropColumn(model, table, normIdent(m[1]));
    return;
  }
  if ((m = new RegExp(String.raw`^alter\s+(?:column\s+)?(${IDENT})\s+(set|drop)\s+not\s+null$`, "i").exec(action))) {
    const col = tableOf(model, table).columns.get(normIdent(m[1]));
    if (!col) {
      model.errors.push(`${where}: NOT NULL change on unknown column ${m[1]}`);
      return;
    }
    col.notNull = m[2].toLowerCase() === "set";
    return;
  }
  if (new RegExp(String.raw`^alter\s+(?:column\s+)?${IDENT}\s+(set\s+default|drop\s+default|type|set\s+data\s+type|set\s+statistics|set\s+storage|set\s+compression)\b`, "i").test(action)) {
    if (countReferences(action) > 0) model.errors.push(`${where}: REFERENCES inside ALTER COLUMN`);
    return;
  }
  if (IGNORABLE_ALTER_ACTIONS.some((r) => r.test(action))) return;
  model.errors.push(`${where}: unsupported ALTER TABLE action "${action.slice(0, 80)}"`);
}

// ---------------------------------------------------------------------------
// Dynamic SQL: only the 41B.1A shape is recognised.
//   tables text[] := ARRAY['a', ...]; FOREACH t IN ARRAY tables LOOP ... EXECUTE format('...', args) ... END LOOP
// Arguments may be the loop variable, a literal, or a || concatenation of those. Only %I is expanded.
// ---------------------------------------------------------------------------
interface Positioned {
  at: number;
  sql: string;
  where: string;
}

function expandDynamic(lexed: Lexed, source: string, errors: string[]): { statements: Positioned[]; consumed: Set<number> } {
  const statements: Positioned[] = [];
  const consumed = new Set<number>();
  const lit = (ph: string) => lexed.literals[Number(ph.replace(/[^0-9]/g, ""))];
  const loopRe = /\b([a-z_]+)\s+text\[\]\s*:=\s*array\s*\[([^\]]*)\]([\s\S]*?)\bforeach\s+([a-z_]+)\s+in\s+array\s+([a-z_]+)\s+loop\b([\s\S]*?)(\bend\s+loop\b)/gi;
  let loop: RegExpExecArray | null;
  const covered: Array<[number, number]> = [];
  while ((loop = loopRe.exec(lexed.text))) {
    const [, arrayVar, arrayBody, , loopVar, iterated, body, endLoop] = loop;
    if (arrayVar.toLowerCase() !== iterated.toLowerCase()) {
      errors.push(`${source}: FOREACH iterates ${iterated}, not the declared array ${arrayVar}`);
      continue;
    }
    const placeholders = arrayBody.match(/'§\d+'/g) ?? [];
    if (placeholders.length === 0 || arrayBody.replace(/'§\d+'|,|\s/g, "") !== "") {
      errors.push(`${source}: loop array is not a plain list of literals`);
      continue;
    }
    const tables = placeholders.map(lit);
    const bodyStart = loop.index + loop[0].length - endLoop.length - body.length;
    covered.push([loop.index, loop.index + loop[0].length]);
    const execRe = /\bexecute\s+format\s*\(/gi;
    let ex: RegExpExecArray | null;
    while ((ex = execRe.exec(body))) {
      const open = ex.index + ex[0].length - 1;
      const close = closeParen(body, open);
      if (close < 0) {
        errors.push(`${source}: unbalanced EXECUTE format(`);
        continue;
      }
      const args = splitTopLevel(body.slice(open + 1, close - 1));
      const templateParts = args[0].match(/'§\d+'/g) ?? [];
      if (templateParts.length === 0 || args[0].replace(/'§\d+'|\s/g, "") !== "") {
        errors.push(`${source}: EXECUTE format template is not literal text`);
        continue;
      }
      templateParts.forEach((p) => consumed.add(Number(p.replace(/[^0-9]/g, ""))));
      const template = templateParts.map(lit).join("");
      if (/%[^I%]/.test(template)) {
        errors.push(`${source}: format specifier other than %I in dynamic DDL`);
        continue;
      }
      for (const table of tables) {
        const values: string[] = [];
        let bad = false;
        for (const expr of args.slice(1)) {
          const terms = expr.split("||").map((s) => s.trim());
          let v = "";
          for (const term of terms) {
            if (term.toLowerCase() === loopVar.toLowerCase()) v += table;
            else if (/^'§\d+'$/.test(term)) {
              v += lit(term);
              consumed.add(Number(term.replace(/[^0-9]/g, "")));
            } else bad = true;
          }
          values.push(v);
        }
        const holes = (template.match(/%I/g) ?? []).length;
        if (bad || holes !== values.length) {
          errors.push(`${source}: unsupported EXECUTE format arguments`);
          break;
        }
        let k = 0;
        const sql = template.replace(/%I/g, () => values[k++]).replace(/%%/g, "%");
        statements.push({ at: bodyStart + ex.index, sql, where: `${source} (dynamic, ${table})` });
      }
    }
  }
  // Any other EXECUTE (outside the recognised loop) cannot be analysed: fail closed.
  const execAny = /\bexecute\b(?!\s+(function|procedure)\b)/gi;
  let e: RegExpExecArray | null;
  while ((e = execAny.exec(lexed.text))) {
    const at = e.index;
    const precededByGrant = /\b(grant|revoke)\s+(all\s+privileges\s*,?\s*|[a-z]+\s*,\s*)*$/i.test(lexed.text.slice(Math.max(0, at - 80), at));
    const inLoop = covered.some(([a, b]) => at >= a && at < b);
    if (!precededByGrant && !inLoop) errors.push(`${source}: dynamic EXECUTE outside the recognised loop pattern`);
  }
  return { statements, consumed };
}

// ---------------------------------------------------------------------------
// Static statements
// ---------------------------------------------------------------------------
function collectStatements(text: string, source: string): Positioned[] {
  const found: Positioned[] = [];
  const re = /\b(create\s+(?:(?:global|local)\s+)?(?:temp\s+|temporary\s+|unlogged\s+)?table|alter\s+table|drop\s+table)\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const end = statementEnd(text, m.index);
    found.push({ at: m.index, sql: text.slice(m.index, end), where: source });
    re.lastIndex = end;
  }
  return found;
}

function applyStatement(model: SchemaModel, stmt: Positioned) {
  const sql = stmt.sql.replace(/\s+/g, " ").trim();
  let m: RegExpExecArray | null;
  if ((m = new RegExp(String.raw`^create\s+(?:(?:global|local)\s+)?(?:temp\s+|temporary\s+|unlogged\s+)?table\s+(?:if\s+not\s+exists\s+)?${QNAME}\s*\(`, "i").exec(sql))) {
    const open = m[0].length - 1;
    const close = closeParen(sql, open);
    if (close < 0) {
      model.errors.push(`${stmt.where}: unbalanced CREATE TABLE`);
      return;
    }
    const table = normName(m[1]);
    const tail = sql.slice(close).trim();
    if (countReferences(tail) > 0 || /^(partition|inherits)\b/i.test(tail)) {
      model.errors.push(`${stmt.where}: unsupported CREATE TABLE tail on ${table}`);
      return;
    }
    applyCreateTable(model, table, sql.slice(open + 1, close - 1), stmt.where);
    return;
  }
  if (/^create\b/i.test(sql)) {
    if (countReferences(sql) > 0 || /\btable\s+\S+\s+(as|partition)\b/i.test(sql)) {
      model.errors.push(`${stmt.where}: unsupported CREATE TABLE form "${sql.slice(0, 80)}"`);
    }
    return;
  }
  if ((m = new RegExp(String.raw`^alter\s+table\s+(?:if\s+exists\s+)?(?:only\s+)?${QNAME}\s+`, "i").exec(sql))) {
    const table = normName(m[1]);
    const rest = sql.slice(m[0].length);
    if (/^rename\b/i.test(rest)) {
      model.errors.push(`${stmt.where}: ALTER TABLE ... RENAME on ${table} is not supported`);
      return;
    }
    for (const action of splitTopLevel(rest)) applyAlterAction(model, table, action, stmt.where);
    return;
  }
  if ((m = /^drop\s+table\s+(?:if\s+exists\s+)?([\s\S]+?)(\s+(cascade|restrict))?$/i.exec(sql))) {
    for (const raw of m[1].split(",")) {
      const name = normName(raw.trim());
      model.tables.delete(name);
      if (m[3]?.toLowerCase() === "cascade") {
        for (const t of model.tables.values()) for (const [n, fk] of t.fks) if (fk.refTable === name) t.fks.delete(n);
      }
    }
    return;
  }
  model.errors.push(`${stmt.where}: unrecognised statement "${sql.slice(0, 60)}"`);
}

const DDL_IN_LITERAL = /\b(references|foreign\s+key|alter\s+table|create\s+table|drop\s+table|drop\s+column|drop\s+constraint|set\s+not\s+null|drop\s+not\s+null)\b/i;

/** Applies migration sources in order and returns the resulting model (errors included). */
export function buildSchema(sources: SqlSource[]): SchemaModel {
  const model: SchemaModel = { tables: new Map(), errors: [] };
  for (const src of sources) {
    const lexed = lex(src.sql, src.name, model.errors);
    const dynamic = expandDynamic(lexed, src.name, model.errors);
    lexed.literals.forEach((value, i) => {
      if (!dynamic.consumed.has(i) && DDL_IN_LITERAL.test(value)) {
        model.errors.push(`${src.name}: DDL-like text in a string literal outside the recognised pattern: "${value.slice(0, 60)}"`);
      }
    });
    const statements = [...collectStatements(lexed.text, src.name), ...dynamic.statements].sort((a, b) => a.at - b.at);
    const referencesSeen = countReferences(lexed.text);
    const referencesInStatements = collectStatements(lexed.text, src.name).reduce((n, s) => n + countReferences(s.sql), 0);
    if (referencesSeen !== referencesInStatements) {
      model.errors.push(`${src.name}: ${referencesSeen - referencesInStatements} REFERENCES outside CREATE/ALTER TABLE`);
    }
    for (const stmt of statements) applyStatement(model, stmt);
  }
  return model;
}

// ---------------------------------------------------------------------------
// AD-1 evaluation
// ---------------------------------------------------------------------------
export interface Ad1Result {
  fk: ForeignKey;
  parentAccountOwned: boolean;
  directAuthFk: ForeignKey | null;
  status: "PASS" | "FAIL";
  reasons: string[];
}

export interface Ad1Report {
  protectedParents: string[];
  results: Ad1Result[];
  errors: string[];
  status: "PASS" | "FAIL";
}

export const isBlocking = (fk: ForeignKey) => fk.onDelete === "restrict" || fk.onDelete === "no action";

/** Direct single-column user_id -> auth.users FK on this table, if any (a CASCADE one is preferred). */
function directAuthFk(t: TableModel): ForeignKey | null {
  const candidates = [...t.fks.values()].filter(
    (fk) => fk.refTable === AUTH_USERS && fk.columns.length === 1 && fk.columns[0] === OWNER,
  );
  return candidates.find((fk) => fk.onDelete === "cascade") ?? candidates[0] ?? null;
}

const referencesAuthPk = (fk: ForeignKey) =>
  fk.refColumns === null || (fk.refColumns.length === 1 && fk.refColumns[0] === AUTH_USERS_PK[0]);

/** Account-owned: user_id NOT NULL with a direct ON DELETE CASCADE FK to auth.users(id). */
export function isAccountOwned(t: TableModel | undefined): boolean {
  if (!t) return false;
  const fk = directAuthFk(t);
  return !!fk && fk.onDelete === "cascade" && referencesAuthPk(fk) && t.columns.get(OWNER)?.notNull === true;
}

export function evaluateAd1(model: SchemaModel, registered: readonly string[] = REGISTERED_PROTECTED_PARENTS): Ad1Report {
  const accountOwned = [...model.tables.values()].filter(isAccountOwned).map((t) => t.name);
  const protectedParents = [...new Set([...registered, ...accountOwned])].sort();
  const errors = [...model.errors];
  for (const name of registered) {
    if (model.tables.has(name) && !isAccountOwned(model.tables.get(name))) {
      errors.push(`registered protected parent ${name} exists but its account ownership cannot be established`);
    }
  }
  const results: Ad1Result[] = [];
  for (const t of model.tables.values()) {
    for (const fk of t.fks.values()) {
      if (!isBlocking(fk) || !protectedParents.includes(fk.refTable)) continue;
      const reasons: string[] = [];
      const parent = model.tables.get(fk.refTable);
      const parentAccountOwned = isAccountOwned(parent);
      if (!parentAccountOwned) reasons.push("protected parent is not account-owned (no NOT NULL user_id with direct auth.users CASCADE)");
      const ownerCol = t.columns.get(OWNER);
      if (!ownerCol) reasons.push("B: referencing table has no user_id column");
      const pos = fk.columns.indexOf(OWNER);
      if (pos < 0) reasons.push("C: protected FK does not include the referencing table's user_id");
      if (fk.refColumns === null) reasons.push("D: protected FK references the parent primary key, not an ownership key including user_id");
      else if (pos >= 0 && fk.refColumns[pos] !== OWNER) reasons.push("D: user_id is not paired with the parent's user_id");
      if (ownerCol && !ownerCol.notNull) reasons.push("E: referencing user_id is nullable");
      const direct = directAuthFk(t);
      if (!direct) reasons.push("F/I: no direct user_id -> auth.users FK on the referencing table (two-hop paths do not satisfy AD-1)");
      else {
        if (!referencesAuthPk(direct)) reasons.push("G: account FK does not reference the auth.users primary key (id)");
        if (direct.onDelete !== "cascade") reasons.push(`H: account FK ON DELETE ${direct.onDelete.toUpperCase()}, not CASCADE`);
      }
      results.push({ fk, parentAccountOwned, directAuthFk: direct, status: reasons.length ? "FAIL" : "PASS", reasons });
    }
  }
  results.sort((a, b) => `${a.fk.table}.${a.fk.name}`.localeCompare(`${b.fk.table}.${b.fk.name}`));
  const status = errors.length === 0 && results.length > 0 && results.every((r) => r.status === "PASS") ? "PASS" : "FAIL";
  if (results.length === 0) errors.push("J: zero protected blocking relationships discovered");
  return { protectedParents, results, errors, status };
}
