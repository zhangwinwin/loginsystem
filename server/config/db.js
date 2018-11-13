const Sequelize = require('sequelize')

const Todolist = new Sequelize('mysql://root:zhang@localhost/todolist', {
  define: {
    timestamps: false
  }
})

module.exports = {
  Todolist
}
