import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-is': path.resolve('node_modules/react-is'),
      'prop-types': path.resolve('node_modules/prop-types'),
      'object-assign': path.resolve('node_modules/object-assign')
    }
  }
});
