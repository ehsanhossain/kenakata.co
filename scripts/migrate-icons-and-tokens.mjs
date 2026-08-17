// Batch migration script: lucide-react -> @phosphor-icons/react + slate -> semantic tokens
// Run with: node scripts/migrate-icons-and-tokens.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Lucide -> Phosphor icon mapping
const ICON_MAP = {
  'ChevronRight': 'CaretRight',
  'ChevronLeft': 'CaretLeft',
  'ChevronDown': 'CaretDown',
  'ChevronUp': 'CaretUp',
  'ArrowRight': 'ArrowRight',
  'ArrowLeft': 'ArrowLeft',
  'Search': 'MagnifyingGlass',
  'Menu': 'List',
  'X': 'X',
  'Heart': 'Heart',
  'Star': 'Star',
  'ShoppingCart': 'ShoppingCart',
  'ShoppingBag': 'ShoppingBag',
  'User': 'User',
  'Users': 'Users',
  'Settings': 'GearSix',
  'Bell': 'Bell',
  'LogOut': 'SignOut',
  'Plus': 'Plus',
  'Minus': 'Minus',
  'Trash2': 'Trash',
  'Trash': 'Trash',
  'Edit': 'PencilSimple',
  'Pencil': 'PencilSimple',
  'Copy': 'Copy',
  'Check': 'Check',
  'CheckCircle': 'CheckCircle',
  'CheckCircle2': 'CheckCircle',
  'CheckSquare': 'CheckSquare',
  'AlertCircle': 'WarningCircle',
  'AlertTriangle': 'Warning',
  'Info': 'Info',
  'XCircle': 'XCircle',
  'Eye': 'Eye',
  'EyeOff': 'EyeSlash',
  'Lock': 'Lock',
  'Unlock': 'LockOpen',
  'Mail': 'EnvelopeSimple',
  'Phone': 'Phone',
  'MapPin': 'MapPin',
  'Globe': 'Globe',
  'ExternalLink': 'ArrowSquareOut',
  'Link': 'Link',
  'Download': 'DownloadSimple',
  'Upload': 'UploadSimple',
  'Image': 'Image',
  'Camera': 'Camera',
  'Calendar': 'Calendar',
  'Clock': 'Clock',
  'Timer': 'Timer',
  'Flame': 'Fire',
  'Zap': 'Lightning',
  'Sparkles': 'Sparkle',
  'TrendingUp': 'TrendingUp',
  'BarChart3': 'ChartBar',
  'BarChart': 'ChartBar',
  'Package': 'Package',
  'Truck': 'Truck',
  'CreditCard': 'CreditCard',
  'DollarSign': 'CurrencyDollar',
  'Shield': 'Shield',
  'ShieldCheck': 'ShieldCheck',
  'Headphones': 'Headset',
  'Filter': 'Funnel',
  'SlidersHorizontal': 'Sliders',
  'MoreVertical': 'DotsThreeVertical',
  'MoreHorizontal': 'DotsThree',
  'RefreshCw': 'ArrowsClockwise',
  'RotateCcw': 'ArrowCounterClockwise',
  'Store': 'Storefront',
  'Warehouse': 'Warehouse',
  'LayoutDashboard': 'SquaresFour',
  'FileCheck2': 'FileCheck',
  'FileText': 'FileText',
  'FileCheck': 'FileCheck',
  'Clipboard': 'Clipboard',
  'ClipboardList': 'ClipboardText',
  'Home': 'House',
  'Tag': 'Tag',
  'Percent': 'Percent',
  'Box': 'Cube',
  'Layers': 'Stack',
  'Grid': 'GridFour',
  'List': 'List',
  'Table': 'Table',
  'Save': 'FloppyDisk',
  'Share': 'ShareNetwork',
  'Send': 'PaperPlaneTilt',
  'MessageCircle': 'ChatCircle',
  'HelpCircle': 'Question',
  'Printer': 'Printer',
  'Ban': 'Prohibit',
  'ThumbsUp': 'ThumbsUp',
  'ThumbsDown': 'ThumbsDown',
  'Hash': 'Hash',
  'Loader2': 'CircleNotch',
  'CircleDollarSign': 'CurrencyCircleDollar',
};

// CSS class replacements: slate/emerald/brand-blue -> semantic tokens
const CLASS_REPLACEMENTS = [
  // Dark background patterns
  [/bg-slate-950\/80/g, 'bg-canvas'],
  [/bg-slate-950\/60/g, 'bg-surface-subtle'],
  [/bg-slate-950/g, 'bg-canvas'],
  [/bg-slate-900\/90/g, 'bg-surface-subtle'],
  [/bg-slate-900\/80/g, 'bg-surface-subtle'],
  [/bg-slate-900\/60/g, 'bg-surface-subtle'],
  [/bg-slate-900\/40/g, 'bg-surface-subtle'],
  [/bg-slate-900/g, 'bg-surface-subtle'],
  [/bg-slate-800\/60/g, 'bg-surface-muted'],
  [/bg-slate-800/g, 'bg-surface-muted'],
  [/bg-slate-700/g, 'bg-surface-muted'],
  [/bg-slate-100/g, 'bg-surface-subtle'],
  [/bg-slate-50/g, 'bg-surface-subtle'],
  // Text patterns
  [/text-slate-950/g, 'text-content-primary'],
  [/text-slate-800/g, 'text-content-primary'],
  [/text-slate-700/g, 'text-content-secondary'],
  [/text-slate-500/g, 'text-content-tertiary'],
  [/text-slate-400/g, 'text-content-tertiary'],
  [/text-slate-300/g, 'text-content-secondary'],
  [/text-slate-200/g, 'text-content-secondary'],
  [/text-slate-100/g, 'text-content-primary'],
  [/text-white/g, 'text-content-primary'],
  // Border patterns
  [/border-slate-800\/80/g, 'border-border'],
  [/border-slate-800\/60/g, 'border-border'],
  [/border-slate-800/g, 'border-border'],
  [/border-slate-100/g, 'border-border'],
  [/border-slate-200/g, 'border-border'],
  // Emerald to brand orange
  [/bg-brand-emerald/g, 'bg-action-primary'],
  [/bg-emerald-500\/20/g, 'bg-success-surface'],
  [/bg-emerald-500\/10/g, 'bg-success-surface'],
  [/bg-emerald-500/g, 'bg-success'],
  [/bg-emerald-400/g, 'bg-success'],
  [/text-brand-emerald/g, 'text-content-brand'],
  [/text-emerald-400/g, 'text-success'],
  [/text-emerald-300/g, 'text-success'],
  [/border-emerald-500\/30/g, 'border-success/20'],
  [/border-emerald-400/g, 'border-success'],
  // Brand blue -> brand orange
  [/text-brand-blue-hover/g, 'text-content-brand'],
  [/text-brand-blue/g, 'text-content-brand'],
  [/bg-brand-blue-soft/g, 'bg-surface-brand-subtle'],
  [/bg-brand-blue/g, 'bg-action-primary'],
  [/border-brand-blue\/20/g, 'border-border-brand/20'],
  [/border-brand-blue/g, 'border-border-brand'],
  [/focus:border-brand-blue/g, 'focus:border-border-brand'],
  [/focus:ring-brand-emerald/g, 'focus:ring-action-primary/20'],
  [/ring-brand-emerald/g, 'ring-action-primary/20'],
  // Brand charcoal
  [/text-brand-charcoal/g, 'text-content-primary'],
  [/bg-brand-charcoal/g, 'bg-surface-inverse'],
  // Semantic danger / warning / success unchanged - just fix prefixes
  [/text-semantic-danger/g, 'text-danger'],
  [/bg-semantic-danger/g, 'bg-danger'],
  [/text-semantic-warning/g, 'text-warning'],
  [/text-semantic-success/g, 'text-success'],
  // Rose to danger
  [/text-rose-600/g, 'text-danger'],
  [/text-rose-400/g, 'text-danger'],
  [/bg-rose-50/g, 'bg-danger-surface'],
  [/bg-rose-500\/20/g, 'bg-danger-surface'],
  [/bg-rose-500/g, 'bg-danger'],
  [/bg-rose-950\/40/g, 'bg-danger-surface'],
  [/hover:bg-rose-950\/40/g, 'hover:bg-danger-surface'],
  [/hover:bg-rose-50/g, 'hover:bg-danger-surface'],
  [/hover:text-rose-400/g, 'hover:text-danger'],
  [/border-rose-500\/30/g, 'border-danger/20'],
  [/border-rose-400/g, 'border-danger'],
  // Amber to warning
  [/text-amber-400/g, 'text-warning'],
  [/text-amber-500/g, 'text-warning'],
  [/bg-amber-500\/20/g, 'bg-warning-surface'],
  [/bg-amber-500/g, 'bg-warning'],
  [/bg-amber-400/g, 'bg-warning'],
  [/bg-amber-950\/80/g, 'bg-warning-surface'],
  [/border-amber-500\/30/g, 'border-warning/20'],
  [/border-amber-400/g, 'border-warning'],
  // Blue to info
  [/text-blue-400/g, 'text-info'],
  [/bg-blue-500\/20/g, 'bg-info-surface'],
  [/bg-blue-500\/10/g, 'bg-info-surface'],
  // Purple to info
  [/text-purple-400/g, 'text-info'],
  [/bg-purple-500\/10/g, 'bg-info-surface'],
  // Gradient overrides
  [/from-brand-emerald to-emerald-400/g, 'from-action-primary to-action-primary-hover'],
  [/from-amber-950\/80 via-slate-900 to-slate-950/g, 'from-warning-surface/80 via-canvas to-canvas'],
  // Shadow
  [/shadow-emerald-500\/20/g, 'shadow-action-primary/10'],
  [/shadow-amber-500\/20/g, 'shadow-warning/10'],
  // Neutral -> content
  [/text-neutral-700/g, 'text-content-secondary'],
  [/text-neutral-600/g, 'text-content-secondary'],
  [/text-neutral-500/g, 'text-content-tertiary'],
  [/text-neutral-400/g, 'text-content-disabled'],
  [/text-neutral-300/g, 'text-content-tertiary'],
  [/text-neutral-200/g, 'text-content-secondary'],
  [/bg-neutral-800/g, 'bg-surface-inverse'],
  [/bg-neutral-100/g, 'bg-surface-subtle'],
  [/bg-neutral-50/g, 'bg-surface-subtle'],
  [/border-neutral-200/g, 'border-border'],
  [/border-neutral-100/g, 'border-border'],
  // Dark mode prefixes - just remove them
  [/dark:bg-slate-\d+\/?\.?\d*/g, ''],
  [/dark:text-slate-\d+\/?\.?\d*/g, ''],
  [/dark:border-slate-\d+\/?\.?\d*/g, ''],
  [/dark:text-white/g, ''],
  [/dark:hover:bg-slate-\d+\/?\.?\d*/g, ''],
  [/dark:hover:bg-rose-950\/40/g, ''],
  // font-serif -> remove (we use Montserrat everywhere)
  [/font-serif /g, ''],
];

// Files to skip (already rewritten)
const SKIP_FILES = new Set([
  'apps/storefront/src/components/Header.tsx',
  'apps/storefront/src/components/Footer.tsx',
  'apps/storefront/src/components/ProductCard.tsx',
  'apps/storefront/src/app/(storefront)/page.tsx',
  'apps/admin/src/components/AdminShell.tsx',
  'apps/admin/src/app/page.tsx',
  'apps/shop/src/components/MerchantShell.tsx',
  'apps/shop/src/app/page.tsx',
]);

function findTsxFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findTsxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function migrateFile(filePath) {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (SKIP_FILES.has(relPath)) {
    console.log(`  SKIP ${relPath} (already rewritten)`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // 1. Replace lucide-react import with @phosphor-icons/react
  const lucideImportMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/);
  if (lucideImportMatch) {
    const importedIcons = lucideImportMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    const phosphorIcons = importedIcons.map(icon => {
      // Handle aliased imports like "LayoutDashboard as LD"
      const parts = icon.split(/\s+as\s+/);
      const originalName = parts[0].trim();
      const alias = parts.length > 1 ? parts[1].trim() : null;
      const mapped = ICON_MAP[originalName] || originalName;
      return alias ? `${mapped} as ${alias}` : mapped;
    });
    // Remove duplicates
    const unique = [...new Set(phosphorIcons)];
    const newImport = `import {\n  ${unique.join(', ')}\n} from '@phosphor-icons/react';`;
    content = content.replace(lucideImportMatch[0], newImport);
    changed = true;
  }
  
  // 2. Apply class replacements
  for (const [pattern, replacement] of CLASS_REPLACEMENTS) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      // Reset lastIndex for global regexes
      pattern.lastIndex = 0;
      changed = true;
    }
  }
  
  // 3. Clean up empty class segments from dark: removal
  content = content.replace(/ {2,}/g, ' ');
  content = content.replace(/className="([^"]*)\s+"/g, 'className="$1"');
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  DONE ${relPath}`);
  } else {
    console.log(`  NOOP ${relPath} (no changes needed)`);
  }
}

// Main
console.log('Migrating storefront files...');
findTsxFiles(path.join(ROOT, 'apps/storefront/src')).forEach(migrateFile);

console.log('\nMigrating admin files...');
findTsxFiles(path.join(ROOT, 'apps/admin/src')).forEach(migrateFile);

console.log('\nMigrating shop files...');
findTsxFiles(path.join(ROOT, 'apps/shop/src')).forEach(migrateFile);

console.log('\nMigration complete!');
