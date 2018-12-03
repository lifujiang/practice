/*
* @Author: lifujiang
* @Date:   2018-12-02 10:29:09
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-12-03 22:03:11
*/

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
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

function error (err, res) {
  if (err) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.end('页面不存在')
  }
}

http
  .createServer(function (req, res) {
    var urlObj = url.parse(req.url, true)
    var pathname = urlObj.pathname
    var query = urlObj.query
    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        error(err, res)
        var html = template.render(data.toString(), {
          data: comments
        })
        res.end(html)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function (err, data) {
        error(err, res)
        res.end(data)
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        error(err, res)
        res.end(data.toString())
      })
    } else if (pathname === '/liuyan') {
      if (!query) return res.end('请输入内容')
      var comment = query
      comment.dateTime = '2018-12-3 21:51:15'
      comments.unshift(comment)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    }
  })
  .listen(80, function () {
    console.log('server is runing...')
  })
