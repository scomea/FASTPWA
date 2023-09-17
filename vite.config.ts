import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// import resolve from "@rollup/plugin-node-resolve";
// import svgo from 'rollup-plugin-svgo';
// import commonjs from '@rollup/plugin-commonjs';
// import {svgLoader} from './svg-loader';

const parserOptions = {
	sourceType: "module"
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 4,
    sourcemap: true,
    assetsDir: "code",
    // rollupOptions: {
    //   plugins: [
    //     svgLoader()
    //   ],
    // }
  },
  plugins: [
    VitePWA({
      // you can remove base and scope pwa plugin will use the base on vite: defaults to /
      base: "/",
      scope: "/",
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,png,jpg}'
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-libs-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
