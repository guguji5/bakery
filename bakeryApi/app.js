const express = require('express');
const compression = require('compression');
const http = require('http')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);
//尽量在其他中间件前使用compression
app.use(compression());

//解析xml
app.use(bodyParser.xml({
    limit: '1MB',   // Reject payload bigger than 1 MB
    xmlParseOptions: {
        normalize: true,     // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
    }
}));



// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
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

// 个人中心
app.use('/about',require('./routes/about'))

// 微信接口
app.use('/WeChat',require('./routes/WeChat'))


//test接口
app.get('/test', function (req, res) {
    res.send('GET request to homepage');
});


const port = process.env.PORT || 80
//linux 必须通过sudo才能启动

app.listen(port, () => {
  console.log(`server running @${port}`)
})

module.exports = app
