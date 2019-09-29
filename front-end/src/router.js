import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { pagePath: '/' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: { pagePath: '/home' },
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "home" */ './views/User.vue'),
          meta: { pagePath: '/home/user' }
        },
        {
          path: 'weekly',
          name: 'weekly',
          component: () => import(/* webpackChunkName: "home" */ './views/Weekly.vue'),
          meta: { pagePath: '/home/weekly' }
        },
        {
          path: 'weeklydetails',
          name: 'weeklydetails',
          component: () => import(/* webpackChunkName: "home" */ './views/WeeklyDetails.vue'),
          meta: { pagePath: '/home/weekly' }
        }
      ]
    }
  ]
})
