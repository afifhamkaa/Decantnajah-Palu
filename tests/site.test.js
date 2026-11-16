
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

test("File utama website tersedia", () => {
  assert.ok(fs.existsSync("index.html"));
});

test("File CSS dan JavaScript tersedia", () => {
  const files = [
    "css/main.css",
    "css/navbar.css",
    "js/navbar.js",
    "js/product.js"
  ];

  for (const file of files) {
    assert.ok(fs.existsSync(file), `${file} tidak ditemukan`);
  }
});

test("Data produk merupakan JSON yang valid", () => {
  const data = fs.readFileSync("assets/product.json", "utf8");

  assert.doesNotThrow(() => JSON.parse(data));
});

test("File JavaScript tidak memiliki syntax error", () => {
  const files = ["js/navbar.js", "js/product.js"];

  for (const file of files) {
    const result = spawnSync(
      process.execPath,
      ["--check", file],
      { encoding: "utf8" }
    );

    assert.equal(
      result.status,
      0,
      `${file}: ${result.stderr}`
    );
  }
});