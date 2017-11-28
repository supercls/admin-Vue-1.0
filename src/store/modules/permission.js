import { constantRouterMap} from '@/router'

/*** 通过meta.role判断是否与当前用户权限匹配* @param roles* @param route*/
// function hasPermission(roles, route) {
//   //console.log(route.meta.role)
//   //console.log(roles.length)   //roles用户对应权限
//   var roleArr=[];               //空数组存储用户菜单权限
//   var childrenArr=[]            //存储二级菜单权限
//   for(var i=0;i<roles.length;i++){
//   	roleArr.push(roles[i].menuList)
//   }
//   for(var i=0;i<roles.length;i++){
//   	childrenArr.push(roles[i].childList)
//   }
//   console.log(route)
//   // if(route.children){
//   // 	console.log(route.children)
//   // }
// 	if(route.meta && route.meta.role && route.redirect){ //如果路由设置里有meta标签并且拥有role属性则
//     //console.log(roles.indexOf(route.meta.role) >= 0)
//     //return route.meta.role.indexOf(roles) >= 0  判断角色
//     console.log(route)
//     return  roleArr.indexOf(route.meta.role) >= 0
//   }
//   else if(route.child){
//   	 console.log(childrenArr.indexOf(route.meta.role) >= 0)
//   	// console.log(childrenArr)
//     return  childrenArr.indexOf(route.meta.role) >= 0
//   }
//   else {
//   	return true
//   }
//   //console.log(roles)
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//       	console.log(roles)
//         //route.children = filterAsyncRouter(route.children, roles)
//         console.log(route.children)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
/* layout */
import Layout from '../../views/layout/Layout'
const permission = {
	state: {
		routers: constantRouterMap,
		addRouters: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {        //生成路由表
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		}
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(function(resolve){   //得到路由列表，包括所有权限路由和子路由
				// const { roles } = data
				// console.log(roles)
				// let accessedRouters
				// if (roles.indexOf('admin') >= 0) {   //是admin权限,则拥有所有权限
				//   accessedRouters = asyncRouterMap
				// } else {                            //不是则执行下面函数  filter是就返回元素，错就没有
				// 	for(var i=0;i<roles.length;i++){
				// 		accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
				// 	}
				//   console.log(accessedRouters)
				// }
				// commit('SET_ROUTERS', accessedRouters)  //提交
				// resolve()
				/*根据后台返回数据生成路由表*/

				const { roles } =data;
				var newRoutes=[];
				roles.map((item, index) => {
					newRoutes.push({
						path:item.path,
						component: Layout,
						name: item.name,
						icon:item.icon,
						children:item.children
					})
				})
				commit('SET_ROUTERS',newRoutes)
				resolve()
			})
		}
	}
}

export default permission
