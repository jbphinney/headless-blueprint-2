import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks.
 * @param {string} content The HTML content to sanitize.
 * @returns {string} The sanitized HTML content.
 */
export const sanitize = (content) => {
  return DOMPurify.sanitize(content);
};
