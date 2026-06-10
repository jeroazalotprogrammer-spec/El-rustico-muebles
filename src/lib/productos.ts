import productosData from '../data/productos.json';

export interface Producto {
  slug: string;
  nombre: string;
  categoria: string;
  precio: number | null;
  precioConsultar: boolean;
  destacado: boolean;
  descripcion: string;
  imagen: string;
  material: string;
}

export const productos: Producto[] = productosData as Producto[];

export const categorias = [...new Set(productos.map((p) => p.categoria))].sort();

export function getProductoBySlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio);
}
