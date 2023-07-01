import { createApp } from 'vue';
import { registerMicroApps, start } from 'qiankun';
import App from './App.vue';
import AppLoading from './components/common/app-loading.vue';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupI18n } from './locales';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount('#appLoading');

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);

  setupI18n(app);

  appLoading.unmount();
  // mount app
  app.mount('#app');
  registerMicroApps([
    {
      entry: 'http://localhost:8081',
      container: '#nvwa',
      name: 'nvwa',
      activeRule: '/nvwa'
    },
    {
      entry: 'http://localhost:3001',
      container: '#xingtian',
      name: 'xingtian',
      activeRule: '/xingtian',
      props: {
        routerBase: '/xingtian'
      }
    }
  ]);
  start();
}

setupApp();
