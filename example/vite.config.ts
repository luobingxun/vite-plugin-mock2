import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mock from '../src/index';
import mock from 'vite-plugin-mock3';

export default defineConfig({
  plugins: [mock(), react()]
});
