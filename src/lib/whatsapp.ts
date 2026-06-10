import { SITE } from './site';

export function buildWhatsAppUrl(mensaje?: string): string {
  const base = `https://wa.me/${SITE.whatsapp.number}`;
  if (!mensaje) return base;
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}

export function productWhatsAppMessage(nombre: string): string {
  return `Hola, me interesa el producto "${nombre}" que vi en ${SITE.name}. ¿Podrían darme más información?`;
}

export const WHATSAPP_DISPLAY = SITE.whatsapp.display;
