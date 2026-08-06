/**
 * Gera os ícones do PWA a partir de uma única definição de arte.
 *
 * Rode com `npm run icons` depois de mexer no desenho.
 *
 * A marca são duas lupas entrelaçadas — os dois olhares do casal — e a
 * interseção iluminada é onde a verdade aparece. Tudo é traçado em SVG puro,
 * sem depender de fontes instaladas na máquina que gera os PNGs.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(publicDir, { recursive: true });

const NOITE = "#12141a";
const LATAO = "#d9a441";
const PAPEL = "#f5efe2";

/** O desenho, centrado num quadro de 512×512. */
const artwork = `
  <defs>
    <clipPath id="lenteA"><circle cx="205" cy="215" r="92"/></clipPath>
    <clipPath id="lenteB"><circle cx="307" cy="215" r="92"/></clipPath>
  </defs>

  <!-- cabos das lupas, abrindo em V -->
  <line x1="139" y1="281" x2="76" y2="352" stroke="${LATAO}" stroke-width="34" stroke-linecap="round"/>
  <line x1="373" y1="281" x2="436" y2="352" stroke="${LATAO}" stroke-width="34" stroke-linecap="round"/>

  <!-- a interseção acesa: onde os dois olhares se cruzam -->
  <g clip-path="url(#lenteA)">
    <circle cx="307" cy="215" r="92" fill="${PAPEL}" opacity="0.92"/>
  </g>

  <!-- aros das lupas -->
  <circle cx="205" cy="215" r="92" fill="none" stroke="${LATAO}" stroke-width="24"/>
  <circle cx="307" cy="215" r="92" fill="none" stroke="${LATAO}" stroke-width="24"/>

  <!-- pingo de verdade na interseção -->
  <circle cx="256" cy="215" r="17" fill="${NOITE}"/>
`;

const svg = (inner, { rounded }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512"${rounded ? ' rx="112"' : ""} fill="${NOITE}"/>
  ${inner}
</svg>`;

// Os cabos descem mais do que os aros sobem; um leve empurrão para cima
// equilibra a marca no quadro.
const centrado = `<g transform="translate(0 -14)">${artwork}</g>`;

const icon = svg(centrado, { rounded: true });

// O Android recorta o ícone maskable num círculo de 80% do quadro, então o
// desenho encolhe para caber na zona segura em vez de perder as bordas.
const maskable = svg(
  `<g transform="translate(51.2 51.2) scale(0.8)">${centrado}</g>`,
  { rounded: false }
);

writeFileSync(join(publicDir, "icon.svg"), icon);

const targets = [
  { svg: icon, size: 192, name: "icon-192.png" },
  { svg: icon, size: 512, name: "icon-512.png" },
  { svg: maskable, size: 512, name: "icon-maskable-512.png" },
];

for (const t of targets) {
  await sharp(Buffer.from(t.svg)).resize(t.size, t.size).png().toFile(join(publicDir, t.name));
  console.log(`gerado public/${t.name}`);
}
