// 引入本地存储的命名空间
import config from '../config'

// 暴露二次封装的localStorage
export default {
  // 第一步获取本地存储的命名空间的值
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  // 第二步 设置本地存储的值
  setItem(key, value) {
    let storage = this.getStorage()
    // 传入的value赋值给key，以后查key显示value
    storage[key] = value
    // 重新设置
    window.localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  // 第三步 读取
  getItem(key) {
    return this.getStorage()[key]
  },
  // 第四步 清除一个
  clear(key) {
    delete this.getStorage()[key]
    window.localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  // 第五步 清除全部
  clearAll() {
    window.localStorage.clear()
  }
}