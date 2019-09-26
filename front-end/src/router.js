import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import(/* webpackChunkName: "home" */ './views/UserInfo.vue')
        },
        {
          path: 'weeklylist',
          name: 'weeklylist',
          component: () => import(/* webpackChunkName: "home" */ './views/WeeklyList.vue')
        }
      ]
    }
  ]
})
