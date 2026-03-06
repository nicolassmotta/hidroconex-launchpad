import { globSync } from 'glob';
console.log(globSync('src/assets/Products/**/*.png').slice(0, 3));
