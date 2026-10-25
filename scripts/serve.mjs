import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { buildSite } from './build.mjs';
import { publicFiles } from './site-config.mjs';

const argumentsList = process.argv.slice(2);
const portValue = argumentsList.length === 0 ? '3000' : argumentsList[1];
if (argumentsList.length !== 0 && (argumentsList.length !== 2 || argumentsList[0] !== '--port')) {
  throw new Error('Uso: node scripts/serve.mjs [--port 3000]');
}
if (!/^\d{4,5}$/.test(portValue ?? '')) throw new Error('Puerto inválido.');
const port = Number(portValue);
if (port < 1024 || port > 65535) throw new Error('El puerto debe estar entre 1024 y 65535.');

const output = await buildSite();
const html = await readFile(join(output, 'index.html'), 'utf8');
const contentSecurityPolicy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
if (!contentSecurityPolicy) throw new Error('Falta la política de contenido del documento.');

const routes = new Map(publicFiles.filter((file) => !file.startsWith('.')).map((file) => [`/${file}`, file]));
routes.set('/', 'index.html');
const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.ttf', 'font/ttf'],
  ['.woff2', 'font/woff2'],
]);

const headers = {
  'Content-Security-Policy': `${contentSecurityPolicy}; frame-ancestors 'none'`,
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cache-Control': 'no-store',
};

function sendText(response, status, message, additionalHeaders = {}) {
  response.writeHead(status, { ...headers, ...additionalHeaders, 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

const server = createServer({ maxHeaderSize: 8192 }, async (request, response) => {
  try {
    if (!hosts.has(request.headers.host)) return sendText(response, 403, 'Origen no permitido.');
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return sendText(response, 405, 'Método no permitido.', { Allow: 'GET, HEAD' });
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    } catch {
      return sendText(response, 400, 'Ruta inválida.');
    }

    // Las peticiones se resuelven contra una lista cerrada, no contra el disco.
    const relativePath = routes.get(pathname);
    const status = relativePath ? 200 : 404;
    const filename = relativePath ?? '404.html';
    const body = await readFile(join(output, filename));
    response.writeHead(status, {
      ...headers,
      'Content-Type': types.get(extname(filename)) ?? 'text/plain; charset=utf-8',
      'Content-Length': body.byteLength,
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    if (!response.headersSent) sendText(response, 500, 'No se pudo atender la solicitud.');
    else response.destroy();
  }
});

server.requestTimeout = 10000;
server.headersTimeout = 5000;
server.keepAliveTimeout = 5000;
server.maxRequestsPerSocket = 100;
server.on('error', (error) => {
  process.stderr.write(`No se pudo iniciar la vista local: ${error.message}\n`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`Vista local: http://127.0.0.1:${port}/\n`);
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close());
}
