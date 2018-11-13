const api = require('../controllers/todolist')
const Router = require('koa-router')

const routes = new Router()

routes.get('/todolist/:id', api.getTodolist)
routes.post('/todolist', api.createTodolist)
routes.put('/todolist/:userId/:id/:status', api.updateTodolist)
routes.delete('/todolist/:userId/:id', api.removeTodolist)

module.exports = routes
