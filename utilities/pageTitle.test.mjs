import test from 'node:test';
import assert from 'node:assert';
import pageTitle from './pageTitle.js';

test('pageTitle should return empty string if no arguments are provided', () => {
  assert.strictEqual(pageTitle(), '');
});

test('pageTitle should use generalSettings title and description', () => {
  const generalSettings = {
    title: 'Site Title',
    description: 'Site Description'
  };
  assert.strictEqual(pageTitle(generalSettings), 'Site Title - Site Description');
});

test('pageTitle should prioritize titleOverride', () => {
  const generalSettings = {
    title: 'Site Title',
    description: 'Site Description'
  };
  assert.strictEqual(pageTitle(generalSettings, 'Custom Title'), 'Custom Title - Site Description');
});

test('pageTitle should prioritize descriptionOverride', () => {
  const generalSettings = {
    title: 'Site Title',
    description: 'Site Description'
  };
  assert.strictEqual(pageTitle(generalSettings, null, 'Custom Description'), 'Site Title - Custom Description');
});

test('pageTitle should prioritize both overrides', () => {
  const generalSettings = {
    title: 'Site Title',
    description: 'Site Description'
  };
  assert.strictEqual(pageTitle(generalSettings, 'Custom Title', 'Custom Description'), 'Custom Title - Custom Description');
});

test('pageTitle should return only title if description is missing', () => {
  const generalSettings = {
    title: 'Site Title',
  };
  assert.strictEqual(pageTitle(generalSettings), 'Site Title');
});

test('pageTitle should return only description if title is missing', () => {
  const generalSettings = {
    description: 'Site Description',
  };
  assert.strictEqual(pageTitle(generalSettings), 'Site Description');
});

test('pageTitle should handle null or undefined generalSettings', () => {
  assert.strictEqual(pageTitle(null), '');
  assert.strictEqual(pageTitle(undefined), '');
});

test('pageTitle should handle empty string overrides by falling back to generalSettings', () => {
  const generalSettings = {
    title: 'Site Title',
    description: 'Site Description'
  };
  // Since the code uses `titleOverride ? titleOverride : generalSettings?.title`,
  // an empty string override will fall back to generalSettings.
  assert.strictEqual(pageTitle(generalSettings, ''), 'Site Title - Site Description');
  assert.strictEqual(pageTitle(generalSettings, null, ''), 'Site Title - Site Description');
});

test('pageTitle should return empty string if both title and description are missing in generalSettings', () => {
  const generalSettings = {};
  assert.strictEqual(pageTitle(generalSettings), '');
});
