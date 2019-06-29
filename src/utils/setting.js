import Cookies from 'js-cookie'
const userSetting = 'User-Setting'

export function getUserSetting() {
  return Cookies.get(userSetting)
}

export function setUserSetting(value) {
  return Cookies.set(userSetting, value)
}

export function removeUserSetting() {
  return Cookies.remove(userSetting)
}
