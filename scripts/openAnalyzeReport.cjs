/* eslint-disable no-console */
const { exec } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const reportPath = path.resolve(process.cwd(), 'dist-analyze', 'bundle-report.html');

if (!existsSync(reportPath)) {
  console.warn(`[analyze] Report not found at: ${reportPath}`);
  process.exit(0);
}

const quoted = `"${reportPath}"`;
let cmd;

if (process.platform === 'win32') {
  // `start` is a cmd builtin; wrap in `cmd /c`.
  cmd = `cmd /c start "" ${quoted}`;
} else if (process.platform === 'darwin') {
  cmd = `open ${quoted}`;
} else {
  cmd = `xdg-open ${quoted}`;
}

exec(cmd, (err) => {
  if (err) {
    console.warn('[analyze] Failed to open report automatically.');
    console.warn(`[analyze] You can open it manually: ${reportPath}`);
  }
});


