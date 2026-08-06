/**
 * Prepara a arte do jogo para a web.
 *
 * Entrada:  art-src/<caso>/<id>.(png|jpg|webp)  — os originais grandes do
 *           gerador de imagens, fora de public/ para não irem ao bundle.
 * Saída:    public/art/<caso>/<id>.webp         — 512×512, leve o bastante
 *           para o precache do PWA (limite de 2 MiB por arquivo).
 *
 * Rode `npm run art` depois de adicionar ou trocar um original. O nome do
 * arquivo é o id do suspeito no caso: `art-src/caso01Noir/helena.png` vira
 * `/art/caso01Noir/helena.webp`, que é o valor de `portrait` no dado do caso.
 *
 * Arquivos em pastas começadas por "_" são ignorados (rascunhos, descartes).
 */
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { dirname, extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origem = join(raiz, "art-src");
const destino = join(raiz, "public", "art");

const LADO = 512;
const QUALIDADE = 78;
const EXTENSOES = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function pastas(dir) {
  try {
    return readdirSync(dir).filter((n) => !n.startsWith("_") && statSync(join(dir, n)).isDirectory());
  } catch {
    return [];
  }
}

const casos = pastas(origem);
if (casos.length === 0) {
  console.log("art-src/ está vazio — nada a converter.");
  process.exit(0);
}

let total = 0;
for (const caso of casos) {
  const entrada = join(origem, caso);
  const saida = join(destino, caso);
  mkdirSync(saida, { recursive: true });

  const arquivos = readdirSync(entrada).filter((n) => EXTENSOES.has(extname(n).toLowerCase()));
  for (const arquivo of arquivos) {
    const nome = `${basename(arquivo, extname(arquivo))}.webp`;
    const info = await sharp(join(entrada, arquivo))
      .resize(LADO, LADO, { fit: "cover", position: "top" })
      .webp({ quality: QUALIDADE })
      .toFile(join(saida, nome));
    console.log(`art/${caso}/${nome} — ${Math.round(info.size / 1024)} kB`);
    total++;
  }
}
console.log(`${total} imagem(ns) prontas em public/art/.`);
