import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './default.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import BaiduMap from 'vue-baidu-map'

import axios from './axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue. use(BaiduMap,
  { ak: 'ZHavbHCLCfVtcpWAh3Pby0seTOGPurWS' })
  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
