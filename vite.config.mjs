import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default defineConfig({

    resolve: {
        alias: {
            '@engine': path.resolve(__dirname, 'src/game/engine'),
        },
    },

    plugins: [
        react(),
        svgrPlugin()
    ],

    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
                silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
            },
        }
    },

    server: {
        port: 3000,
    },

    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/vitest/vitest.setup.ts',
    }
})
