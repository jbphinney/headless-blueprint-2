import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from './SearchResults';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

jest.mock('components', () => ({
  FormatDate: () => <span>Date</span>,
  LoadingSearchResult: () => <div>Loading...</div>,
}));

describe('SearchResults Vulnerability Check', () => {
  it('sanitizes the malicious payload', () => {
    const maliciousExcerpt = '<img src=x onerror=alert(1)>Malicious Content';
    const searchResults = [
      {
        databaseId: 1,
        uri: '/test-post',
        title: 'Test Post',
        date: '2023-10-26T10:00:00',
        excerpt: maliciousExcerpt,
      },
    ];

    const { container } = render(<SearchResults searchResults={searchResults} isLoading={false} />);

    // The onerror attribute MUST be removed
    expect(container.innerHTML).not.toContain('onerror="alert(1)"');

    // The safe content should remain
    expect(container.innerHTML).toContain('Malicious Content');

    // The img tag should remain but without the onerror handler
    // Note: DOMPurify might reorder attributes or change quotes, so robust check is needed.
    // But checking for absence of 'onerror' is the key security check.
  });
});
