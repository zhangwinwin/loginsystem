const todolist = require('../models/todolist')

const getTodolist = async function (ctx) {
  const id = ctx.params.id
  const result = await todolist.getTodolistById(id)
  ctx.body = {
    success: true,
    result
  }
}

const createTodolist = async function (ctx) {
  const data = ctx.request.query
  const success = await todolist.createTodolist(data)
  ctx.body = {
    success
  }
}

const removeTodolist = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  const success = await todolist.removeTodolist(id, userId)

  ctx.body = {
    success
  }
}

const updateTodolist = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  let status = ctx.params.status
  status === '0' ? status = 1 : status = 0
  const success = await todolist.updateTodolist(id, userId, status)

  ctx.body = {
    success
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
