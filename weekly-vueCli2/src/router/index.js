import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Weekly from '@/components/Weekly'
import WeeklyDatil from '@/components/WeeklyDatil'
import EditWeekly from '@/components/EditWeekly'
import AddWeekly from '@/components/AddWeekly'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [
				{
					path: 'admin',
					name: 'Admin',
					component: Admin
				},
				{
					path: 'weekly',
					name: 'Weekly',
					component: Weekly,
				},
				{
					path: 'weekly-datil',
					name: 'WeeklyDatil',
					component: WeeklyDatil
				},
				{
					path: 'edit-weekly',
					name: 'EditWeekly',
					component: EditWeekly
				},
				{
					path: 'add-weekly',
					name: 'AddWeekly',
					component: AddWeekly
				}
			]
		},
		{
			path: '*',
			name: 'NotFound',
			component: NotFound
		}
	]
})
