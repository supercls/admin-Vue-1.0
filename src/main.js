import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken} from '@/utils/auth'
Vue.use(ElementUI)

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, 				// 请求超时时间
})
//service.defaults.withCredentials = true  //请求开启cookie
// request拦截器
service.interceptors.request.use(config => {
	//console.log($.isEmptyObject(_g.useSessions()))  //判断对象是否为空
  if (store.getters.token) {
	config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /*** code为非0是抛错 可结合自己业务进行修改*/
	const res = response.data
	if (res.code != 0 && res.code) {
	  Message({
		message: res.message,
		type: 'error',
		showClose: true,
		duration: 5 * 1000
	  })
	  // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
	  if (res.code == 1001 || res.code == 50012 || res.code == 50014) {
		MessageBox.confirm('你已被登出或者登录已过期，可以取消继续留在该页面，或者重新登录', '需要重新验证身份', {
		  confirmButtonText: '重新登录',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
		  store.dispatch('FedLogOut').then(() => {
			location.reload()   // 为了重新实例化vue-router对象 避免bug
		  })
		})
	  }
	  return Promise.reject('error')
	} else {
		return response.data
	}
  },
  error => {
	console.log('err' + error)// for debug
	Message({
	  message: error.message,
	  type: 'error',
	  showClose: true,
	  duration: 5 * 1000
	})
	return Promise.reject(error)
  }
)

Vue.prototype.service=service         //注册全局service

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
