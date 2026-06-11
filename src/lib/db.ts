import { neon } from '@neondatabase/serverless';
import productosData from '../data/productos.json';
import type { Producto } from './productos';

interface ProductoRow {
  slug: string;
  nombre: string;
  categoria: string;
  precio: number | null;
  precio_consultar: boolean;
  destacado: boolean;
  descripcion: string;
  imagen: string;
  material: string;
}

function mapRow(row: ProductoRow): Producto {
  return {
    slug: row.slug,
    nombre: row.nombre,
    categoria: row.categoria,
    precio: row.precio,
    precioConsultar: row.precio_consultar,
    destacado: row.destacado,
    descripcion: row.descripcion,
    imagen: row.imagen,
    material: row.material,
  };
}

export function getProductosFromJson(): Producto[] {
  return productosData as Producto[];
}

export function isNeonConfigured(): boolean {
  return Boolean(import.meta.env.DATABASE_URL);
}

export async function fetchProductos(): Promise<Producto[]> {
  const databaseUrl = import.meta.env.DATABASE_URL;

  if (!databaseUrl) {
    return getProductosFromJson();
  }

  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      SELECT slug, nombre, categoria, precio, precio_consultar, destacado, descripcion, imagen, material
      FROM productos
      ORDER BY destacado DESC, nombre ASC
    `;

    if (!rows.length) {
      return getProductosFromJson();
    }

    return rows.map((row) => mapRow(row as ProductoRow));
  } catch {
    return getProductosFromJson();
  }
}
