// Busca cotacao + histórico 12M (sem token) no Yahoo Finance e grava precos.js.
// Le os tickers/simbolos do acoes.js. Rodar: node gera_precos.js
// Producao: agendar num GitHub Action a cada ~15min e commitar o precos.js.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

globalThis.window = {};
eval(fs.readFileSync(path.join(__dirname, "acoes.js"), "utf8"));
const ACOES = window.ACOES;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function chart(sym, range, interval) {
  const u = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=${range}&interval=${interval}`;
  const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return (await r.json()).chart.result[0];
}
// cotacao + variacao do dia (range=1d -> chartPreviousClose = fechamento de ontem)
async function quote(sym) {
  const res = await chart(sym, "1d", "1d");
  const m = res.meta;
  const price = m.regularMarketPrice;
  const prev = m.chartPreviousClose ?? m.previousClose ?? price;
  return { preco: +(+price).toFixed(2), chg: prev ? +(((price / prev) - 1) * 100).toFixed(2) : 0, moeda: m.currency };
}
// historico 12M semanal indexado a 100
async function hist12m(sym) {
  const res = await chart(sym, "1y", "1wk");
  const closes = ((res.indicators && res.indicators.quote[0].close) || []).filter((x) => x != null);
  const base = closes[0];
  return base ? closes.map((c) => +((100 * c) / base).toFixed(1)) : [];
}

// IBOV (^BVSP) p/ comparar performance
let ibov = [];
try { ibov = await hist12m("^BVSP"); console.log(`  IBOV ^BVSP -> ${ibov.length} pts`); }
catch (e) { console.warn("  IBOV falhou:", e.message); }
await sleep(120);

const PRECOS = {};
let ok = 0, fail = 0;
for (const e of ACOES.empresas) {
  try {
    const q = await quote(e.yahoo);
    let h = []; try { h = await hist12m(e.yahoo); } catch (_) {}
    PRECOS[e.ticker] = { preco: q.preco, chg: q.chg, moeda: q.moeda, hist: h };
    ok++;
    console.log(`  ${e.ticker.padEnd(6)} ${e.yahoo.padEnd(10)} -> ${q.moeda} ${q.preco} (${q.chg >= 0 ? "+" : ""}${q.chg}%) hist ${h.length}`);
  } catch (err) {
    PRECOS[e.ticker] = { preco: e.preco_ref, chg: 0, moeda: e.moeda, hist: [], _fallback: true };
    fail++;
    console.warn(`  ${e.ticker.padEnd(6)} ${e.yahoo.padEnd(10)} -> FALHOU (${err.message}); preco_ref ${e.preco_ref}`);
  }
  await sleep(120);
}
const out = { meta: { atualizado_em: new Date().toISOString(), fonte: "Yahoo Finance (delay ~15min)" }, ibov, precos: PRECOS };
fs.writeFileSync(path.join(__dirname, "precos.js"), "window.PRECOS = " + JSON.stringify(out) + ";\n");
console.log(`\nOK: ${ok} cotacoes, ${fail} fallback, IBOV ${ibov.length} pts -> precos.js`);
