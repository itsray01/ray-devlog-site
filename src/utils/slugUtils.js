/**
 * Slugifies a string for use in URLs and filenames
 * Converts to lowercase, replaces spaces with hyphens, removes special chars
 * 
 * @param {string} str - String to slugify
 * @returns {string} - Slugified string
 * 
 * @example
 * slugify("Black Mirror: Bandersnatch") // "black-mirror-bandersnatch"
 * slugify("The Stanley Parable") // "the-stanley-parable"
 */
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
};

/**
 * Extracts filename (without extension) from an image path
 * Used to match video loop filenames with their source images
 * 
 * @param {string} imagePath - Image path like "/img/black-mirror.jpg"
 * @returns {string} - Filename without extension: "black-mirror"
 */
export const getFilenameFromPath = (imagePath) => {
  return imagePath.split('/').pop().split('.')[0];
};

