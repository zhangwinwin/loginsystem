const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const json = require('koa-json')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')
const cors = require('koa-cors')
const jwt = require('koa-jwt')
const serve = require('koa-static')
const path = require('path')
const historyApiFallback = require('koa-history-api-fallback')

app.use(bodyparser())
app.use(cors())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date
  await next()
  let ms = new Date - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.on('error', function(err, ctx) {
  console.log('server error',err)
})

app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (401 === err.status) {
      ctx.status = 401
      ctx.body = { 
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

router.use('/auth', auth.routes())
router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes())

app.use(router.routes())
app.use(historyApiFallback())
app.use(serve(path.resolve('dist')))

app.listen(8889, () => {
  console.log('koa is listening in 8889')
})

module.exports = app