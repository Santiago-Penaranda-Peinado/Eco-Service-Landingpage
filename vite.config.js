// vite.config.js

import { resolve } from 'path';
import { defineConfig } from 'vite';

// Este es el archivo de configuración de Vite.
// Lo que pongas aquí sobreescribe el comportamiento por defecto.

export default defineConfig({
  build: {
    rollupOptions: {
      // Aquí le decimos a Vite que tu sitio tiene MÁS DE UNA página (HTML).
      input: {
        // 'main' es un nombre que le damos a la entrada principal.
        // resolve(...) crea la ruta correcta al archivo.
        main: resolve(__dirname, 'index.html'),

        // 'gracias' es el nombre que le damos a la segunda página.
        // Apunta a tu archivo gracias.html que debe estar en la raíz.
        gracias: resolve(__dirname, 'gracias.html'),
      },
    },
  },
});