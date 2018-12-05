/*
* @Author: lifujiang
* @Date:   2018-12-05 09:49:04
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-05 13:10:27
*/

// 引入模块
var express = require('express')
var app = express()

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
  var options = {
    root: __dirname
  }
  res.sendFile('./views/post.html', options)
})

app.get('/liuyan', function (req, res) {
  var comment = req.query
  comment.dateTime = '2018-12-5 13:03:17'
  comments.unshift(comment)
  res.location('/')
  res.sendStatus('302')
})

// 监听端口
app.listen(80, function () {
  console.log('app is runing')
})
