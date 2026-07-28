import { defineConfig } from '#q-app/wrappers';

export default defineConfig(() => {
  return {
    boot: [],

    css: ['app.css'],

    extras: [],

    build: {
      target: { browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'] },
      vueRouterMode: 'history',
      publicPath: process.env.PUBLIC_PATH || '/',
      typescript: { strict: true },
    },

    devServer: {
      open: false,
      port: 9100,
    },

    framework: {
      config: {},
      lang: 'pt-BR',
      plugins: [],
    },

    animations: [],

    ssr: { pwa: false },
    pwa: {},
    cordova: {},
    capacitor: { hideSplashscreen: true },
    electron: { inspectPort: 5858, bundler: 'packager' },
    bex: { extraScripts: [] },
  };
});
