// Convierte los archivos screen.html descargados del MCP de Stitch
// (que son JSON con el HTML escapado en "dataString") a HTML puro.
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'stitch-export');
for (const dir of fs.readdirSync(base)) {
  const p = path.join(base, dir, 'screen.html');
  if (!fs.existsSync(p)) continue;
  const raw = fs.readFileSync(p, 'utf8');
  try {
    const json = JSON.parse(raw);
    if (typeof json.dataString === 'string') {
      fs.writeFileSync(p, json.dataString, 'utf8');
      console.log(`${dir}: HTML extraido (${json.dataString.length} chars)`);
    } else {
      console.log(`${dir}: JSON sin dataString, se deja como esta`);
    }
  } catch {
    console.log(`${dir}: ya es HTML puro`);
  }
}
