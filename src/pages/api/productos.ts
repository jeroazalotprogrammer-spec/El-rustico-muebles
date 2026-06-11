import type { APIRoute } from 'astro';
import { fetchProductos, isNeonConfigured } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  const productos = await fetchProductos();

  return new Response(
    JSON.stringify({
      source: isNeonConfigured() ? 'neon' : 'json',
      productos,
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  );
};
