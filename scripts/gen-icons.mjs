/**
 * Gera os ícones do PWA a partir de uma única definição de arte.
 *
 * Rode com `npm run icons` depois de mexer no desenho.
 *
 * A marca é um CORAÇÃO DE IMPRESSÃO DIGITAL: as linhas de uma digital — a
 * assinatura de todo caso — desenhadas em anéis concêntricos em forma de
 * coração, com falhas de crista como numa digital real. No núcleo, um
 * coração aceso em papel: onde os dois olhares se encontram, a verdade
 * aparece. Tudo é SVG puro, sem fontes instaladas.
 *
 * Além dos PNGs do PWA, o script grava `public/logo.svg` (a marca solta,
 * fundo transparente) usada na tela de título.
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

/** Contorno de coração centrado na origem (≈340 de largura, ponta em y=150). */
const CORACAO =
  "M 0 150 C -20 118 -170 62 -170 -40 C -170 -132 -78 -162 -28 -122 " +
  "C -9 -106 0 -82 0 -62 C 0 -82 9 -106 28 -122 C 78 -162 170 -132 170 -40 " +
  "C 170 62 20 118 0 150 Z";

/**
 * Um anel da digital: o coração escalado, com traço interrompido
 * (stroke-dasharray) imitando as falhas de crista de uma impressão real.
 * A largura é dividida pela escala para todos os anéis pesarem igual.
 */
const crista = (escala, dash, offset) =>
  `<g transform="translate(256 254) scale(${escala})">
    <path d="${CORACAO}" fill="none" stroke="${LATAO}"
      stroke-width="${(22 / escala).toFixed(1)}" stroke-linecap="round"
      stroke-dasharray="${dash}" stroke-dashoffset="${offset}"/>
  </g>`;

/** O desenho, centrado num quadro de 512×512. */
const artwork = `
  ${crista(1.0, "320 30 210 26 300 30 180 26", 40)}
  ${crista(0.76, "250 36 160 32 280 36", 460)}
  ${crista(0.52, "170 42 220 38 120 42", 640)}
  ${crista(0.3, "150 52 190 46", 330)}

  <!-- o núcleo aceso: onde os dois olhares se encontram -->
  <g transform="translate(256 254) scale(0.18)">
    <path d="${CORACAO}" fill="${PAPEL}"/>
  </g>
`;

const svg = (inner, { rounded, fundo }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${fundo ? `<rect width="512" height="512"${rounded ? ' rx="112"' : ""} fill="${NOITE}"/>` : ""}
  ${inner}
</svg>`;

const icon = svg(artwork, { rounded: true, fundo: true });

// O Android recorta o ícone maskable num círculo de 80% do quadro, então o
// desenho encolhe para caber na zona segura em vez de perder as bordas.
const maskable = svg(
  `<g transform="translate(51.2 51.2) scale(0.8)">${artwork}</g>`,
  { rounded: false, fundo: true }
);

// A marca solta, sem fundo, para a tela de título.
const logo = svg(artwork, { rounded: false, fundo: false });

writeFileSync(join(publicDir, "icon.svg"), icon);
writeFileSync(join(publicDir, "logo.svg"), logo);
console.log("gerado public/icon.svg e public/logo.svg");

const targets = [
  { svg: icon, size: 192, name: "icon-192.png" },
  { svg: icon, size: 512, name: "icon-512.png" },
  { svg: maskable, size: 512, name: "icon-maskable-512.png" },
];

for (const t of targets) {
  await sharp(Buffer.from(t.svg)).resize(t.size, t.size).png().toFile(join(publicDir, t.name));
  console.log(`gerado public/${t.name}`);
}
