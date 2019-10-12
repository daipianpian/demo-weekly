let $sql = require('../sql/sqlMap')
let moment = require('moment')
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
    
    let sql = $sql.user.login
    let arrayParams = [name, password]

    $http.connPool(sql, arrayParams, (err, result) => {
      if(err) {
        return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
      }
      else if (!result.length) {
        return $http.writeJson(res, {code: 2, message:'用户或密码不正确'})
      }
      else {
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
      }
    })
  },
  /* 用户登录 end */

  /* 用户登出 start */
  logout (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let expires = moment().add(100, 'milliseconds').valueOf()
      let token = jwt.encode({
        iss: params.userId,
        exp: expires,
      }, app.get('jwtTokenSecret'))
      resultData = {
        code: 1,
        message: '退出登录成功'
      }
      $http.writeJson(res, resultData)
    })

  },
  /* 用户登出 end */

  /*添加用户 start*/
  add (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = moment().format('YYYY-MM-DD HH:mm:ss')
      let name = params.name
      let password = params.password
      let email = params.email
      let create_time = curTime
      let update_time = curTime
      if(!name || !password) $http.writeJson(res, {code: 2, message:'参数有误'})
      else {
        let sql = $sql.user.add
        let arrayParams = [name, password, email, create_time, update_time]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(results.affectedRows !== 1) return $http.writeJson(res, {code: 2, message:'添加失败'})
          return $http.writeJson(res, {code: 1, message: '添加用户成功'})
        })
      }
    })
  },
  /*添加用户 end*/

  /*更新用户信息 start*/
  updateInfo (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = moment().format('YYYY-MM-DD HH:mm:ss')
      let id = params.id
      let name = params.name
      let password = params.password
      let email = params.email
      let update_time = curTime
      if(!id || !name || !password) {$http.writeJson(res, {code: 2, message:'参数有误'})}
      else {
        let sql = $sql.user.updateInfo
        let arrayParams = [name, password, email, update_time, id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows !== 1) return $http.writeJson(res, {code: 2, message:'更新失败'})
          $http.writeJson(res, {code: 1, data: result, message: '更新用户成功'})
        })
      }
    })
  },
  /*更新用户信息 end*/

  /*更改用户状态 start*/
  updateState (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = moment().format('YYYY-MM-DD HH:mm:ss')
      let id = params.id
      let state = params.state
      let update_time = curTime
      if(!id) {$http.writeJson(res, {code: 2, message:'参数有误'})}
      else {
        let sql = $sql.user.updateState
        let arrayParams = [state, update_time, id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows !== 1) return $http.writeJson(res, {code: 2, message:'用户状态失败'})
          $http.writeJson(res, {code: 1, data: result, message: '用户状态成功'})
        })
      }
    })
  },
  /*更改用户状态 end*/
}

module.exports = user
