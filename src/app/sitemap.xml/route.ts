import { MetadataRoute } from 'next';

export async function GET() {
  const baseUrl = 'https://cloudvibes.org';
  
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/help',
    '/guides',
    '/guides/beginners-guide',
    '/terms',
    '/privacy',
    '/weather',
  ];

  // Popular weather locations
  const weatherLocations = [
    'new-york', 'los-angeles', 'chicago', 'houston', 'phoenix', 'philadelphia',
    'san-antonio', 'san-diego', 'dallas', 'san-jose', 'austin', 'jacksonville',
    'london', 'paris', 'tokyo', 'sydney', 'toronto', 'vancouver', 'berlin',
    'madrid', 'rome', 'amsterdam', 'stockholm', 'oslo', 'copenhagen'
  ];

  const currentDate = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Main pages -->
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/weather' ? '0.9' : '0.8'}</priority>
  </url>`).join('')}

  <!-- Weather location pages -->
  ${weatherLocations.map(location => `
  <url>
    <loc>${baseUrl}/weather/${location}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}