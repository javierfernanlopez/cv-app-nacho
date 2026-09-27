import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let PORT = parseInt(process.env.PORT || '3001', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/src/index.html';
  }

  let filePath = path.join(__dirname, reqPath);

  // Helper to serve a found file
  const serveFile = (targetPath) => {
    let finalPath = targetPath;
    if (fs.existsSync(finalPath) && fs.statSync(finalPath).isDirectory()) {
      finalPath = path.join(finalPath, 'index.html');
    }

    const ext = path.extname(finalPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(finalPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${readErr.message}`);
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  };

  // Try direct path first
  fs.stat(filePath, (err) => {
    if (!err) {
      serveFile(filePath);
      return;
    }

    // Try inside src/ directory
    const srcFallbackPath = path.join(__dirname, 'src', reqPath);
    fs.stat(srcFallbackPath, (srcErr) => {
      if (!srcErr) {
        serveFile(srcFallbackPath);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
    });
  });
});

function startServer(portToTry) {
  server.listen(portToTry, '0.0.0.0', () => {
    console.log(`\n============================================================`);
    console.log(`🚀 CV Suite Dashboard — Ignacio Fernández López (Nacho)`);
    console.log(`   Disponible en: http://localhost:${portToTry}`);
    console.log(`============================================================`);
    console.log(`- Candidato: Ignacio Fernández López (ADE + GESCO + Savills Univ.)`);
    console.log(`- 22 Empresas analizadas en Real Estate, Consultoría y Promoción.`);
    console.log(`- Optimizado para Correo Web (Gmail Web & Outlook Web - sin Mac).`);
    console.log(`- PDFs de 1 página A4 ajustada listos para enviar.`);
    console.log(`- Tracker de estados guardado en navegador.`);
    console.log(`============================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`El puerto ${portToTry} está ocupado. Probando puerto ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Error al arrancar el servidor:', err);
    }
  });
}

startServer(PORT);
