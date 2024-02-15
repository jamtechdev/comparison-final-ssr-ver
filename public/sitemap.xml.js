import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const baseUrl = 'https://mondopedia.it'; // Your base URL
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about-us', changefreq: 'monthly', priority: 0.8 },
    // Add more pages as needed
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map((page) => `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `).join('')}
  </urlset>`;

  const filePath = path.join(process.cwd(), 'public', 'sitemaps', 'pages.xml');
  fs.writeFileSync(filePath, xml);

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}
