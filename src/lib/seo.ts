import { SITE } from './site';
import type { Producto } from './productos';

export function localTitle(page: string): string {
  return `${page} en ${SITE.ciudadCorta}, ${SITE.provincia}`;
}

export function localDescription(extra: string): string {
  return `${extra} ${SITE.name} — muebles rústicos artesanales en ${SITE.ubicacionCompleta}. Consultá por WhatsApp.`;
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: SITE.ogImage,
    telephone: SITE.whatsapp.display,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.ciudad,
      addressRegion: SITE.provincia,
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.zonasAtendidas.map((zona) => ({
      '@type': 'City',
      name: zona,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    sameAs: [`https://wa.me/${SITE.whatsapp.number}`],
  };
}

export function productSchema(producto: Producto, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    image: producto.imagen,
    material: producto.material,
    category: producto.categoria,
    url,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ARS',
      ...(producto.precio ? { price: producto.precio } : {}),
      url: `https://wa.me/${SITE.whatsapp.number}`,
      seller: {
        '@type': 'FurnitureStore',
        name: SITE.name,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
