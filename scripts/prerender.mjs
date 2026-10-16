import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const siteUrl = 'https://www.wespdirect.be';
const routes = [
  '/',
  '/diensten/',
  '/over-ons/',
  '/tarieven/',
  '/veelgestelde-vragen/',
  '/wespenverdelging-wechelderzande/',
  '/wespennest-gierle/',
  '/wespenverdelging-poederlee/',
  '/wespenverdelging-lille/',
];
const distDirectory = path.resolve('dist');
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const [{ default: App, getSeoData }, template] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    readFile(path.join(distDirectory, 'index.html'), 'utf8'),
  ]);

  for (const route of routes) {
    const seo = getSeoData(route);
    const markup = renderToString(React.createElement(App, { initialPath: route }));
    const jsonLd = JSON.stringify(seo.structuredData).replaceAll('<', '\\u003c');
    const description = seo.description.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
    const title = seo.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
    const socialMetadata = seo.socialMetadata.map((metadata) => {
      const attribute = 'property' in metadata
        ? `property="${metadata.property}"`
        : `name="${metadata.name}"`;
      const content = metadata.content.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
      return `<meta ${attribute} content="${content}" />`;
    }).join('');
    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
      .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${seo.url}" />`)
      .replace('</head>', `${socialMetadata}<script id="seo-jsonld" type="application/ld+json">${jsonLd}</script></head>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

    const outputDirectory = path.join(distDirectory, route.replace(/^\/|\/$/g, ''));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, 'index.html'), html);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap);
} finally {
  await vite.close();
}
