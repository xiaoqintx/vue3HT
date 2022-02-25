import axios from "axios";
import {ElMessage} from 'element-plus'
import router from "../router"
import config from "../config"

// 定义常量保存错误信息
const TOKEN_ERROR = 'Token认证失败,请重新登录'
const NETWORK_ERROR = '网络请求异常,请稍后重试'
// 定义axios实例
const instance  = axios.create( {
  baseURL: config.baseApi,
  // 超时
  timeout: 8000
} )
// 请求拦截
instance.interceptors.request.use(req=>{
  // 公共的请求方法
  const headers = req.headers
  if(!headers.Authorization)headers.Authorization = 'Jack'
  return req
})
// 响应拦截
instance.interceptors.response.use(res=>{
  // 处理响应结果
  const { code, data, msg } = res.data
  // 响应成功
  if( code === 200 ){
    return data
  }else if( code === 50001 ){
    // token验证失败，自动跳回登录页
    ElMessage.error(TOKEN_ERROR)
    setTimeout(() => {
      router.push('/login')
    },1500)
    return Promise.reject(new Error(TOKEN_ERROR))
  }else{
    // 网络问题
    ElMessage.error(msg||NETWORK_ERROR)
    return Promise.reject(msg||new Error(NETWORK_ERROR))
  }
})
/**
 * 请求的核心函数
 * @param {*} options  请求配置
 * @returns 
 */
function request(options) {
  // 请求方法的处理
  // 如果没有传，默认get
  options.method = options.method || 'get'
  // 统一大小写
  if(options.method.toLowerCase() === 'get'){
    // 后面组件中在调用接口的时候 传过来的都在对象的data属性中 
    options.params = options.data
  }
  // 让mock数据动态变化 将请求方法中的mock赋值给config.mock判断请求那个地址
  if(typeof options.mock !== 'undefined'){
    config.mock = options.mock
  }
  // 预防线上环境用的测试的数据
  if(config.env === 'prod'){
    instance.defaults.baseURL = config.baseApi
  }else{
    // 如果不是线上环境，看看mock是否为true
    instance.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return instance(options)
}
// 补充axios第二种写法
['get','post','delete','patch','put'].forEach(item => {
  request[item] = ( url, data, options ) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request