import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const baseUrl = "https://mondopedia.it"; // Your base URL

  const xml = 
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>/public-url</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
}
