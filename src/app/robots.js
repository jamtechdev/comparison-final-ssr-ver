export default function robots() {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: 'https://mondopedia.it/sitemap.xml',
    }
  }