<template>
  <el-row class="content">
    <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 8}">
      <span>
        欢迎: {{name}}!你的待办事项是:
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == 0" :key="index">
                  <span class="item">
                    {{index + 1}}. {{item.content}}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status == 1" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import jwt from 'jsonwebtoken'
import api from '../api.js'

export default {
  data () {
    return {
      name: 'Molunerfinn',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0,
      id: ''
    }
  },
  created () {
    const userInfo = this.getUserInfo()
    if (userInfo !== null) {
      this.id = userInfo.id
      this.name = userInfo.name
    } else {
      this.id = ''
      this.name = ''
    }
    this.getTodolist()
  },
  computed: {
    Done () {
      let count = 0
      let length = this.list.length
      for (let i in this.list) {
        if (this.list[i].status === 1) {
          count += 1
        } else {
          count += 0
        }
      }
      this.equal(count)
      if (count === length || length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTodos () {
      if (this.todos === '') {
        return false
      }
      let obj = {
        status: false,
        content: this.todos,
        id: this.id
      }
      api.CreateTodolist(obj).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.getTodolist()
        } else {
          this.$message.error('创建失败')
        }
      }).catch((err) => {
        this.$message.error('创建失败')
        console.log(err)
      })
      this.todos = ''
    },
    update (index) {
      api.PutTodolist(this.id, this.list[index].id, this.list[index].status).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '任务状态更新成功'
          })
          this.getTodolist()
        } else {
          this.$message.error('任务状态更新失败')
        }
      }).catch((err) => {
        this.$message.error('任务状态更新失败')
        console.log(err)
      })
    },
    remove (index) {
      api.DelTodolist(this.id, this.list[index].id).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '任务删除失败'
          })
          this.getTodolist()
        } else {
          this.$message.error('任务删除失败')
        }
      }).catch((err) => {
        this.$message.error('任务删除失败')
        console.log(err)
      })
    },
    equal (count1) {
      this.count = count1
    },
    getUserInfo () {
      const token = sessionStorage.getItem('demo-token')
      if (token !== null && token !== 'null') {
        let decode = jwt.decode(token)
        return decode
      } else {
        return null
      }
    },
    getTodolist () {
      api.GetTodolist(this.id).then((res) => {
        if (res.success) {
          this.list = res.result
        } else {
          this.$message.error('获取列表失败')
        }
      }).catch((err) => {
        this.$message.error('获取列表失败')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.el-input{
  margin: 20px auto;
}

.todo-list{
  width: 100%;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  text-align: left;
}
.item{
  font-size: 20px;
}
.finished{
  text-decoration: line-through;
  color: #ddd;
}
.pull-right{
  float: right;
}
</style>
