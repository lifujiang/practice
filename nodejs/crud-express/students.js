/*
* @Author: lifujiang
* @Date:   2018-12-11 13:05:07
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-12 21:23:56
*/
// 该模块处理信息增删改的逻辑

var fs = require('fs')
var studentsData = 'db.json'

// 封装错误返回信息
function studentsErr (err, callback) {
  if (err) return callback(err)
}

// 显示数据
exports.show = function (callback) {
  fs.readFile(studentsData, 'utf8', function (err, data) {
    studentsErr(err, callback)

    // 读取文件并通过回调函数传给 router 模块
    callback(null, JSON.parse(data))
  })
}

exports.add = function (student, callback) {
  fs.readFile(studentsData, 'utf8', function (err, students) {
    studentsErr(err, callback)

    /*
    *读取文件的 json 数据并转换为数组对象 students
    *将添加进来的 student 附加 id, id 为 students 对象的最后一个元素的 id + 1
    *将 student push 进 students
    *将 students 转换为 json 格式数据并写入文件
    */
    students = JSON.parse(students)
    student.age = parseInt(student.age)
    student.gender = parseInt(student.gender)
    student.id = students[students.length - 1].id + 1
    students.push(student)
    students = JSON.stringify(students)

    fs.writeFile(studentsData, students, function (err) {
      studentsErr(err, callback)

      callback(null)
    })
  })
}

exports.showedit = function (id, callback) {
  fs.readFile(studentsData, 'utf8', function (err, students) {
    studentsErr(err, callback)
    students = JSON.parse(students)
    // 拿到与 url 的查询字符串相同的数组元素, 并通过回调函数传给 router, 最终渲染页面
    var stu = students.find(function (item) {
      return item.id === parseInt(id) // 注意 id 的数据类型
    })
    callback(null, stu)
  })
}

exports.update = function (student, callback) {
  fs.readFile(studentsData, 'utf8', function (err, students) {
    studentsErr(err, callback)

    // 读取数据, 并转换格式, 以免数据不统一
    students = JSON.parse(students)
    student.id = parseInt(student.id)
    student.age = parseInt(student.age)
    student.gender = parseInt(student.gender)

    // 此时的 stu 为引用类型值
    var stu = students.find(function (item) {
      return item.id === student.id
    })
    // 当 stu 改变时, students 里的与stu指向同一内存的值也会随着改变
    // 通过其值类型的特点更新数据
    for (var key in student) {
      stu[key] = student[key]
    }

    // 将数据转为 json 格式并写入文件
    students = JSON.stringify(students)

    fs.writeFile(studentsData, students, function (err) {
      studentsErr(err, callback)
      callback(null)
    })
  })
}

exports.delete = function (id, callback) {
  fs.readFile(studentsData, 'utf8', function (err, students) {
    studentsErr(err, callback)

    students = JSON.parse(students)
    // 拿到 url 查询字符串指定的 id 的数组项索引
    var index = students.findIndex(function (item) {
      return item.id === parseInt(id)
    })
    // 删除该项
    students.splice(index, 1)
    // 将数据转为 json 格式并写入文件
    students = JSON.stringify(students)
    fs.writeFile(studentsData, students, function (err) {
      studentsErr(err, callback)
      callback(null)
    })
  })
}
