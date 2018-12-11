/*
* @Author: lifujiang
* @Date:   2018-12-11 11:09:01
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-11 14:53:27
*/

var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')

app.use('/public', express.static('public'))
app.use('/node_modules', express.static('../node_modules'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'))

app.use(router)

app.listen(80, function () {
  console.log('server is running')
})
