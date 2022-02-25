// 引入二次封装axios
import request from "../utils/request";
// 获取登录的数据
export default {
  // 登录接口
  reqLogin (params) {
    return request({
      url: "/users/login",
      method: "post",
      data: params,
      // 局部关闭/开启mock
      // mock: true,
    });
  },
  // 审批接口
  reqNoticeCount() {
    return request({
      url: "/leave/count",
      method: "get",
      data: {},
      mock:true
  })
},
  // 菜单列表接口
  reqMenuList() {
    return request({
      url: "/menu/list",
      method: "get",
      data: {},
      mock:true
  })
  }
}

