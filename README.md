# Invitación de boda · Samuel y Sofía

Invitación web interactiva, con un **link público ilimitado** (sin cupo de visitas). Estética de atardecer en Casa Vulkan, al pie del volcán de San Salvador.

## Link ilimitado

- Local: [http://localhost:3000](http://localhost:3000)
- Canónico para compartir: `/i/samuel-sofia`

Al publicar en Vercel (gratis), esa misma ruta es el link que se manda por WhatsApp. Cualquiera puede abrirla las veces que quiera.

## Cómo correrlo

```bash
npm install
npm run dev
```

## Dónde editar los datos

Todo el contenido vive en `src/lib/wedding.ts`: nombres, fecha, lugar, itinerario, vestimenta, mesa de regalos y WhatsApp de los anfitriones.

Fotos de galería: pongan `01.jpg`, `02.jpg`… en `public/gallery` (la pila polaroid hoy usa piezas ilustradas de placeholder).

## RSVP

El formulario guarda confirmaciones en `data/rsvps.jsonl` cuando el proyecto corre en un servidor con disco (su máquina). En Vercel el disco no persiste: para producción hay que conectar Supabase o usar el WhatsApp de `wedding.rsvp.hostWhatsApp`.

## Stack

Next.js + TypeScript + Tailwind CSS. Una sola página tipo tarjeta (como Invitio), pensada primero para celular.
