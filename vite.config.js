import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        port: 5173,
        strictPort: true, // Mengunci agar tetap di port 5173
        host: '127.0.0.1',
        origin: 'http://127.0.0.1:5173',
        cors: true,
        hmr: {
            host: '127.0.0.1',
        },
    },
    resolve: {
        alias: {
            // Alias standar untuk folder resources/js
            '@': path.resolve(__dirname, './resources/js'),

            // Tambahkan baris ini untuk menangani error gambar dari Figma Make
            'figma:asset': path.resolve(__dirname, './resources/js/assets'),
        },
    },
});
