import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LoadMore from './LoadMore.js';

describe('LoadMore', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders nothing when hasNextPage is false', () => {
    const { container } = render(
      <LoadMore hasNextPage={false} endCursor="cursor" isLoading={false} fetchMore={() => {}} />
    );
    assert.strictEqual(container.firstChild, null);
  });

  it('renders nothing when endCursor is missing', () => {
    const { container } = render(
      <LoadMore hasNextPage={true} endCursor={null} isLoading={false} fetchMore={() => {}} />
    );
    assert.strictEqual(container.firstChild, null);
  });

  it('renders button when hasNextPage and endCursor are present', () => {
    render(
      <LoadMore hasNextPage={true} endCursor="cursor" isLoading={false} fetchMore={() => {}} />
    );
    const button = screen.getByText('Load More');
    assert.ok(button);
    assert.strictEqual(button.disabled, false);
  });

  it('applies custom className', () => {
    const { container } = render(
      <LoadMore
        hasNextPage={true}
        endCursor="cursor"
        isLoading={false}
        fetchMore={() => {}}
        className="custom-class"
      />
    );
    // The container wraps the output. The component renders <section className="...">
    // So container.firstChild should be the section.
    const section = container.firstChild;
    assert.ok(section.classList.contains('custom-class'));
  });

  it('is disabled when isLoading is true', () => {
    render(
      <LoadMore hasNextPage={true} endCursor="cursor" isLoading={true} fetchMore={() => {}} />
    );
    const button = screen.getByText('Load More');
    assert.strictEqual(button.disabled, true);
  });

  it('calls fetchMore with correct variables when clicked', () => {
    const fetchMore = mock.fn();
    render(
      <LoadMore hasNextPage={true} endCursor="cursor123" isLoading={false} fetchMore={fetchMore} />
    );
    const button = screen.getByText('Load More');
    fireEvent.click(button);

    assert.strictEqual(fetchMore.mock.calls.length, 1);
    const callArgs = fetchMore.mock.calls[0].arguments[0];
    assert.deepStrictEqual(callArgs, {
      variables: {
        after: 'cursor123',
      },
    });
  });
});
