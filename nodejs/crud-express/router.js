/*
* @Author: lifujiang
* @Date:   2018-12-11 12:13:43
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-11 21:58:44
*/
// 该模块处理路由信息

var express = require('express')
var router = express.Router()
var students = require('./students')

// 封装错误信息提示
function error (err, res) {
  if (err) {
    res.status(500).send('error 500')
  }
}

// 网站路由
router.get('/students', function (req, res) {
  students.show(function (err, data) {
    error(err, res)
    res.render('index.html', {
      students: data
    })
  })
})

router.route('/students/add')
  .get(function (req, res) {
    res.render('add.html', {})
  })

  .post(function (req, res) {
    students.add(req.body, function (err) {
      error(err, res)
      console.log('信息添加成功')
      res.redirect('/students')
    })
  })

router.route('/students/update')
  .get(function (req, res) {
    students.showedit(req.query.id, function (err, data) {
      if (err) error(err, res)
      res.render('edit.html', {
        students: data
      })
    })
  })

  .post(function (req, res) {
    students.update(req.body, function (err) {
      error(err)
      console.log('信息修改成功')
      res.redirect('/students')
    })
  })

router.get('/students/delete', function (req, res) {
  students.delete(req.query.id, function (err, data) {
    error(err)
    console.log('信息删除成功')
    res.redirect('/students')
  })
})

module.exports = router
