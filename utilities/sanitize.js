import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * @param {string} content The HTML content to sanitize.
 * @return {string} The sanitized HTML content.
 */
export const sanitize = (content) => {
  return DOMPurify.sanitize(content);
};
