import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

// @ts-ignore
import App from './App.vue'
// 不封装axios请求 数据乱
/* import axios from 'axios'
import config from './config'
axios.get(config.mockApi + '/login').then(res=>{
  console.log(res);
}) */
// 二次封装axios后，数据规范
import request from './utils/request'
// 二次封装localStorage
import storage from './utils/storage'
// 引入api登录接口
import api from "./api/index"
// 引入store并且注册
import store from "./store"

const app = createApp(App)
// 全局注册
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
app.use(router).use(ElementPlus).use(store).mount('#app')
// 测试dev环境
// console.log("环境变量", import.meta.env);
