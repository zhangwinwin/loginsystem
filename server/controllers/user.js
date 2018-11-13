const user = require('../models/user')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const getUserInfo = async function (ctx) {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  ctx.body = result // 把获取用户信息的方法暴露出去
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.query
  const userInfo = await user.getUserByName(data.name)
  if (userInfo !== null) {
    if (data.password !== userInfo.password) { // 验证密码是否正确
      ctx.body = {
        success: false,
        info: '密码错误!'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'
      const token = jwt.sign(userToken, secret) // 指定密钥,这是之后用来判断token合法性的标志
      ctx.body = {
        success: true,
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在'
    }
  }
}

const postRegister = async function (ctx) {
  const data = ctx.request.query
  console.dir(data)
  const userInfo = await user.getUserByName(data.username)
  if (userInfo) {
    ctx.body = {
      success: false,
      info: '用户已存在'
    }
  } else {
    const success = await user.postRegister(data)
    ctx.body = {
      success
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth,
  postRegister
}
