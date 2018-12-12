/*
* @Author: lifujiang
* @Date:   2018-12-11 11:09:01
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-12 19:57:51
*/

// 加载模块
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

// 定义 app
var app = express()

// 开放静态资源
app.use('/public', express.static('public'))
app.use('/node_modules', express.static('../node_modules'))

// 配置中间件 bodyParser, 使其能访问请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置模板引擎
app.engine('html', require('express-art-template'))

// 使用路由模块
app.use(router)

// 监听80端口
app.listen(80, function () {
  console.log('server is running')
})
