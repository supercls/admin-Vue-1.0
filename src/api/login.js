import service from '@/utils/fetch'
export function login(userName, userPwd) {       //fetch  promise用法
  return service({
    url: 'loginCheck',
    method: 'post',
    data: {
      userName,
      userPwd
    }
  })
}

export function getInfo(token) {
  return service({
    url: 'info',
    method:'post',
    params: { token }
  })
}

export function logout() {
  return service({
    url: '/user/loginout',
    method: 'post'
  })
}