import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mock from '../src/index';

export default defineConfig({
  plugins: [mock(), react()]
});
