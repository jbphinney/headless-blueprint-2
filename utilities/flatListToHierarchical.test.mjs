import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import flatListToHierarchical from './flatListToHierarchical.js';

describe('flatListToHierarchical', () => {
  it('should return an empty array if data is empty or undefined', () => {
    assert.deepEqual(flatListToHierarchical(), []);
    assert.deepEqual(flatListToHierarchical([]), []);
  });

  it('should return the original list if no parent-child relationships exist', () => {
    const data = [{ id: 1, parentId: null }, { id: 2, parentId: 0 }, { id: 3 }];
    const expected = [
      { id: 1, parentId: null, children: [] },
      { id: 2, parentId: 0, children: [] },
      { id: 3, children: [] },
    ];
    assert.deepEqual(flatListToHierarchical(data), expected);
  });

  it('should correctly nest children under parents', () => {
    const data = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [
          { id: 2, parentId: 1, children: [] },
          { id: 3, parentId: 1, children: [] },
        ],
      },
    ];
    assert.deepEqual(flatListToHierarchical(data), expected);
  });

  it('should handle multi-level hierarchies (grandparents)', () => {
    const data = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 2 },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [{ id: 3, parentId: 2, children: [] }],
          },
        ],
      },
    ];
    assert.deepEqual(flatListToHierarchical(data), expected);
  });

  it('should handle custom keys', () => {
    const data = [
      { uid: 'a', pid: null },
      { uid: 'b', pid: 'a' },
    ];
    const options = { idKey: 'uid', parentKey: 'pid', childrenKey: 'subitems' };
    const expected = [
      {
        uid: 'a',
        pid: null,
        subitems: [{ uid: 'b', pid: 'a', subitems: [] }],
      },
    ];
    assert.deepEqual(flatListToHierarchical(data, options), expected);
  });

  it('should handle items out of order (child before parent)', () => {
    const data = [
      { id: 2, parentId: 1 },
      { id: 1, parentId: null },
    ];
    const expected = [
      {
        id: 1,
        parentId: null,
        children: [{ id: 2, parentId: 1, children: [] }],
      },
    ];
    // The implementation handles out-of-order processing correctly because references
    // to children arrays are established before items are pushed into them.
    assert.deepEqual(flatListToHierarchical(data), expected);
  });

  it('should exclude orphans (items whose parent is not in the list)', () => {
    const data = [
      { id: 1, parentId: null },
      { id: 2, parentId: 99 }, // 99 doesn't exist
    ];
    const expected = [{ id: 1, parentId: null, children: [] }];
    // Orphan items are added to childrenOf[parentId] but since the parent
    // is never processed (and thus never added to the tree), they are excluded.
    assert.deepEqual(flatListToHierarchical(data), expected);
  });
});
