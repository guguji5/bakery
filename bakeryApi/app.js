const express = require('express')
const http = require('http')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')

// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())//解析请求体




// 获取全部蛋糕list
app.use('/productList', require('./routes/product'))
// 获取蛋糕的type
app.use('/type', require('./routes/type'))

// 获取蛋糕的detail
app.use('/productDetail', require('./routes/productDetail'))

// 判断当前用户是否已在用户表中存在，isThere
app.use('/user', require('./routes/user'))

// 获取购物车的信息
app.use('/cart',require('./routes/cart'))

// 新增订单
app.use('/order',require('./routes/order'))

// 新增订单
app.use('/about',require('./routes/about'))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server running @${port}`)
})

module.exports = app
