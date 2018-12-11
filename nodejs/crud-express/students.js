/*
* @Author: lifujiang
* @Date:   2018-12-11 13:05:07
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-11 22:47:17
*/
// 该模块处理db.json文件信息

var fs = require('fs')
var db = 'db.json'

exports.show = function (callback) {
  fs.readFile(db, 'utf8', function (err, data) {
    if (err) return callback(err)
    callback(null, JSON.parse(data))
  })
}

exports.add = function (student, callback) {
  fs.readFile(db, 'utf8', function (err, students) {
    if (err) return callback(err)
    students = JSON.parse(students)

    student.age = parseInt(student.age)
    student.gender = parseInt(student.gender)
    student.id = students[students.length - 1].id + 1

    students.push(student)

    students = JSON.stringify(students)

    fs.writeFile(db, students, function (err) {
      if (err) return callback(err)
      callback(null)
    })
  })
}

exports.showedit = function (id, callback) {
  fs.readFile(db, 'utf8', function (err, students) {
    if (err) return callback(err)
    students = JSON.parse(students)
    var stu = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, stu)
  })
}

exports.update = function (student, callback) {
  fs.readFile(db, 'utf8', function (err, students) {
    if (err) return callback(err)

    students = JSON.parse(students)

    student.id = parseInt(student.id)
    student.age = parseInt(student.age)
    student.gender = parseInt(student.gender)
    // 此时的 stu 为引用类型值
    var stu = students.find(function (item) {
      return item.id === student.id
    })
    // 当 stu 改变时, students 里的与stu指向同一内存的值也会随着改变
    for (var key in student) {
      stu[key] = student[key]
    }

    students = JSON.stringify(students)

    fs.writeFile(db, students, function (err) {
      if (err) return callback(err)
      callback(null)
    })
  })
}

exports.delete = function (id, callback) {
  fs.readFile(db, 'utf8', function (err, students) {
    if (err) return callback(err)
    students = JSON.parse(students)
    var stu = students.find(function (item) {
      return item.id === parseInt(id)
    })
    var index = students.indexOf(stu)
    students.splice(index, 1)
    students = JSON.stringify(students)
    fs.writeFile(db, students, function (err) {
      if (err) return callback(err)
      callback(null)
    })
  })
}
