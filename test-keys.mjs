import fs from 'fs';
import { catalogData } from './src/data/catalog.ts';

const content = fs.readFileSync('src/components/Products.tsx', 'utf8');
// To test, we just do a quick glob like Vite does
import { globSync } from 'glob';
const files = globSync('src/assets/Products/**/*.png');
const keys = files.map(f => '/' + f);

for (const item of catalogData) {
  const expectedKey = item.importPath.replace(/^\./, '');
  if (!keys.includes(expectedKey)) {
    console.log("MISSING:", expectedKey);
    // Find closest match:
    const closest = keys.find(k => k.toLowerCase() === expectedKey.toLowerCase());
    if (closest) console.log("  But found case-insensitive match:", closest);
  }
}
console.log("Tested", catalogData.length, "items.");
