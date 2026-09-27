import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const profile = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'profile.json'), 'utf8'));
const companies = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'companies.json'), 'utf8'));
const photoPath = path.join(rootDir, 'assets', 'foto.jpg');

let photoBase64 = '';
if (fs.existsSync(photoPath)) {
  const photoBuf = fs.readFileSync(photoPath);
  photoBase64 = `data:image/jpeg;base64,${photoBuf.toString('base64')}`;
}

const bundleContent = `window.PROFILE_DATA = ${JSON.stringify(profile, null, 2)};

window.COMPANIES_DATA = ${JSON.stringify(companies, null, 2)};

window.DEFAULT_PHOTO_BASE64 = "${photoBase64}";
`;

fs.writeFileSync(path.join(rootDir, 'src', 'data-bundle.js'), bundleContent, 'utf8');
console.log(`src/data-bundle.js successfully updated with ${companies.length} companies and ${Object.keys(profile.roles).length} roles!`);
