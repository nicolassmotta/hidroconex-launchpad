import fs from 'fs';
const file = fs.readFileSync('dist/assets/index-VaK0u-15.js', 'utf8');
const match = file.match(/\/src\/assets\/Products\\[^"]+/g);
console.log(match ? match.slice(0, 5) : "NO MATCH");
