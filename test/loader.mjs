import { transform } from 'esbuild';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function load(url, context, nextLoad) {
  // Mock CSS/SCSS modules
  if (url.endsWith('.css') || url.endsWith('.scss') || url.endsWith('.sass')) {
    // Return a proxy that returns the property name as the value (identity-obj-proxy behavior)
    return {
      format: 'module',
      shortCircuit: true,
      source: `
        const handler = {
          get: function(target, prop) {
            if (prop === 'default') return target;
            if (prop === '__esModule') return false;
            return prop;
          }
        };
        export default new Proxy({}, handler);
      `,
    };
  }

  // Transform JS/JSX/TS/TSX/MJS files that are not in node_modules
  if (url.startsWith('file:') && !url.includes('node_modules')) {
    const ext = url.split('.').pop();
    if (['js', 'jsx', 'mjs', 'ts', 'tsx'].includes(ext)) {
       const source = await fs.readFile(fileURLToPath(url), 'utf8');
       const { code } = await transform(source, {
         loader: 'tsx',
         format: 'esm',
         sourcemap: 'inline',
         sourcefile: fileURLToPath(url),
       });
       return {
         format: 'module',
         shortCircuit: true,
         source: code,
       };
    }
  }

  return nextLoad(url, context);
}
