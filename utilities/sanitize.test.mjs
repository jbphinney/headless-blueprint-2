import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sanitize } from './sanitize.js';

describe('sanitize', () => {
  it('should pass through safe HTML', () => {
    const input = '<p>This is safe content.</p>';
    const output = sanitize(input);
    assert.strictEqual(output, input);
  });

  it('should strip script tags', () => {
    const input = '<p>This is <script>alert("xss")</script> safe.</p>';
    const expected = '<p>This is  safe.</p>';
    const output = sanitize(input);
    assert.strictEqual(output, expected);
  });

  it('should strip event handlers', () => {
    const input = '<img src="x" onerror="alert(1)">';
    const expected = '<img src="x">';
    const output = sanitize(input);
    assert.strictEqual(output, expected);
  });

  it('should strip javascript: hrefs', () => {
    const input = '<a href="javascript:alert(1)">Click me</a>';
    const expected = '<a>Click me</a>';
    const output = sanitize(input);
    assert.strictEqual(output, expected);
  });
});
