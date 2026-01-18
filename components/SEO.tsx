
import React, { useEffect } from 'react';
import { ResolvedDoctor } from '../types';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  doctor?: ResolvedDoctor;
  specialtyName?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath, doctor, specialtyName }) => {
  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const fullUrl = `${baseUrl}#${canonicalPath}`;

    // 1. Basic Meta Tags
    document.title = title;
    
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('robots', 'index, follow');
    
    // 2. Open Graph Tags
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', fullUrl, 'property');
    updateMeta('og:type', doctor ? 'profile' : 'website', 'property');
    updateMeta('og:site_name', 'Directorio Médico Minimalista', 'property');

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Structured Data (JSON-LD)
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) script.remove();

    const schemas: any[] = [];

    // Breadcrumb Schema
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": `${baseUrl}#/`
        }
      ]
    };

    if (specialtyName) {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": specialtyName,
        "item": `${baseUrl}#/especialidad/${encodeURIComponent(specialtyName)}`
      });
    } else if (doctor) {
      breadcrumbs.itemListElement.push(
        {
          "@type": "ListItem",
          "position": 2,
          "name": doctor.specialties[0],
          "item": `${baseUrl}#/especialidad/${encodeURIComponent(doctor.specialties[0])}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": doctor.name,
          "item": fullUrl
        }
      );
    }
    schemas.push(breadcrumbs);

    // Physician Schema
    if (doctor) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": doctor.name,
        "medicalSpecialty": doctor.specialties,
        "description": description,
        "telephone": doctor.phones[0],
        "address": doctor.locations.map(loc => ({
          "@type": "PostalAddress",
          "streetAddress": loc.address,
          "addressLocality": doctor.cities[0],
          "addressCountry": "MX"
        })),
        "url": fullUrl,
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Cédula Profesional",
          "value": doctor.license
        }
      });
    }

    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [title, description, canonicalPath, doctor, specialtyName]);

  return null;
};

export default SEO;
