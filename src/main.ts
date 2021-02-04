import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/styles/index.scss'
// @ts-ignore
import config from '../my.config.js'


Vue.prototype.$dataServer = config.serverFile;

const ax = axios.create({
    baseURL: `http://${location.hostname}:${config.serverFile.port}/`,
    headers: {
      "Content-type": "application/json"
    }
});

Vue.use(VueAxios, ax)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
