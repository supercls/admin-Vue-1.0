import { constantRouterMap} from '@/router'
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
