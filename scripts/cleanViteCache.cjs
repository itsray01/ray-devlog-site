/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function rm(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  fs.rmSync(targetPath, { recursive: true, force: true });
  console.log(`[clean] removed ${targetPath}`);
}

const root = process.cwd();
rm(path.join(root, 'node_modules', '.vite'));
rm(path.join(root, 'dist-analyze'));

console.log('[clean] done');


