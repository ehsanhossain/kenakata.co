import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

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

  // Replace placeholder="MagnifyingGlass ... with placeholder="Search ...
  content = content.replace(/placeholder="MagnifyingGlass\s+/g, 'placeholder="Search ');
  content = content.replace(/placeholder='MagnifyingGlass\s+/g, "placeholder='Search ");
  content = content.replace(/placeholder:\s*["']MagnifyingGlass\s+/g, 'placeholder: "Search ');
  content = content.replace(/"MagnifyingGlass results for/g, '"Search results for');
  content = content.replace(/'MagnifyingGlass results for/g, "'Search results for");
  content = content.replace(/Trending MagnifyingGlasses/g, 'Trending Searches');
  content = content.replace(/trendingMagnifyingGlasses/g, 'trendingSearches');
  content = content.replace(/searchQuery/g, 'searchQuery');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned placeholders in: ${path.relative(ROOT, filePath)}`);
  }
}
