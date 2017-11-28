import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const DStoken='save-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getDstoken(){
  return Cookies.get(DStoken)
}


export function setDstoken(token) {
  return Cookies.set(DStoken, token)
}

export function removeDstoken() {
  return Cookies.remove(DStoken)
}