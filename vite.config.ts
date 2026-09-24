import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


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

        // GET /api/inquiries -> Return all saved inquiries
        if (url === '/api/inquiries' && req.method === 'GET') {
          const inqPath = path.resolve(import.meta.dirname, 'src/data/inquiries.json');
          try {
            if (!fs.existsSync(inqPath)) {
              fs.writeFileSync(inqPath, '[]', 'utf-8');
            }
            const content = fs.readFileSync(inqPath, 'utf-8');
            const inquiries = JSON.parse(content || '[]');
            res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
            res.end(JSON.stringify({ success: true, count: inquiries.length, inquiries }));
          } catch (err: unknown) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Read inquiries error' }));
          }
          return;
        }

        // POST /api/inquiries -> Save inquiry and send email via Nodemailer
        if (url === '/api/inquiries' && req.method === 'POST') {
          const inqPath = path.resolve(import.meta.dirname, 'src/data/inquiries.json');
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const body = Buffer.concat(chunks).toString('utf-8');
              const { parentName, studentName, gradeSeeking, phone, email, notes, source } = JSON.parse(body);

              if (!parentName || !phone || !gradeSeeking) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Missing required inquiry fields' }));
                return;
              }

              const newInquiry = {
                id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
                parentName: parentName.trim(),
                studentName: studentName?.trim() || null,
                gradeSeeking: gradeSeeking.trim(),
                phone: phone.trim(),
                email: email?.trim() || null,
                notes: notes?.trim() || null,
                source: source?.trim() || 'Website Inquiry',
                status: 'NEW',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              let inquiries = [];
              if (fs.existsSync(inqPath)) {
                try {
                  inquiries = JSON.parse(fs.readFileSync(inqPath, 'utf-8'));
                } catch {
                  inquiries = [];
                }
              }
              inquiries.unshift(newInquiry);
              fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf-8');

              // Dispatch email via Nodemailer if SMTP configured
              let emailSent = false;
              let emailSimulated = true;
              const smtpUser = process.env.SMTP_USER;
              const smtpPass = process.env.SMTP_PASS;
              const officialEmail = process.env.SCHOOL_OFFICIAL_EMAIL || 'lotusglobalschool@gmail.com';

              if (smtpUser && smtpPass) {
                try {
                  const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || 'smtp.gmail.com',
                    port: parseInt(process.env.SMTP_PORT || '587', 10),
                    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
                    auth: { user: smtpUser, pass: smtpPass },
                  });

                  await transporter.sendMail({
                    from: `"Lotus Global School Admissions" <${smtpUser}>`,
                    to: officialEmail,
                    replyTo: newInquiry.email || undefined,
                    subject: `New Admission Inquiry: ${newInquiry.studentName || newInquiry.gradeSeeking} - ${newInquiry.parentName}`,
                    html: `
                      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                        <div style="background-color: #2F5187; padding: 20px; color: white; border-bottom: 4px solid #E87737; text-align: center;">
                          <h2 style="margin: 0;">Lotus Global School</h2>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #FED7AA;">NEW ADMISSION INQUIRY RECEIVED</p>
                        </div>
                        <div style="padding: 24px; background: #ffffff;">
                          <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Parent/Guardian:</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${newInquiry.parentName}</td></tr>
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Student Name:</td><td style="padding: 8px 0; color: #1e293b;">${newInquiry.studentName || 'Not specified'}</td></tr>
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Grade Seeking:</td><td style="padding: 8px 0; color: #2563eb; font-weight: bold;">${newInquiry.gradeSeeking}</td></tr>
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contact Phone:</td><td style="padding: 8px 0;"><a href="tel:${newInquiry.phone}" style="color: #2F5187; font-weight: bold;">${newInquiry.phone}</a></td></tr>
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${newInquiry.email || ''}" style="color: #2F5187;">${newInquiry.email || 'Not provided'}</a></td></tr>
                            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Inquiry Source:</td><td style="padding: 8px 0; color: #475569;">${newInquiry.source}</td></tr>
                          </table>
                          ${newInquiry.notes ? `<div style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-left: 4px solid #2F5187; font-size: 14px;"><strong>Parent Notes:</strong><br/>${newInquiry.notes}</div>` : ''}
                          <div style="margin-top: 24px; text-align: center;">
                            <a href="tel:${newInquiry.phone}" style="display: inline-block; padding: 10px 18px; margin: 4px; background: #2F5187; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">📞 Call Parent</a>
                            <a href="https://wa.me/91${newInquiry.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; padding: 10px 18px; margin: 4px; background: #16a34a; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">💬 WhatsApp</a>
                          </div>
                        </div>
                        <div style="background: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
                          Lotus Global School Admissions Desk &bull; Vatar, Vapi, Gujarat
                        </div>
                      </div>
                    `,
                  });
                  emailSent = true;
                  emailSimulated = false;
                  console.log(`[Vite Dev CMS] Inquiry email sent to ${officialEmail}`);
                } catch (mailErr) {
                  console.error('[Vite Dev CMS] Failed to send email via SMTP:', mailErr);
                }
              } else {
                console.log(`[Vite Dev CMS] Inquiry received from "${newInquiry.parentName}" (Phone: ${newInquiry.phone}) and saved to src/data/inquiries.json. (To send live emails, configure SMTP_USER and SMTP_PASS in .env)`);
              }

              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                message: 'Inquiry saved successfully',
                inquiry: newInquiry,
                emailSent,
                emailSimulated,
              }));
            } catch (err: unknown) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Save inquiry error' }));
            }
          });
          return;
        }

        // PATCH /api/inquiries/:id -> Update inquiry status
        if (url?.startsWith('/api/inquiries/') && req.method === 'PATCH') {
          const inqId = url.replace('/api/inquiries/', '');
          const inqPath = path.resolve(import.meta.dirname, 'src/data/inquiries.json');
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const { status } = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
              let inquiries = [];
              if (fs.existsSync(inqPath)) {
                inquiries = JSON.parse(fs.readFileSync(inqPath, 'utf-8'));
              }
              const target = inquiries.find((i: any) => i.id === inqId);
              if (target) {
                target.status = status;
                target.updatedAt = new Date().toISOString();
                fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, inquiry: target }));
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Inquiry not found' }));
              }
            } catch (err: unknown) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Update error' }));
            }
          });
          return;
        }

        // DELETE /api/inquiries/:id -> Delete inquiry
        if (url?.startsWith('/api/inquiries/') && req.method === 'DELETE') {
          const inqId = url.replace('/api/inquiries/', '');
          const inqPath = path.resolve(import.meta.dirname, 'src/data/inquiries.json');
          try {
            let inquiries = [];
            if (fs.existsSync(inqPath)) {
              inquiries = JSON.parse(fs.readFileSync(inqPath, 'utf-8'));
            }
            inquiries = inquiries.filter((i: any) => i.id !== inqId);
            fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Inquiry deleted' }));
          } catch (err: unknown) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Delete error' }));
          }
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
