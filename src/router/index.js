import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import TodoList from '../components/TodoList.vue'
import Register from '../components/register.vue'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    }, {
      path: '*',
      redirect: '/'
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  if (to.path === '/') {
    if (token !== 'null' && token !== null) {
      next('/todolist')
    }
    next()
  } else if (to.path === '/register') {
    next()
  } else {
    if (token !== 'null' && token !== null) {
      // 全局设定header的token验证
      Vue.prototype.$http = axios
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      next()
    } else {
      next('/')
    }
  }
})

export default router
