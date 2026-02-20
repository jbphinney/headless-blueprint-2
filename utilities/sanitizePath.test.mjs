import { test } from 'node:test';
import assert from 'node:assert';
import sanitizePath from './sanitizePath.js';

test('sanitizePath', async (t) => {
  await t.test('allows safe relative paths', () => {
    assert.strictEqual(sanitizePath('/foo'), '/foo');
    assert.strictEqual(sanitizePath('/foo/bar?baz=qux'), '/foo/bar?baz=qux');
    assert.strictEqual(sanitizePath('#anchor'), '#anchor');
  });

  await t.test('allows safe absolute URLs', () => {
    assert.strictEqual(sanitizePath('http://example.com'), 'http://example.com');
    assert.strictEqual(sanitizePath('https://example.com/foo'), 'https://example.com/foo');
    assert.strictEqual(sanitizePath('mailto:user@example.com'), 'mailto:user@example.com');
    assert.strictEqual(sanitizePath('tel:+1234567890'), 'tel:+1234567890');
  });

  await t.test('blocks javascript: protocol', () => {
    assert.strictEqual(sanitizePath('javascript:alert(1)'), '/');
    assert.strictEqual(sanitizePath('JAVASCRIPT:alert(1)'), '/');
    assert.strictEqual(sanitizePath('  javascript:alert(1)'), '/');
    // My implementation removes all whitespace, so 'javascript :alert(1)' becomes 'javascript:alert(1)' and is blocked.
    assert.strictEqual(sanitizePath('javascript :alert(1)'), '/');
  });

  await t.test('blocks data: protocol', () => {
    assert.strictEqual(sanitizePath('data:text/html,Hello'), '/');
    assert.strictEqual(sanitizePath('DATA:text/html,Hello'), '/');
  });

  await t.test('blocks vbscript: protocol', () => {
    assert.strictEqual(sanitizePath('vbscript:msgbox(1)'), '/');
  });

  await t.test('handles encoded javascript:', () => {
    // decodeURIComponent('j%61vascript:alert(1)') -> 'javascript:alert(1)'
    assert.strictEqual(sanitizePath('j%61vascript:alert(1)'), '/');
    // decodeURIComponent('javascript%3Aalert(1)') -> 'javascript:alert(1)'
    assert.strictEqual(sanitizePath('javascript%3Aalert(1)'), '/');
  });
});
