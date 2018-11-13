const db = require('../config/db')
const userModel = '../schema/user.js'

const TodolistDb = db.Todolist

const User = TodolistDb.import(userModel)

const getUserById = async function (id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })
  return userInfo
}

const postRegister = async function (data) {
  await User.create({
    // id: data.id,
    user_name: data.username,
    password: data.password
  })
  return true
}

const getUserByName = async function (name) {
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  })
  return userInfo
}

module.exports = {
  getUserById,
  getUserByName,
  postRegister
}
