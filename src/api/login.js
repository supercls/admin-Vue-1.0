import service from '@/utils/fetch'
export function login(username, password) {       //fetch  promise用法
  return service({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return service({
    url: '/user/loginout',
    method: 'post'
  })
}