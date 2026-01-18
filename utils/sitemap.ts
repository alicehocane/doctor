
import { doctors, lookups } from '../data';

export const generateSitemapXml = () => {
  const baseUrl = window.location.origin + window.location.pathname;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Main Indices
  const indices = ['', '#/especialidades', '#/ciudades', '#/enfermedades'];
  indices.forEach(path => {
    xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Dynamic Pages
  lookups.specialties.forEach(s => {
    xml += `  <url>\n    <loc>${baseUrl}#/especialidad/${encodeURIComponent(s)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  lookups.cities.forEach(c => {
    xml += `  <url>\n    <loc>${baseUrl}#/ciudad/${encodeURIComponent(c)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  lookups.diseases.forEach(d => {
    xml += `  <url>\n    <loc>${baseUrl}#/enfermedad/${encodeURIComponent(d)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Doctor Profiles
  doctors.forEach(doctor => {
    xml += `  <url>\n    <loc>${baseUrl}#/doctor/${doctor.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

export const downloadSitemap = () => {
  const xml = generateSitemapXml();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
