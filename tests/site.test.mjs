import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

test("portfolio includes core semantic landmarks", () => {
  for (const element of ["<header", "<nav", "<main", "<h1", "<footer"]) {
    assert.match(html, new RegExp(element));
  }
  assert.match(html, /class="skip-link"/);
});

test("every local asset referenced by HTML exists", () => {
  const paths = [...html.matchAll(/(?:src|href)="(assets\/[^\"]+)"/g)].map((match) => match[1]);
  assert.ok(paths.length > 8);
  for (const path of paths) {
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `Missing ${path}`);
  }
});

test("images include dimensions and alternative text", () => {
  const images = [...html.matchAll(/<img\s[^>]+>/g)].map((match) => match[0]);
  assert.ok(images.length > 5);
  for (const image of images) {
    assert.match(image, /alt="[^"]*"/);
    assert.match(image, /width="\d+"/);
    assert.match(image, /height="\d+"/);
  }
});

test("styles preserve focus and reduced-motion behavior", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /transition:\s*all/);
});
