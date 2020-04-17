const $sql = require('../sql/sqlMap')
const moment = require('moment')
const $http = require('../sql/http')
const $time = require('../utils/time')
const jwt = require('jwt-simple')
const express = require('express')
const app = express()
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING')


function formatData(rows) {
  return rows.map(row => {
    if(row.create_time) {
      row.create_time = $time.formatTime(row.create_time)
    }
    if(row.update_time) {
      row.update_time = $time.formatTime(row.update_time)
    }
    let type = row.type
    if(type){
      switch(type) {
        case 1:
          row.role = '管理员'
          break
        case 2:
          row.role = '普通用户'
          break
      }
    }
    return Object.assign({}, row)
  })
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
        let data = result[0]
        // data = formatData(data)
        data.create_time = $time.formatTime(data.create_time)
        if(data.type > 1) data.role = '普通用户'
        data.role = '管理员'
        delete data.password
        /**设置移动端登录连续30分钟过后过期**/
        let expires = moment().add(30, 'minutes').valueOf()
        let token = jwt.encode({
          iss: data.id,
          exp: expires,
        }, app.get('jwtTokenSecret'))
        data.token = token
        resultData.data = data
        resultData.msg = '登录成功'
        return $http.writeJson(res, resultData)
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
      return $http.writeJson(res, resultData)
    })

  },
  /* 用户登出 end */

  /*添加用户 start*/
  add (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = $time.formatTime()
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
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, message:'添加失败'})
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
      let curTime = $time.formatTime()
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
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, message:'更新失败'})
          return $http.writeJson(res, {code: 1, data: result, message: '更新用户成功'})
        })
      }
    })
  },
  /*更新用户信息 end*/

  /*更新用户状态 start*/
  updateState (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = $time.formatTime()
      let id = params.id
      let state = !params.state ? '0' : params.state
      let update_time = curTime
      if(!id) {
        $http.writeJson(res, {code: 2, message:'参数有误'})
      } else {
        let sql = $sql.user.updateState
        let arrayParams = [state, update_time, id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, message:'更新用户状态失败'})
          return $http.writeJson(res, {code: 1, message: '更新用户状态成功'})
        })
      }
    })
  },
  /*更新用户状态 end*/

  /*获取用户信息 start*/
  detail (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let userId = params.userId
      let id = params.id
      if(!id) {
        $http.writeJson(res, {code: 2, message:'参数有误'})
      } else {
        let sql = $sql.user.getDetail
        let arrayParams = [id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) {return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})}
          if(result.length != 1) {
            return $http.writeJson(res, {code: 2, message:'获取用户信息不存在'})
          } else {
            let resultData = formatData(result)[0]
            /*if((userId == 1 && userId == id) || userId!=1){
              delete resultData.password
            }*/
            /*delete resultData.password*/
            return $http.writeJson(res, {code: 1, data: resultData, message: '获取用户信息成功'})
          }
        })
      }
    })
  },
  /*获取用户信息 end*/

  /*获取用户列表 start*/
  list (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let sqlSelectTotal = $sql.user.selectTotal
      let sqlSelectList= $sql.user.selectList
      let userId = params.userId
      let userType = params.userType
      let searchId = params.searchId
      let searchName = params.searchName
      let searchEmail = params.searchEmail
      let pageNum = params.pageNum
      let pageSize = !params.pageSize ? 10 : params.pageSize

      if(!pageNum) {
        $http.writeJson(res, {code: 2, message:'参数有误'})
      } else {
        // 分页查询入参 start
        let limitFirst = (pageNum-1)*pageSize;
        let limitLast = pageSize;
        // 分页查询入参 end
        if(userType!=1){
          sqlSelectTotal += " and id = "+userId
          sqlSelectList += " and id = "+userId
        }else{
          if(searchId) {
            sqlSelectTotal += " and id = "+searchId
            sqlSelectList += " and id = "+searchId
          }
        }

        if(searchName){
          sqlSelectTotal += " and name like '%"+searchName+"%'"
          sqlSelectList += " and name like '%"+searchName+"%'"
        }

        if(searchEmail){
          sqlSelectTotal += " and email like '%"+searchEmail+"%'"
          sqlSelectList += " and email like '%"+searchEmail+"%'"
        }
        let sql= sqlSelectTotal + '; ' + sqlSelectList
        sql += " order by id desc limit ?,?"; // id倒序排
        let arrayParams = [limitFirst, limitLast]
        
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) {
            return $http.writeJson(res, {code:-2, message:'失败'})
          }else{
            let resultData = {}
            resultData.totalCount = result[0][0]['totalCount']
            resultData.list = formatData(result[1])
            return $http.writeJson(res, {code: 1, data: resultData, message: '获取用户列表成功'})
          } 
        })
      }

    })
  },
  /*获取用户列表 end*/

}

module.exports = user
