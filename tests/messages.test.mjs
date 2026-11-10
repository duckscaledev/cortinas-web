import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const spanish = JSON.parse(await readFile(new URL("../messages/es.json", import.meta.url), "utf8"));
const catalan = JSON.parse(await readFile(new URL("../messages/ca.json", import.meta.url), "utf8"));

const flattenMessages = (messages, prefix = "") => {
  return Object.entries(messages).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string"
      ? [[path, value]]
      : flattenMessages(value, path);
  });
};

const placeholders = (message) => {
  return [...message.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
};

test("Spanish and Catalan catalogs have the same keys and interpolation parameters", () => {
  const es = Object.fromEntries(flattenMessages(spanish));
  const ca = Object.fromEntries(flattenMessages(catalan));

  assert.deepEqual(Object.keys(ca).sort(), Object.keys(es).sort());
  for (const key of Object.keys(es)) {
    assert.ok(es[key].trim(), `${key} is empty in Spanish`);
    assert.ok(ca[key].trim(), `${key} is empty in Catalan`);
    assert.deepEqual(placeholders(ca[key]), placeholders(es[key]), key);
  }
});
