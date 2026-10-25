import { fileURLToPath } from 'node:url';

export const projectDirectory = fileURLToPath(new URL('../', import.meta.url));

export const publicFiles = Object.freeze([
  'index.html',
  '404.html',
  'styles.css',
  'script.js',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  '.nojekyll',
  'images/FOTO.png',
  'images/jc-simbolo.png',
  'images/jefferson-social.png',
  'fonts/manrope-variable.ttf',
  'fonts/source-sans-3-variable.woff2',
  'licenses/Manrope-OFL.txt',
  'licenses/Manrope-FONTLOG.txt',
  'licenses/SourceSans3-OFL.txt',
  'licenses/Lucide.txt',
  'licenses/README.txt',
]);
