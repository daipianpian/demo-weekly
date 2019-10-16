import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import('./views/Login.vue'),
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
          component: () => import(/* webpackChunkName: "user" */ './views/User/User.vue'),
          meta: { pagePath: '/home/user' }
        },
        {
          path: 'weekly',
          name: 'weekly',
          component: () => import(/* webpackChunkName: "weekly" */ './views/Weekly/Weekly.vue'),
          meta: { pagePath: '/home/weekly' }
        },
        {
          path: 'weeklyadd',
          name: 'weeklyadd',
          component: () => import(/* webpackChunkName: "weekly" */ './views/Weekly/childViews/WeeklyAdd.vue'),
          meta: { pagePath: '/home/weekly' }
        },
        {
          path: 'weeklyedit',
          name: 'weeklyedit',
          component: () => import(/* webpackChunkName: "weekly" */ './views/Weekly/childViews/WeeklyEdit.vue'),
          meta: { pagePath: '/home/weekly' }
        },
        {
          path: 'weeklydetail',
          name: 'weeklydetail',
          component: () => import(/* webpackChunkName: "weekly" */ './views/Weekly/childViews/WeeklyDetail.vue'),
          meta: { pagePath: '/home/weekly' }
        }
      ]
    },
    {
      path: '/refresh',
      component: () => import(/* webpackChunkName: "home" */ './views/Refresh.vue'),
      name: 'Refresh'
    }
  ]
})
