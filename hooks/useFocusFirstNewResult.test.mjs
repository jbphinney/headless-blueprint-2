
import 'global-jsdom/register';
import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import { renderHook, waitFor } from '@testing-library/react';

import appConfig from '../app.config.js';

import useFocusFirstNewResult from './useFocusFirstNewResult.js';

describe('useFocusFirstNewResult', () => {
  it('should return refs and default index 0', () => {
    const { result } = renderHook(() => useFocusFirstNewResult([]));
    assert.ok(result.current.firstNewResultRef);
    assert.strictEqual(result.current.firstNewResultIndex, 0);
  });

  it('should not focus if posts length is <= postsPerPage', () => {
    const posts = new Array(appConfig.postsPerPage).fill({});

    const { result, rerender } = renderHook(({ posts }) => useFocusFirstNewResult(posts), {
      initialProps: { posts: [] }
    });

    const focusMock = mock.fn();
    // Set the ref value
    // Since useRef returns a mutable ref object, we can modify .current
    // Ideally we should do this before the effect runs, but we can't easily intercept renderHook's first render.
    // So we render with empty array first (isPaginated=false), set mock, then update.
    result.current.firstNewResultRef.current = { focus: focusMock };

    // Update to max posts per page
    rerender({ posts });

    assert.strictEqual(focusMock.mock.calls.length, 0);
    assert.strictEqual(result.current.firstNewResultIndex, 0);
  });

  it('should focus and set index if posts length > postsPerPage', async () => {
    const initialPosts = new Array(appConfig.postsPerPage).fill({});
    const { result, rerender } = renderHook(({ posts }) => useFocusFirstNewResult(posts), {
      initialProps: { posts: initialPosts },
    });

    const focusMock = mock.fn();
    result.current.firstNewResultRef.current = { focus: focusMock };

    // Add one more post
    const newPosts = new Array(appConfig.postsPerPage + 1).fill({});
    rerender({ posts: newPosts });

    await waitFor(() => {
       assert.strictEqual(focusMock.mock.calls.length, 1);
    });

    // Calculation:
    // length = 9 + 1 = 10
    // partialSetLength = 10 % 9 = 1
    // delta = 1
    // focusIndex = 10 - 1 = 9
    assert.strictEqual(result.current.firstNewResultIndex, 9);
  });

  it('should calculate correct index for subsequent pages', async () => {
    // Scenario: Loading page 3 (posts 19-27, total 27)?
    // Or just loading more posts.

    // Let's say we have 18 posts (2 pages exactly).
    // length = 18.
    // partial = 18 % 9 = 0.
    // delta = 9.
    // focusIndex = 18 - 9 = 9.

    const initialPosts = new Array(appConfig.postsPerPage).fill({});
    const { result, rerender } = renderHook(({ posts }) => useFocusFirstNewResult(posts), {
      initialProps: { posts: initialPosts },
    });

    const focusMock = mock.fn();
    result.current.firstNewResultRef.current = { focus: focusMock };

    const newPosts = new Array(appConfig.postsPerPage * 2).fill({});
    rerender({ posts: newPosts });

    await waitFor(() => {
       assert.strictEqual(focusMock.mock.calls.length, 1);
    });

    const expectedIndex = appConfig.postsPerPage; // 9
    assert.strictEqual(result.current.firstNewResultIndex, expectedIndex);
  });
});
