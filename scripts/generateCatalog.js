import fs from 'fs-extra';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets/Products');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/catalog.ts');

// Map main category folder names to category ID prefixes
const CATEGORY_PREFIX_MAP = {
  'Reservatórios Metálicos': 'rm',
  'Tanques Subterrâneos': 'ts',
};

// Map subcategory folder names to category ID slugs
const SUBCATEGORY_SLUG_MAP = {
  'Luvas': 'luvas',
  'Niples': 'niples',
  'Juntas': 'juntas',
  'Plugs': 'plugs',
  'Filtros': 'filtros',
};

function formatModelName(folderName) {
  let name = folderName;

  // Rule 1: Remove leading number pattern (e.g. "1. ", "3. ", "7.1 ", "11. ")
  name = name.replace(/^\d+\.?\d*\s*/, '');

  // Rule 2: Replace trailing underscore with inch symbol (e.g. "Luva 3-8_" → "Luva 3-8\"")
  name = name.replace(/_\s*$/, '"');

  // Rule 3: Replace dashes between digits with slashes (e.g. "3-8" → "3/8")
  name = name.replace(/(\d)-(\d)/g, '$1/$2');

  // Rule 4: Replace remaining interior underscores with inch symbol
  name = name.replace(/_/g, '"');

  return name.trim();
}

function generateCatalog() {
  console.log('Scanning directories in: ' + ASSETS_DIR);

  const files = globSync(`${ASSETS_DIR}/**/*.png`);

  // Keep one image per model subfolder (the first PNG found)
  const processedModels = new Set();
  const catalogItems = [];

  files.forEach((file) => {
    const pathParts = file.split(path.sep);
    const productsIndex = pathParts.findIndex(p => p === 'Products');

    // Must have: Products / [Main Category] / [Sub Category] / [Model Folder] / [file]
    if (pathParts.length >= productsIndex + 5) {
      const mainCategory = pathParts[productsIndex + 1];
      const subCategory = pathParts[productsIndex + 2];
      const modelFolder = pathParts[productsIndex + 3];

      const prefix = CATEGORY_PREFIX_MAP[mainCategory];
      const subSlug = SUBCATEGORY_SLUG_MAP[subCategory];

      if (!prefix || !subSlug) {
        console.warn(`Skipping unknown category/subcategory: ${mainCategory} / ${subCategory}`);
        return;
      }

      const categoryId = `${prefix}-${subSlug}`;
      const modelName = formatModelName(modelFolder);
      const uniqueKey = `${categoryId}-${modelName}`;

      if (!processedModels.has(uniqueKey)) {
        processedModels.add(uniqueKey);

        // Path relative to project root for import.meta.glob
        const relativeToSrc = file.substring(file.indexOf('/src/assets/'));

        catalogItems.push({
          id: uniqueKey.replace(/\s+/g, '-').replace(/[/"]/g, '-').replace(/-+/g, '-').toLowerCase(),
          categoryId,
          mainCategory,
          subCategory,
          model: modelName,
          // This path will be used with import.meta.glob in the component
          importPath: '.' + relativeToSrc,
          description: '',
        });
      }
    }
  });

  // Sort by main category, subcategory, then model name
  catalogItems.sort((a, b) => {
    if (a.mainCategory !== b.mainCategory) return a.mainCategory.localeCompare(b.mainCategory);
    if (a.subCategory !== b.subCategory) return a.subCategory.localeCompare(b.subCategory);
    return a.model.localeCompare(b.model);
  });

  console.log(`Category IDs created: ${[...new Set(catalogItems.map(i => i.categoryId))].join(', ')}`);

  const tsContent = `// Automatically generated from src/assets/Products directory structure.
// To regenerate, run: node scripts/generateCatalog.js

export interface CatalogItem {
  id: string;
  categoryId: string;
  mainCategory: string;
  subCategory: string;
  model: string;
  importPath: string;
  description: string;
}

export const catalogData: CatalogItem[] = ${JSON.stringify(catalogItems, null, 2)};
`;

  fs.outputFileSync(OUTPUT_FILE, tsContent);
  console.log(`✓ Generated catalog with ${catalogItems.length} unique products.`);
}

generateCatalog();
