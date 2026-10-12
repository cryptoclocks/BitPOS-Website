import {build} from 'esbuild';
import {cp, mkdir, rm} from 'node:fs/promises';
await build({entryPoints:['src/mini-viewer.js'],outfile:'public/mini-viewer.js',bundle:true,format:'esm',minify:true,target:'es2022',legalComments:'eof'});
await rm('dist', {recursive: true, force: true});
await mkdir('dist', {recursive: true});
await cp('public', 'dist', {recursive: true});
console.log('BitPOS static website built → dist');
