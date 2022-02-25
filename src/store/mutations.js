import storage from '../utils/storage'
export default {
  // 将commit进来的res赋值给state
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo',userInfo)
  }
}