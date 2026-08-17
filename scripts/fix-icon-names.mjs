// Fix broken Phosphor icon names
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FIXES = [
  ['TrendingUp', 'TrendUp'],
  ['LayoutGrid', 'GridFour'],
  ['FileCheck', 'FileText'],
];

function findTsxFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findTsxFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
}

const files = [
  ...findTsxFiles(path.join(ROOT, 'apps/storefront/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/admin/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/shop/src')),
];

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [wrong, right] of FIXES) {
    // Replace in import statements and usage
    const regex = new RegExp(`\\b${wrong}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(new RegExp(`\\b${wrong}\\b`, 'g'), right);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED: ${path.relative(ROOT, filePath)}`);
  }
}
console.log('Done!');
