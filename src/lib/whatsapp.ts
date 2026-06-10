const WHATSAPP_NUMBER = '5493876408322';

export function buildWhatsAppUrl(mensaje?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!mensaje) return base;
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}

export function productWhatsAppMessage(nombre: string): string {
  return `Hola, me interesa el producto "${nombre}" que vi en El Rústico. ¿Podrían darme más información?`;
}

export const WHATSAPP_DISPLAY = '+54 9 3876 408322';
