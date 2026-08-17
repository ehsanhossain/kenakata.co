import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Complete Lucide -> Phosphor icon mapping
const ICON_MAP = {
  'ChevronRight': 'CaretRight',
  'ChevronLeft': 'CaretLeft',
  'ChevronDown': 'CaretDown',
  'ChevronUp': 'CaretUp',
  'Search': 'MagnifyingGlass',
  'Menu': 'List',
  'Settings': 'GearSix',
  'LogOut': 'SignOut',
  'Trash2': 'Trash',
  'Trash': 'Trash',
  'Edit': 'PencilSimple',
  'Pencil': 'PencilSimple',
  'CheckCircle2': 'CheckCircle',
  'CheckCircle': 'CheckCircle',
  'CheckSquare': 'CheckSquare',
  'AlertCircle': 'WarningCircle',
  'AlertTriangle': 'Warning',
  'Info': 'Info',
  'XCircle': 'XCircle',
  'EyeOff': 'EyeSlash',
  'Eye': 'Eye',
  'Lock': 'Lock',
  'Unlock': 'LockOpen',
  'Mail': 'EnvelopeSimple',
  'Phone': 'Phone',
  'MapPin': 'MapPin',
  'Globe': 'Globe',
  'ExternalLink': 'ArrowSquareOut',
  'Download': 'DownloadSimple',
  'Upload': 'UploadSimple',
  'Flame': 'Fire',
  'Zap': 'Lightning',
  'Sparkles': 'Sparkle',
  'TrendingUp': 'TrendUp',
  'TrendUp': 'TrendUp',
  'BarChart3': 'ChartBar',
  'BarChart': 'ChartBar',
  'DollarSign': 'CurrencyDollar',
  'Headphones': 'Headset',
  'Filter': 'Funnel',
  'SlidersHorizontal': 'Sliders',
  'Sliders': 'Sliders',
  'MoreVertical': 'DotsThreeVertical',
  'MoreHorizontal': 'DotsThree',
  'RefreshCw': 'ArrowsClockwise',
  'RotateCcw': 'ArrowCounterClockwise',
  'Store': 'Storefront',
  'LayoutDashboard': 'SquaresFour',
  'FileCheck2': 'FileText',
  'FileCheck': 'FileText',
  'FileText': 'FileText',
  'ClipboardList': 'ClipboardText',
  'Clipboard': 'ClipboardText',
  'Home': 'House',
  'Box': 'Cube',
  'Layers': 'Stack',
  'Grid': 'GridFour',
  'LayoutGrid': 'GridFour',
  'Grid3X3': 'GridNine',
  'LayoutList': 'ListDashes',
  'Smartphone': 'DeviceMobile',
  'Tv': 'Television',
  'Shirt': 'TShirt',
  'Dumbbell': 'Barbell',
  'Share2': 'ShareNetwork',
  'Share': 'ShareNetwork',
  'Save': 'FloppyDisk',
  'Send': 'PaperPlaneTilt',
  'MessageCircle': 'ChatCircle',
  'HelpCircle': 'Question',
  'Ban': 'Prohibit',
  'Loader2': 'CircleNotch',
  'CircleDollarSign': 'CurrencyCircleDollar',
  'Package': 'Package',
  'Truck': 'Truck',
  'CreditCard': 'CreditCard',
  'ShieldCheck': 'ShieldCheck',
  'Shield': 'Shield',
  'Heart': 'Heart',
  'Star': 'Star',
  'ShoppingCart': 'ShoppingCart',
  'ShoppingBag': 'ShoppingBag',
  'User': 'User',
  'Users': 'Users',
  'Plus': 'Plus',
  'Minus': 'Minus',
  'Copy': 'Copy',
  'Check': 'Check',
  'X': 'X',
  'Calendar': 'Calendar',
  'Clock': 'Clock',
  'Timer': 'Timer',
  'Image': 'Image',
  'Camera': 'Camera',
  'Link': 'Link',
  'Table': 'Table',
  'ThumbsUp': 'ThumbsUp',
  'ThumbsDown': 'ThumbsDown',
  'Hash': 'Hash',
  'Printer': 'Printer',
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

let totalChanges = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. If file imports from '@phosphor-icons/react', collect all imported icons and replace any Lucide names with Phosphor names in the import block
  const phosphorImportMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]@phosphor-icons\/react['"];?/);
  if (phosphorImportMatch) {
    const rawImports = phosphorImportMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    const mappedImports = [];
    for (const item of rawImports) {
      const parts = item.split(/\s+as\s+/);
      const orig = parts[0].trim();
      const alias = parts.length > 1 ? parts[1].trim() : null;
      const mapped = ICON_MAP[orig] || orig;
      mappedImports.push(alias ? `${mapped} as ${alias}` : mapped);
    }
    const uniqueImports = [...new Set(mappedImports)];
    const newImportBlock = `import {\n  ${uniqueImports.join(', ')}\n} from '@phosphor-icons/react';`;
    content = content.replace(phosphorImportMatch[0], newImportBlock);
  }

  // 2. Replace all Lucide identifiers everywhere in JSX, variables, objects
  for (const [oldName, newName] of Object.entries(ICON_MAP)) {
    if (oldName === newName) continue;
    const regex = new RegExp(`\\b${oldName}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newName);
    }
  }

  // 3. Remove strokeWidth props that cause React warnings on Phosphor icons
  content = content.replace(/\s*strokeWidth=\{[^}]+\}/g, '');
  content = content.replace(/\s*strokeWidth="[^"]+"/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${path.relative(ROOT, filePath)}`);
    totalChanges++;
  }
}

console.log(`Successfully fixed ${totalChanges} files.`);
