import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//公共样式
import './style_less/default.less'
import './style_less/background.less'
import '../src/style_less/header_footer.less'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import BaiduMap from 'vue-baidu-map'
import CanvasNextJS from 'canvas-nest.js'

import axios from './axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(BaiduMap, {
  ak: 'ZHavbHCLCfVtcpWAh3Pby0seTOGPurWS'
})

Vue.config.productionTip = false

const config = {
  color: '255,0,0',
  count: 200,
  zIndex:100
};
const cnj = new CanvasNextJS(document.getElementById("app"),config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')