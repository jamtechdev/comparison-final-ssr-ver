import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { categoryName } = req.query;
  const [category, specificcategoryName] = categoryName.split('/')[3]
  const baseUrl = 'https://mondopedia.it'; // Your base URL

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/${category}/${specificcategoryName}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  </urlset>`;

  const filePath = path.join(process.cwd(), 'public', 'sitemaps', `${category}-${specificcategoryName}.xml`);
  fs.writeFileSync(filePath, xml);

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}
