import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const assetsDir = "dist/client/assets";
const outFile = "dist/client/index.html";

const files = readdirSync(assetsDir);
const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));

if (!cssFile || !jsFile) {
  console.error("Could not find built CSS or JS entry files in", assetsDir);
  process.exit(1);
}

const favicon = readFileSync("public/favicon.ico");
const hash = Math.random().toString(36).slice(2, 8);

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nexar — Web Studio</title>
    <meta name="description" content="Nexar é um web studio focado em criar sites modernos, rápidos e memoráveis." />
    <meta name="author" content="Nexar Studio" />
    <meta name="theme-color" content="#0a0a0a" />
    <link rel="icon" href="/favicon.ico?v=${hash}" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>
`;

writeFileSync(outFile, html);
console.log("Generated", outFile);
