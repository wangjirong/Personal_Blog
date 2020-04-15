import axios from 'axios';
import { Loading, Message } from 'element-ui'

// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = ['application/x-www-form-urlencoded', 'application/form-data'];
axios.defaults.timeout = 1000 * 10;
axios.defaults.withCredentials = true;


let loading;
function startLoading() {
    loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: "加载中...",
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    return loading && loading.close();
}
//请求拦截
axios.interceptors.request.use(config => {
    startLoading();
    const token = sessionStorage.getItem('eleToken');
    if (token)
        config.headers.Authorization = token;

    return config;

}, error => {
    return Promise.reject(error);
})


//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    Message.error(error.response.data);
    const status = error.response.status;
    if (status === 401) {
        Message.error("登录超时，请重新登录");//token过期登录超时
        sessionStorage.removeItem('eleToken');
        this.$routes.push('/login');
    }
    return Promise.reject(error);
})


export default axios