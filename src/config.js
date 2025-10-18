/**
 * Application configuration
 * Reads from environment variables with fallback defaults
 */

// API base URL - defaults to localhost in development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// For production, you can either:
// 1. Set VITE_API_URL in your Cloudflare Pages environment variables
// 2. Or remove the backend dependency and serve data statically
export const USE_STATIC_DATA = import.meta.env.VITE_USE_STATIC_DATA === 'true';

export default {
  API_URL,
  USE_STATIC_DATA
};

