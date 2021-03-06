import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import  '../src/JS/clickLove'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//公共样式
import './style_less/default.less'
import './style_less/background.less'
import '../src/style_less/header_footer.less'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import BaiduMap from 'vue-baidu-map'

import axios from './axios'

Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(BaiduMap, {
    ak: 'ZHavbHCLCfVtcpWAh3Pby0seTOGPurWS'
})

Vue.config.productionTip = false

let token = document.cookie

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')