import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('Falta DATABASE_URL. Configurala en .env antes de ejecutar npm run db:seed');
  process.exit(1);
}

const productos = JSON.parse(readFileSync(join(__dirname, '../src/data/productos.json'), 'utf8'));
const sql = neon(databaseUrl);

console.log('Creando tabla productos...');
await sql`
  CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio INTEGER,
    precio_consultar BOOLEAN NOT NULL DEFAULT false,
    destacado BOOLEAN NOT NULL DEFAULT false,
    descripcion TEXT NOT NULL,
    imagen TEXT NOT NULL,
    material VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

console.log(`Insertando ${productos.length} productos...`);

for (const producto of productos) {
  await sql`
    INSERT INTO productos (
      slug, nombre, categoria, precio, precio_consultar, destacado, descripcion, imagen, material
    ) VALUES (
      ${producto.slug},
      ${producto.nombre},
      ${producto.categoria},
      ${producto.precio},
      ${producto.precioConsultar},
      ${producto.destacado},
      ${producto.descripcion},
      ${producto.imagen},
      ${producto.material}
    )
    ON CONFLICT (slug) DO UPDATE SET
      nombre = EXCLUDED.nombre,
      categoria = EXCLUDED.categoria,
      precio = EXCLUDED.precio,
      precio_consultar = EXCLUDED.precio_consultar,
      destacado = EXCLUDED.destacado,
      descripcion = EXCLUDED.descripcion,
      imagen = EXCLUDED.imagen,
      material = EXCLUDED.material
  `;
}

console.log('Base de datos Neon lista.');
