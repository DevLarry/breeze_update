// READ ME
// yarn add -D vite @vitejs/plugin-react @vitejs/plugin-vue

// import { defineConfig } from 'vite';
// import path from 'path';
// import react from '@vitejs/plugin-react';
// import vue from '@vitejs/plugin-vue';
//
// const cssResource = (name) => {
//   return path.join(__dirname, 'resources', 'css', name);
// };
//
// const jsResource = (name) => {
//   return path.join(__dirname, 'resources', 'js', name);
// };
//
// const jsAppResource = (appDir) => {
//   return path.join(__dirname, 'resources', 'js', 'apps', appDir, 'index.js');
// };
//
// module.exports = defineConfig({
//   build: {
//     assetsDir: 'assets',
//     outDir: path.resolve(__dirname, 'public'),
//     rollupOptions: {
//       input: {
//         app: jsResource('app.js'),
//         style: cssResource('style.css'),
//         auth: jsAppResource('auth'),
//       },
//       output: {
//         entryFileNames: 'js/[name].js',
//         chunkFileNames: 'js/[name].[hash].js',
//         assetFileNames: 'css/[name].[extname]',
//         // entryFileNames: 'js/[name].[hash].js',
//         // chunkFileNames: 'js/[name].[hash].js',
//         // assetFileNames: 'css/[name].[hash][extname]',
//       },
//     },
//   },
//   plugins: [
//     vue(),
//     react(),
//     // require('postcss')
//   ],
// });
