<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
      <span class="title">
        欢迎登录
      </span>
      <el-row>
        <el-input v-model="account" placeholder="账号" type="text" name="name"></el-input>
        <el-input v-model="password" placeholder="密码" type="password" @keyup.enter.native="loginToDo"></el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
        <el-button class="btn" type="primary" @click="register">注册</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import api from '../api.js'

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    loginToDo () {
      let obj = {
        name: this.account,
        password: this.password
      }
      api.Login(obj).then((res) => {
        if (res.success) {
          sessionStorage.setItem('demo-token', res.token) // 用sessionStorage把token存下来
          this.$message({
            // 登录成功,显示提示语
            type: 'success',
            message: '登录成功!'
          })
          this.$router.push('/todolist')
        } else {
          this.$message.error(res.info)
          sessionStorage.setItem('demo-token', null) // token清空
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('请求错误!')
        sessionStorage.setItem('demo-token', null)
      })
      this.$router.push('/todolist')
    },
    register () {
      console.log(111)
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.content{
  padding: 16px;
}
.title{
  font-size: 28px;
}
.el-input{
  margin: 12px 0;
}
.el-button{
  width: 100%;
  margin-top: 12px;
}
.btn{
  position: absolute;
  left: 0;
  right: 0;
}
</style>
