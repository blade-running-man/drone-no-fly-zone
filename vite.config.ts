import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve as pathResolve } from 'path';

const resolve = (path: string) => pathResolve(__dirname, path);
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  base: '/drone-no-fly-zones/',
});
