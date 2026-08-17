import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 1. Ensure output: 'standalone' in all next.config.ts files
const nextConfigs = [
  'apps/storefront/next.config.ts',
  'apps/admin/next.config.ts',
  'apps/shop/next.config.ts',
];

for (const rel of nextConfigs) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    let content = fs.readFileSync(full, 'utf8');
    if (!content.includes("output: 'standalone'")) {
      content = content.replace(
        /const nextConfig: NextConfig = \{/,
        "const nextConfig: NextConfig = {\n  output: 'standalone',"
      );
      fs.writeFileSync(full, content, 'utf8');
      console.log(`Added output: 'standalone' to ${rel}`);
    }
  }
}

// 2. Ensure all pages and components importing Phosphor icons have 'use client'
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
  } catch (err) {
    console.error(err);
  }
  return results;
}

const allTsx = [
  ...findTsxFiles(path.join(ROOT, 'apps/storefront/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/admin/src')),
  ...findTsxFiles(path.join(ROOT, 'apps/shop/src')),
];

let clientCount = 0;
for (const file of allTsx) {
  const rel = path.relative(ROOT, file);
  if (rel.endsWith('layout.tsx')) continue; // Keep root layout as server component for metadata
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('@phosphor-icons/react') && !content.startsWith("'use client'") && !content.startsWith('"use client"')) {
    content = `'use client';\n\n` + content;
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Added 'use client' to: ${rel}`);
    clientCount++;
  }
}

console.log(`Added 'use client' to ${clientCount} files.`);
