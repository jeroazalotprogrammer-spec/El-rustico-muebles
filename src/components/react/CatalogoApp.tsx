import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import type { Producto } from '../../lib/productos';
import MuiProvider from './MuiProvider';
import ProductoCardMui from './ProductoCardMui';

interface Props {
  productos: Producto[];
  categorias: string[];
  initialCategoria?: string | null;
  dataSource: 'neon' | 'json';
}

function CatalogoContent({ productos, categorias, initialCategoria = null, dataSource }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(initialCategoria ?? 'Todos');
  const [material, setMaterial] = useState('Todos');

  const materiales = useMemo(
    () => ['Todos', ...new Set(productos.map((p) => p.material))].sort(),
    [productos],
  );

  const filtrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();

    return productos.filter((producto) => {
      const matchCategoria = categoria === 'Todos' || producto.categoria === categoria;
      const matchMaterial = material === 'Todos' || producto.material === material;
      const matchBusqueda =
        !term ||
        producto.nombre.toLowerCase().includes(term) ||
        producto.descripcion.toLowerCase().includes(term) ||
        producto.categoria.toLowerCase().includes(term) ||
        producto.material.toLowerCase().includes(term);

      return matchCategoria && matchMaterial && matchBusqueda;
    });
  }, [productos, busqueda, categoria, material]);

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        {dataSource === 'neon'
          ? 'Catálogo conectado a Neon PostgreSQL.'
          : 'Catálogo en modo local (JSON). Configurá DATABASE_URL para usar Neon.'}
      </Alert>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar muebles"
          placeholder="Ej: mesa, roble, dormitorio..."
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.6 }}>
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              label="Categoría"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="material-label">Material</InputLabel>
            <Select
              labelId="material-label"
              label="Material"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            >
              {materiales.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label={`${filtrados.length} producto${filtrados.length === 1 ? '' : 's'}`}
            color="primary"
            variant="outlined"
          />
          {categoria !== 'Todos' && <Chip label={categoria} onDelete={() => setCategoria('Todos')} />}
          {material !== 'Todos' && <Chip label={material} onDelete={() => setMaterial('Todos')} />}
        </Stack>
      </Stack>

      {filtrados.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" sx={{ py: 8 }}>
          No encontramos productos con esos filtros.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtrados.map((producto) => (
            <Grid key={producto.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProductoCardMui producto={producto} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default function CatalogoApp(props: Props) {
  return (
    <MuiProvider>
      <CatalogoContent {...props} />
    </MuiProvider>
  );
}
