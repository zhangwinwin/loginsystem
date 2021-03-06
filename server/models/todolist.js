const db = require('../config/db')
const todoModel = '../schema/list.js' // 引入todolist的表结构
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel)
const getTodolistById = async function (id) {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status']
  })
  return todolist
}

const createTodolist = async function (data) {
  data.status === 'false' ? data.status = 0 : data.status = 1
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  })
  return true
}

const removeTodolist = async function (id, userId) {
  const result = await Todolist.destroy({
    where: {
      id,
      user_id: userId
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateTodolist = async function (id, userId, status) {
  const result = await Todolist.update({ status }, {
    where: {
      id,
      user_id: userId
    }
  })
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
