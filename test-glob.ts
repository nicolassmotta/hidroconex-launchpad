import { globSync } from 'glob';
console.log(globSync('src/assets/Products/**/*.png').filter(f => f.includes('Luva 1 1-2')));
