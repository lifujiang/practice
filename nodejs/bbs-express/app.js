/*
* @Author: lifujiang
* @Date:   2018-12-05 09:49:04
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-08 14:41:56
*/

// 引入模块
var express = require('express')
var app = express()
// 引入中间件
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 手动生成的假数据
var comments = [
  {
    name: '张三',
    comment: '今天天气真不错',
    dateTime: '2018-12-2 12:03:07'
  },
  {
    name: '李四',
    comment: '今天天气真不错',
    dateTime: '2018-12-2 12:03:07'
  },
  {
    name: '王五',
    comment: '今天天气真不错',
    dateTime: '2018-12-2 12:03:07'
  },
  {
    name: '马六',
    comment: '今天天气真不错',
    dateTime: '2018-12-2 12:03:07'
  }
]

// 公开公共静态资源
// 第一个 /public 是限定 url 路径, 这个路径是可以改变的, 也可以不设定
app.use('/public', express.static('public'))

// 引入模板引擎
app.engine('html', require('express-art-template'))

// 定义路由
app.get('/', function (req, res) {
  res.render('index.html', {
    data: comments
  })
})

app.get('/post', function (req, res) {
  res.render('post.html')
})

// 使用 post方法 获取post.html表单数据
app.post('/post', function (req, res) {
  var comment = req.body
  comment.dateTime = '2018-12-7 10:30:14'
  comments.unshift(comment)
  res.redirect('/')
})

// app.get('/liuyan', function (req, res) {
//   // query 只能是 get 方式才能获取到数据
//   var comment = req.query
//   comment.dateTime = '2018-12-5 13:03:17'
//   comments.unshift(comment)
//   res.redirect('/')
// })

// 监听端口
app.listen(80, function () {
  console.log('app is runing')
})
