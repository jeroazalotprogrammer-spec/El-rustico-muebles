import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Producto } from '../../lib/productos';
import { formatPrecio } from '../../lib/productos';
import { buildWhatsAppUrl, productWhatsAppMessage } from '../../lib/whatsapp';

interface Props {
  producto: Producto;
}

export default function ProductoCardMui({ producto }: Props) {
  const whatsappUrl = buildWhatsAppUrl(productWhatsAppMessage(producto.nombre));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box component="a" href={`/producto/${producto.slug}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="220"
          image={producto.imagen}
          alt={producto.nombre}
          sx={{ objectFit: 'cover' }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Chip label={producto.categoria} size="small" sx={{ mb: 1.5 }} />
        <Typography
          component="a"
          href={`/producto/${producto.slug}`}
          variant="h6"
          sx={{ textDecoration: 'none', color: 'text.primary', display: 'block', mb: 1 }}
        >
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {producto.descripcion}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Material: {producto.material}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
        {producto.precioConsultar || producto.precio === null ? (
          <Typography variant="body2" fontWeight={700} color="secondary.main">
            Consultar precio
          </Typography>
        ) : (
          <Typography variant="h6" fontWeight={700}>
            {formatPrecio(producto.precio)}
          </Typography>
        )}

        <Button
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="success"
          size="small"
          startIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          }
          sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#1fb855' } }}
        >
          Consultar
        </Button>
      </CardActions>
    </Card>
  );
}
