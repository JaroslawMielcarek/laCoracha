import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles.css'

createApp(App)
  .use(router)
  .use(store)
  .use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
    );
    
    next();
  })
  .mount('#app')
