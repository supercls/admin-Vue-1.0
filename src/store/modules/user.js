import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {                //定义仓库数据，状态等
  state: {
    token: getToken(),
    name: '',
    sex:'',
    avatar: '',
    roles: [],
    userIcon:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {     //处理后的数据放入数据库中
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SEX:(state,sex) => {
      state.sex= sex
    },
    SET_IMG:(state,userIcon) => {
      state.userIcon =userIcon
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {  //userinfo  传递的参数    //处理后的数据放入数据库中 Action 提交的是 mutation，而不是直接变更状态。不同于mutations使用commit方法，actions使用dispatch方法。
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve() //完成
        }).catch(error => {
          reject(error) //否决
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          console.log(data.role)
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_IMG',data.img)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
