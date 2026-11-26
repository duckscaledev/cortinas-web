import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const spanish = JSON.parse(await readFile(new URL("../messages/es.json", import.meta.url), "utf8"));
const catalan = JSON.parse(await readFile(new URL("../messages/ca.json", import.meta.url), "utf8"));
const english = JSON.parse(await readFile(new URL("../messages/en.json", import.meta.url), "utf8"));

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

const reference = Object.fromEntries(flattenMessages(spanish));

for (const [language, messages] of [["Catalan", catalan], ["English", english]]) {
  test(`${language} matches the Spanish catalog keys and interpolation parameters`, () => {
    const catalog = Object.fromEntries(flattenMessages(messages));
    assert.deepEqual(Object.keys(catalog).sort(), Object.keys(reference).sort());

    for (const key of Object.keys(reference)) {
      assert.ok(reference[key].trim(), `${key} is empty in Spanish`);
      assert.ok(catalog[key].trim(), `${key} is empty in ${language}`);
      assert.deepEqual(placeholders(catalog[key]), placeholders(reference[key]), key);
    }
  });
}
