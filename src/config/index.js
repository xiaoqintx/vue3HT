/* 环境配置封装 */

 const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev:{
    baseApi:'/api',
    mockApi:'https://www.fastmock.site/mock/eb6a03f3fc0df7e78861aca4fd82bf5b/api'
  },
  test: {
      baseApi: '/test.future.com/api',
      mockApi: 'https://www.fastmock.site/mock/eb6a03f3fc0df7e78861aca4fd82bf5b/api'
  },
  prod: {
      baseApi: '//future.com/api',
      mockApi: 'https://www.fastmock.site/mock/eb6a03f3fc0df7e78861aca4fd82bf5b/api'
  }
}
// 暴露
export default {
  env,
  // mock: true,
  ...EnvConfig[env],
  namespace: 'qin'
}
