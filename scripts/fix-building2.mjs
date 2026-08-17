import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const EXTRA_MAP = {
  'Building2': 'Buildings',
};

function findTsxFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findTsxFiles(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
  return results;
}

const allFiles = [
  ...findTsxFiles(path.join(ROOT, 'apps/storefront/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/admin/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/shop/src')),
];

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [oldName, newName] of Object.entries(EXTRA_MAP)) {
    const regex = new RegExp(`\\b${oldName}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newName);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(ROOT, filePath)}`);
  }
}
