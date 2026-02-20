import { test } from 'node:test';
import assert from 'node:assert';
import { getFormattedDate } from './formatDateLogic.js';

test('getFormattedDate logic', async (t) => {
  await t.test('returns formatted date string for valid date string', () => {
    const date = '2023-01-01T12:00:00Z';
    const result = getFormattedDate(date);
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.includes('2023'));
    assert.ok(result.includes('January'));
    assert.ok(result.includes('1'));
  });

  await t.test('returns formatted date string for valid Date object', () => {
    const date = new Date('2023-05-15T12:00:00Z');
    const result = getFormattedDate(date);
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.includes('May'));
    assert.ok(result.includes('15'));
    assert.ok(result.includes('2023'));
  });

  await t.test('returns null for invalid date string', () => {
    const date = 'invalid-date-string';
    const result = getFormattedDate(date);
    assert.strictEqual(result, null);
  });

  await t.test('returns null for undefined', () => {
    const result = getFormattedDate(undefined);
    assert.strictEqual(result, null);
  });

  await t.test('returns epoch date for null input (current behavior)', () => {
    const result = getFormattedDate(null);
    assert.strictEqual(typeof result, 'string');
    // Depending on timezone, it might be Dec 31 1969 or Jan 1 1970
    assert.ok(result.includes('1970') || result.includes('1969'));
  });
});
