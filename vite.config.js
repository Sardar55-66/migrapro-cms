import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    proxy: {
      '/api': 'http://localhost:8081',
      '/.netlify': 'http://localhost:8081',
    },
  },
  plugins: [
    {
      name: 'serve-admin-index',
      configureServer(server) {
        const adminMiddleware = (req, res, next) => {
          if (req.url === '/admin/' || req.url === '/admin') {
            try {
              const html = readFileSync(resolve(__dirname, 'public/admin/index.html'), 'utf-8');
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
            } catch {
              next();
            }
            return;
          }
          next();
        };
        server.middlewares.stack.unshift({ route: '', handle: adminMiddleware });
      },
    },
  ],
  build: {
    outDir: 'dist',
  },
});
