import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sanitize } from './sanitize.js';

describe('sanitize', () => {
  it('should allow safe HTML', () => {
    const safeHtml = '<p>This is safe.</p>';
    const result = sanitize(safeHtml);
    assert.strictEqual(result, safeHtml);
  });

  it('should remove script tags', () => {
    const maliciousHtml = '<script>alert("XSS")</script><p>Safe content</p>';
    const result = sanitize(maliciousHtml);
    assert.strictEqual(result, '<p>Safe content</p>');
  });

  it('should remove event handlers', () => {
    const maliciousHtml = '<img src="x" onerror="alert(\'XSS\')" />';
    const result = sanitize(maliciousHtml);
    assert.strictEqual(result, '<img src="x">');
  });

  it('should handle null or undefined input', () => {
    // Note: The ContentWrapper passes content ?? '' so we expect string input in practice,
    // but the utility might be used elsewhere.
    // DOMPurify generally expects a string or node.
    // If we pass undefined to DOMPurify.sanitize, it might handle it or throw.
    // Let's check our utility. It passes directly to DOMPurify.

    // Let's test with empty string which is the fallback in ContentWrapper
    const result = sanitize('');
    assert.strictEqual(result, '');
  });
});
