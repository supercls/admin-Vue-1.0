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
			{ path: '/dashboard', component: _import('dashboard/index'),name:'大数据' },
			{ path: '/aloneDilog', component: _import('headerUpload/index'),name:'修改头像' }
		]
	},
	{
		path: '/admin',
		component: Layout,
		redirect: '/quanxian/index',
		name: '权限',
		hidden: true,
		icon: 'fa-dedent',
		children: [
			{ path: 'index',component: _import('quanxian/index'), name: '测试'},
			{ path: 'editor',component: _import('quanxian/editor'), name: '测试1'},
		]
	},
	{
		path: '/quanxian1',
		component: Layout,
		redirect: '/quanxian1/index',
		name: '权限1',
		hidden: true,
		icon: 'fa-wechat',
		children: [
			{ path: 'index', component: _import('quanxian1/index'), name: '测试2' },
		]
	},
	{
		path: '/quanxian2',
		component: Layout,
		redirect: '/quanxian2/index',
		name: '权限2',
		hidden: true,
		icon: 'fa-calculator',
		noDropdown: false,
		children: [
			{ path: 'index', component: _import('quanxian2/index'), name: '测试3' },
		]
	},
	{   																							//系统管理
		path: '/sys',
		component: Layout,
		redirect: 'noredirect',
		name: '系统管理',
		hidden: true,
		icon: 'fa-bar-chart',
		children: [
			{ path: '/sys/operaterole/list', name: '角色管理', icon: 'zonghe', component: _import('sys/operaterole/list')},
			{ path: '/sys/operateuser/list', name: '人员管理', icon: 'zonghez', component: _import('sys/operateuser/list')},
			{ path: '/sys/operatemenu/list', name: '菜单管理', icon: 'zonghez', component: _import('sys/operatemenu/list')},
			{ path: '/sys/dictbase/list', name: '字典管理', icon: 'zonghez', component: _import('sys/dictbase/list')},
		]
	},
	{
		path: '/table',
		component: Layout,
		redirect: 'noredirect',
		name:'表格',
		hidden: true,
		icon: 'fa-krw',
		noDropdown: true,
		children: [
			{ 
				path: 'sanji',
				redirect: '/table/sanji/zhanghu',
				name: 'table1', 
				component:_import('table/zhanghu/zhanghu'),
				children:[
					{
						path:'/table/sanji/zhanghu',name:'三级菜单',component:_import('table/zhanghu/zhanghu')
					}
				]},
			{ path: '/table/index', name: 'table', component: _import('table/index')},
			{ path: '/table/upload', name: 'upload', component: _import('table/a')}
		]
	},
	{
		path:'/echarts',
		component: Layout,
		redirect: '/echarts/index',
		name:'echarts',
		hidden: true,
		icon: 'fa-krw',
		noDropdown: true,
		children:[
			{path:'/echarts/index',name: 'echarts', component: _import('echarts/index')}
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