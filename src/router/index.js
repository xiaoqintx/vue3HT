import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../components/Home.vue'

// 定义路由规则
const routes = [{
  name: 'home',
  path: '/',
  meta: {
    title: '首页'
  },
  component: Home,
  redirect: '/welcome',
  children: [{
    name: 'welcome',
    path: '/welcome',
    meta: {
      title: '欢迎页'
    },
    component: () => import('../views/Welcome.vue')
  }]
},
{
  name: 'login',
  path: '/login',
  meta: {
    title: '登录页'
  },
  component: () => import('../views/Login.vue')
}
]

// 暴露路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router