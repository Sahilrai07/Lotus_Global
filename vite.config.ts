import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

/**
 * Local-only Admin API plugin for developer CMS.
 * ONLY runs during local development (`vite` / `npm run dev`) via configureServer.
 * 100% excluded and inactive during `vite build` (production).
 */
function localAdminPlugin(): Plugin {
  return {
    name: 'vite-plugin-local-admin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        // GET /api/admin/data -> Return siteData.json
        if (url === '/api/admin/data' && req.method === 'GET') {
          const dataPath = path.resolve(import.meta.dirname, 'src/data/siteData.json');
          try {
            if (!fs.existsSync(dataPath)) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'siteData.json not found' }));
              return;
            }
            const content = fs.readFileSync(dataPath, 'utf-8');
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            });
            res.end(content);
          } catch (err: unknown) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Read error' }));
          }
          return;
        }

        // POST /api/admin/data -> Write updated siteData.json
        if (url === '/api/admin/data' && req.method === 'POST') {
          const dataPath = path.resolve(import.meta.dirname, 'src/data/siteData.json');
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const body = Buffer.concat(chunks).toString('utf-8');
              const parsed = JSON.parse(body);
              fs.writeFileSync(dataPath, JSON.stringify(parsed, null, 2), 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Data saved successfully to disk.' }));
            } catch (err: unknown) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Save error' }));
            }
          });
          return;
        }

        // POST /api/admin/upload -> Save file to public/uploads/[images|documents|gallery]
        if (url === '/api/admin/upload' && req.method === 'POST') {
          const contentType = req.headers['content-type'] || '';
          const chunks: Buffer[] = [];

          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);

              // Support 1: JSON with base64
              if (contentType.includes('application/json')) {
                const body = JSON.parse(buffer.toString('utf-8'));
                const { fileName, folder = 'images', base64 } = body;
                if (!base64 || !fileName) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Missing fileName or base64' }));
                  return;
                }

                const safeFolder = ['images', 'documents', 'gallery'].includes(folder) ? folder : 'images';
                const uploadDir = path.resolve(import.meta.dirname, 'public/uploads', safeFolder);
                if (!fs.existsSync(uploadDir)) {
                  fs.mkdirSync(uploadDir, { recursive: true });
                }

                const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
                const filePath = path.join(uploadDir, cleanFileName);
                const fileData = Buffer.from(base64.replace(/^data:.*?;base64,/, ''), 'base64');
                fs.writeFileSync(filePath, fileData);

                const sizeKb = Math.round(fileData.length / 1024);
                const fileSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: true,
                  url: `/uploads/${safeFolder}/${cleanFileName}`,
                  fileName: cleanFileName,
                  fileSize,
                }));
                return;
              }

              // Support 2: Multipart form-data
              if (contentType.includes('multipart/form-data')) {
                const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                if (!boundaryMatch) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'No boundary found in multipart form-data' }));
                  return;
                }
                const boundary = boundaryMatch[1] || boundaryMatch[2];
                const parts = parseMultipart(buffer, boundary);

                let folder = 'images';
                let filePart: { filename?: string; data: Buffer } | null = null;

                for (const part of parts) {
                  if (part.name === 'folder') {
                    folder = part.data.toString('utf-8').trim();
                  } else if (part.filename) {
                    filePart = part;
                  }
                }

                if (!filePart || !filePart.filename) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'No file found in request' }));
                  return;
                }

                const safeFolder = ['images', 'documents', 'gallery'].includes(folder) ? folder : 'images';
                const uploadDir = path.resolve(import.meta.dirname, 'public/uploads', safeFolder);
                if (!fs.existsSync(uploadDir)) {
                  fs.mkdirSync(uploadDir, { recursive: true });
                }

                const cleanFileName = `${Date.now()}-${filePart.filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
                const filePath = path.join(uploadDir, cleanFileName);
                fs.writeFileSync(filePath, filePart.data);

                const sizeKb = Math.round(filePart.data.length / 1024);
                const fileSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: true,
                  url: `/uploads/${safeFolder}/${cleanFileName}`,
                  fileName: cleanFileName,
                  fileSize,
                }));
                return;
              }

              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Unsupported Content-Type for upload' }));
            } catch (err: unknown) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Upload failed' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

/**
 * Minimal robust zero-dependency multipart parser for local dev file uploads
 */
function parseMultipart(buffer: Buffer, boundary: string): Array<{ name?: string; filename?: string; data: Buffer }> {
  const result: Array<{ name?: string; filename?: string; data: Buffer }> = [];
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let start = buffer.indexOf(boundaryBuffer);

  while (start !== -1) {
    start += boundaryBuffer.length;
    if (buffer[start] === 45 && buffer[start + 1] === 45) {
      break; // End boundary '--'
    }
    if (buffer[start] === 13 && buffer[start + 1] === 10) {
      start += 2;
    }

    const nextBoundary = buffer.indexOf(boundaryBuffer, start);
    if (nextBoundary === -1) break;

    const partBuffer = buffer.slice(start, nextBoundary - 2); // Exclude \r\n
    const headerEndIndex = partBuffer.indexOf(Buffer.from('\r\n\r\n'));

    if (headerEndIndex !== -1) {
      const headerText = partBuffer.slice(0, headerEndIndex).toString('utf-8');
      const data = partBuffer.slice(headerEndIndex + 4);

      const nameMatch = headerText.match(/name="([^"]+)"/i);
      const filenameMatch = headerText.match(/filename="([^"]+)"/i);

      result.push({
        name: nameMatch ? nameMatch[1] : undefined,
        filename: filenameMatch ? filenameMatch[1] : undefined,
        data,
      });
    }

    start = nextBoundary;
  }

  return result;
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localAdminPlugin(),
  ],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
});
