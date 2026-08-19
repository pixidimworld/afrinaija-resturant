import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = normalize(join(fileURLToPath(new URL('.', import.meta.url)), '..'));
const port = Number(process.env.PORT) || 4317;
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const filePath = normalize(join(root, pathname === '/' ? '/index.html' : pathname));
  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  const extension = extname(filePath).toLowerCase();
  const cacheControl = extension === '.html' || extension === '.js' || extension === '.css' ? 'no-cache' : 'public, max-age=3600';
  response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream', 'Cache-Control': cacheControl });
  createReadStream(filePath).pipe(response);
}).listen(port, '0.0.0.0', () => console.log(`Naija Afrinaija Pot live at http://localhost:${port}`));


