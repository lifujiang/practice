/*
* @Author: lifujiang
* @Date:   2018-12-11 12:13:43
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-12 21:12:42
*/
// 该模块处理路由信息

var express = require('express')
var router = express.Router()
var students = require('./students')

// 封装错误信息提示
function routerErr (err, res) {
  if (err) {
    res.status(500).send('error 500')
  }
}

// 封装跳转首页
function redir (res) {
  res.redirect('/students')
}

// 网站路由设计
/*
* | 请求方法  | 请求路径          | get参数 | post参数                       | 备注         |
* | -------- | ---------------- | ------- | ------------------------------ | ------------|
* | GET      | /students        |         |                                | 渲染主页页面 |
* | GET      | /students/add    |         |                                | 渲染添加页面 |
* | POST     | /students/add    |         | name, age, gender, hobbies     | 添加信息     |
* | GET      | /students/update | id      |                                | 渲染更新页面 |
* | POST     | /students/update |         | id, name, age, gender, hobbies | 更新信息     |
* | GET      | /students/delete | id      |                                | 删除信息     |
*/

router.get('/students', function (req, res) {
  // 渲染主页
  // 拿到 students 模块显示数据的回调函数并渲染
  students.show(function (err, data) {
    routerErr(err, res)
    res.render('index.html', {
      students: data
    })
  })
})

router.route('/students/add')
  .get(function (req, res) {
    // 渲染添加页面
    res.render('add.html', {})
  })

  .post(function (req, res) {
    // 处理添加信息
    // 拿到 post 的请求体并传给 students 模块处理
    // 并拿到回调函数判断操作是否成功, 成功 err 则为 null
    students.add(req.body, function (err) {
      routerErr(err, res)
      console.log('信息添加成功')
      redir(res)
    })
  })

router.route('/students/update')
  .get(function (req, res) {
    // 渲染更新信息
    // 拿到 url 的查询字符串并传给 students 模块处理
    // 拿到回调函数返回的 data 并渲染修改更新页面
    students.showedit(req.query.id, function (err, data) {
      routerErr(err, res)
      res.render('edit.html', {
        students: data
      })
    })
  })

  .post(function (req, res) {
    // 与上面添加信息类似
    students.update(req.body, function (err) {
      routerErr(err)
      console.log('信息修改成功')
      redir(res)
    })
  })

router.get('/students/delete', function (req, res) {
  students.delete(req.query.id, function (err, data) {
    // 与上面添加信息类似
    routerErr(err)
    console.log('信息删除成功')
    redir(res)
  })
})

module.exports = router
