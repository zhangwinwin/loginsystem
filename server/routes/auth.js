const auth = require('../controllers/user')
const Router = require('koa-router')

const routes = new Router()

// 定义url的参数是id,用user的auth方法引入router
routes.get('/user/:id', auth.getUserInfo)
routes.post('/user', auth.postUserAuth)
routes.post('/user/register', auth.postRegister)

module.exports = routes
