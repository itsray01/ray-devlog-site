/**
 * Image utility functions
 */

/**
 * Standard image error handler - adds red border on failed loads
 * Optimized to prevent recreation
 * @param {Event} e - Error event
 */
export const handleImageError = (e) => {
  e.target.style.border = '2px solid red';
  e.target.style.backgroundColor = '#ff000020';
};
