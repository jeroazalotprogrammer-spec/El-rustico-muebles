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
);

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos (categoria);
CREATE INDEX IF NOT EXISTS idx_productos_destacado ON productos (destacado);
