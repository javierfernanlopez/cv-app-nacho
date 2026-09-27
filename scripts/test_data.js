import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const subdirs = fs.readdirSync(distDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`Verificando ${subdirs.length} directorios de empresas...`);

let errors = 0;

for (const dir of subdirs) {
  const compPath = path.join(distDir, dir);
  const files = fs.readdirSync(compPath);

  // Check expected files
  const hasCv = files.some(f => f.startsWith('CV_') && f.endsWith('.html'));
  const hasLetter = files.some(f => f.startsWith('Carta_') && f.endsWith('.html'));
  const hasPitch = files.includes('Email_Pitch.txt');
  const hasStrat = files.includes('Estrategia_Contacto.txt');

    const hasCvPdf = files.some(f => f.startsWith('CV_') && f.endsWith('.pdf'));
    const hasLetterPdf = files.some(f => f.startsWith('Carta_') && f.endsWith('.pdf'));

    if (!hasCv || !hasLetter || !hasPitch || !hasStrat || !hasCvPdf || !hasLetterPdf) {
      console.error(`[ERROR] Faltan archivos en ${dir}: CV=${hasCv}, Carta=${hasLetter}, Pitch=${hasPitch}, Strat=${hasStrat}, CvPdf=${hasCvPdf}, LetterPdf=${hasLetterPdf}`);
      errors++;
    }

    // Check for unresolved placeholders only in text/html files
    for (const f of files) {
      if (f.endsWith('.pdf')) continue;
      const filePath = path.join(compPath, f);
      const content = fs.readFileSync(filePath, 'utf-8');

      const matchUnresolved = content.match(/\{\{[A-Z0-9_]+\}\}|\{[a-zA-Z0-9_]+\}/g);
      if (matchUnresolved && matchUnresolved.length > 0) {
        console.error(`[ERROR] Placeholders no resueltos en ${dir}/${f}:`, matchUnresolved);
        errors++;
      }

      if (content.includes('undefined') || content.includes('null')) {
        console.warn(`[WARN] Posible valor undefined/null en ${dir}/${f}`);
      }
    }
}

if (errors === 0) {
  console.log(`✅ ¡Verificación exitosa! Los ${subdirs.length} packs están completos, sin placeholders residuales y listos para uso.`);
  process.exit(0);
} else {
  console.error(`❌ Se encontraron ${errors} errores en la verificación.`);
  process.exit(1);
}
