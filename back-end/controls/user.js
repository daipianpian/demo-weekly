let $sql = require('../sql/sqlMap')
let moment = require('moment')
let bcrypt = require('bcryptjs')
let $http = require('../sql/http')
const jwt = require('jwt-simple')
const express = require('express')
const app = express()
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING')


function formatData(row) {
  row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
  row.update_time = moment(row.update_time).format('YYYY-MM-DD HH:mm:ss')

  let obj = {}
  switch (row.type) {
      case 1:
          obj.role = '管理员'
          break
      case 2:
          obj.role = '普通用户'
          break
  }
  delete row.password
  return Object.assign({}, row, obj)
}

const user = {
  /* 用户登录 start */
  login (req, res) {
    let params = req.body
    let name = params.name
    let password = params.password
    
    let sqlLogIn = $sql.user.login
    let arrayParams = [name, password]

    $http.connPool(sqlLogIn, arrayParams, result => {
        if (!result.length) $http.writeJson(res, {code: 2, message:'用户或密码不正确'})
        let resultData = {}
        resultData.code = 1
        resultData.data = result[0]
        resultData.data = formatData(resultData.data)
        /**设置移动端登录连续30分钟过后过期**/
        let expires = moment().add(30, 'minutes').valueOf()
        let token = jwt.encode({
          iss: resultData.data.id,
          exp: expires,
        }, app.get('jwtTokenSecret'))
        resultData.data.token = token
        resultData.msg = '登录成功'
        $http.writeJson(res, resultData)
    })
  },
  /* 用户登录 end */

  /* 用户登出 start */
  logout (req, res) {
    let params = req.body
    let userId = params.userId
    let resultData = {}
    let token=req.headers.token //获取前端请求头发送过来的token
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
    if (!userId || decoded.iss!=userId) {
      resultData = {
        code: 2,
        message: 'userId参数有误'
      }
    } else {
      if(decoded.exp <= Date.now()){
        resultData = {
          code: 20,
          message: '登录过期'
        }
      }else{
        let expires = moment().add(100, 'milliseconds').valueOf()
        let token = jwt.encode({
          iss: userId,
          exp: expires,
        }, app.get('jwtTokenSecret'))
        resultData = {
          code: 1,
          message: '退出登录成功'
        }
      }
    }
    $http.writeJson(res, resultData)
  }
  /* 用户登出 end */

  add () {
    let params = req.body
    let userId = params.userId
    let resultData = {}
    let token=req.headers.token //获取前端请求头发送过来的token
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
    if (!userId || decoded.iss!=userId) {
      resultData = {
        code: 2,
        message: '参数有误'
      }
    } else {
      if(decoded.exp <= Date.now()){
        resultData = {
          code: 20,
          message: '登录过期'
        }
      }else{
      }
    }
  }

}

module.exports = user
