import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
	{ path: '/login', component: _import('login/index'), hidden: true },
	{ path: '/register', component: _import('register/index'), hidden: true },
	{ path: '/404', component: _import('404'), hidden: true },
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		hidden: true,
		name: '大数据',
		children: [
			{ path: '/listsNum', component: _import('dashboard/index'),name:'大数据' },
			{ path: '/dashboard', component: _import('home/index'),name:'home' },

		]
	},
/*******系统管理********/
	{
		path: '/sys',
		component: Layout,
		redirect: 'noredirect',
		name: '系统管理',
		hidden: true,
		icon: 'fa-bar-chart',
		children: [
			{ path: '/sys/operaterole/list', name: '角色管理', icon: 'fa-calculator', component: _import('sys/operaterole/list')},
			{ path: '/sys/operateuser/list', name: '人员管理', icon: 'fa-calculator', component: _import('sys/operateuser/list')},
			{ path: '/sys/operatemenu/list', name: '菜单管理', icon: 'fa-calculator', component: _import('sys/operatemenu/list')},
			{ path: '/sys/dictbase/list', name: '字典管理', icon: 'fa-calculator', component: _import('sys/dictbase/list')},
		]
	},
/********品牌商品*********/
	{
		path: '/commodity',
		component: Layout,
		redirect: 'noredirect',
		name: '品牌商品',
		hidden: true,
		icon: 'fa-bar-chart',
		children: [
			{ path: '/commodity/product/list', name: '商品管理', icon: 'fa-calculator', component: _import('commodity/product/list')},
			{ path: '/commodity/product/add', component: _import('commodity/product/add'),name:'新增商品' },
			{ path: '/commodity/product/editor', component: _import('commodity/product/editor'),name:'编辑商品' },
			{ path: '/commodity/product/save', component: _import('commodity/product/save'),name:'保存商品' },
			{ path: '/commodity/categoryList/list', name: '分类管理', icon: 'fa-calculator', component: _import('commodity/categoryList/list')},
		]
	},
/*******店铺********/
	  {
		path: '/merchant',
		component: Layout,
		redirect: 'noredirect',
		name: '店铺',
		hidden: true,
		icon: 'fa-shopping-cart',
		children: [
		  { path: '/merchant/seller/list', name: '卖家信用', icon: 'fa-calculator', component: _import('merchant/seller/list')},
		  { path: '/merchant/merchantManage/list', name: '店铺管理', icon: 'fa-calculator', component: _import('merchant/merchantManage/list')},
		]
	  },
	{ path: '*', redirect: '/404', hidden: true }
]

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})
export const asyncRouterMap=[       //异步路由
	{ path: '*', redirect: '/404', hidden: true }
]