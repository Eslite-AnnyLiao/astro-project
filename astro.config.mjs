// @ts-check
import fs from 'fs';
import { defineConfig } from 'astro/config';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { compression } from 'vite-plugin-compression2';
import topLevelAwait from 'vite-plugin-top-level-await';

import vue from '@astrojs/vue';


let serverOptions = {};
try {
  const keyPath = path.resolve(process.cwd(), 'server.key');
  const certPath = path.resolve(process.cwd(), 'server.crt');
  
  serverOptions = { 
    https: { 
      key: fs.readFileSync(keyPath), 
      cert: fs.readFileSync(certPath)
    } 
  };
} catch (error) {
  console.log('HTTPS certificates not found, using HTTP');
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app',
    }),
  ],

  vite: {
    server: {
      https: serverOptions.https ? {
        key: serverOptions.https.key,
        cert: serverOptions.https.cert
      } : false,
    },
    plugins: [
      legacy({
        targets: ['defaults', 'ie >= 11', 'chrome 44', 'iOS 12'],
        // modernTarget: ['edge>=79, firefox>=67, chrome>=64, safari>=12, chromeAndroid>=64, iOS>=12'], // default 值
        modernPolyfills: [
          'es.object.has-own',
          'esnext.global-this',
          'esnext.string.match-all',
          'web.dom-collections.for-each',
        ],
        renderLegacyChunks: true,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // polyfills 相關 keyword 查閱: https://github.com/zloirock/core-js
        polyfills: [
          'es.array.find-last-index',
          'es.array.filter',
          'es.array.for-each',
          'es.array.some',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.entries',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.has-own',
          'es.object.keys',
          'es.object.to-string',
          'es.object.values',
          'es.promise.finally',
          'es.promise',
          'es.string.starts-with',
          'es.symbol',
          'es/map',
          'es/set',
          'esnext.global-this',
          'esnext.string.match-all',
          'web.dom-collections.for-each',
        ],
      }),
      compression({
        include: [/.*\.(js|css|html)$/],
        exclude: [/.*\.map$/],
        threshold: 10 * 1240, // kb
        algorithm: 'brotliCompress',
        compressionOptions: { level: 11 },
        deleteOriginalAssets: false,
        skipIfLargerOrEqual: true,
        filename: '[path][base].br',
        verbose: true,
      }),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData: `
          @use 'sass:math';
          @import '@/assets/mixins/global-variable.scss';
          @import '@/assets/mixins/mixins.scss';
          @import '@/assets/functions/main.scss';
        `,
          // `swiper/swiper-bundle.css`,
        },
      },
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@/': path.resolve(process.cwd(), 'src') + '/',
      },
    },
  },
  server: {
    port: 3000,
    // hmr: { overlay: false },
  },
  // localhost use `dist` folder
  preview: {
    port: 8080,
  },
});
