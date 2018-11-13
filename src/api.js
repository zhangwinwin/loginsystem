import axios from 'axios'

// api路径
const HOST = 'http://52.80.172.73'

// 设置全局axios默认值
axios.defaults.timeout = 5000 // 5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

export function fetch (url, method = 'GET', params = '') {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: HOST + url,
      params: params
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  /**
   * 用户登录
   * @param {any} obj
   * @returns
   */
  Login (params) {
    return fetch('/auth/user', 'POST', params)
  },
  Register (params) {
    return fetch('/auth/user/register', 'POST', params)
  },
  CreateTodolist (params) {
    return fetch('/api/todolist', 'POST', params)
  },
  PutTodolist (usrId, id, status) {
    return fetch(`/api/todolist/${usrId}/${id}/${status}`, 'PUT')
  },
  DelTodolist (userId, id) {
    return fetch(`/api/todolist/${userId}/${id}`, 'DELETE')
  },
  GetTodolist (userId) {
    return fetch(`/api/todolist/${userId}`, 'GET')
  }
}
