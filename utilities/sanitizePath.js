/**
 * Sanitizes a path or URL to ensure it is safe for use in a link.
 *
 * @param {string} path The path or URL to sanitize.
 * @returns {string} The sanitized path or URL.
 */
export default function sanitizePath(path) {
  if (!path) {
    return '/';
  }

  try {
    const decodedPath = decodeURIComponent(path);
    // Remove all whitespace
    const cleanPath = decodedPath.replace(/\s+/g, '').toLowerCase();

    // Check for potentially unsafe protocols
    if (
      cleanPath.startsWith('javascript:') ||
      cleanPath.startsWith('data:') ||
      cleanPath.startsWith('vbscript:')
    ) {
      return '/';
    }
  } catch (e) {
    // If decodeURIComponent fails, path is likely malformed.
    return '/';
  }

  return path;
}
