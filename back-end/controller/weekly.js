const models = require('../config/db');
const jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql/sqlMap');
const moment = require('moment');
const app = express();
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();
const jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err')
    } else {
        res.json(ret);
        // res.send('ok')
    }
};


// 用户登录
router.post('/logIn', (req,res) => {
  let params = req.body
  let name = params.name
  let password = params.password
  let objParams = [name, password]

  let logIn = $sql.user.logIn

  conn.query(logIn, objParams, function(err, result) {
    let resultParams = {}
    if(err) {
      resultParams = {
          code: -2,
          message: '查询失败',
          errMessage: err
      }
      return jsonWrite(res, resultParams)
    }

    if(result.length === 0) {
      resultParams = {
          code: 2,
          data: {},
          message: '用户或密码不正确'
      }
    }else{
      let resultData = result[0]
       /**设置移动端登录连续30分钟过后过期**/
      let expires = moment().add(30, 'minutes').valueOf();
      // let expires = moment().add(20, 'seconds').valueOf();
      let token = jwt.encode({
        iss: result.id,
        exp: expires,
      }, app.get('jwtTokenSecret'));

      resultParams = {
          code: 1,
          data: {
            id: resultData.id,
            name: resultData.name,
            email: resultData.email,
            type: resultData.type,
            state: resultData.state,
            token: token
          },
          message: '登陆成功'
      }

    }


    return jsonWrite(res, resultParams)


  })

})

// 用户登出
router.post('/logOut', (req,res) => {
  let params = req.body
  let userId = params.userId
  let resultParams = {}
  let token=req.headers.token //获取前端请求头发送过来的token
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  if (decoded.exp <= Date.now()) {
    resultParams = {
        code: 20,
        message: '登录过期'
    }
  } else {
    if(!userId){
      resultParams = {
        code: 2,
        message: 'userId参数有误'
      }
    }else{
      let expires = moment().add(100, 'milliseconds').valueOf();
      let token = jwt.encode({
        iss: userId,
        exp: expires,
      }, app.get('jwtTokenSecret'));
      resultParams = {
        code: 1,
        message: '退出登录成功'
      }
    }
  }
  return jsonWrite(res, resultParams)

})

// 周报列表
router.post('/queryWeeklyList', (req,res) => {
  let token=req.headers.token //获取前端请求头发送过来的token
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  if (decoded.exp <= Date.now()) {
    let resultParams = {
        code: 20,
        message: '登录过期'
    }
    return jsonWrite(res, resultParams)
  } else {
    let params = req.body
    let userId = params.userId
    if(!userId){
      let resultParams = {
          code: 2,
          message: 'userId参数有误'
      }
      return jsonWrite(res, resultParams)
    }else{
      let selectWeeklyCount = $sql.weekly.selectWeeklyCount
      let selectWeeklyList = $sql.weekly.selectWeeklyList
      // let keywords = req.body.keywords
      let userType = req.body.userType
      let startTime = req.body.startTime
      let endTime = req.body.endTime

      // 分页查询入参 start
      let limitFirst = (params.pageNum-1)*params.pageSize;
      let limitLast = params.pageSize;
      // 分页查询入参 end

      let objParams = []
      let totalCount = 0
      let selectSql = ''

      if(userType!=1){
        objParams.push(userId)
        selectSql += " and userId = ?"
      }
      if(startTime){
        objParams.push(startTime)
        selectSql += " and weekly.create_time >= ?"
      }
      if(endTime){
        objParams.push(endTime)
        selectSql += " and weekly.create_time <= ?"
      }
      selectSql += " order by weekly.id desc"; // id倒序排

      let objSelectCount = selectWeeklyCount+selectSql
      conn.query(objSelectCount, objParams, function(err, result) {
        let resultParams = {}
        if(err) {
          resultParams = {
              code: -2,
              message: '查询失败',
              errMessage: err
          }
          return jsonWrite(res, resultParams)
        }
        if(result){
          totalCount = result.length===0 ? 0 : result[0].totalCount
          objParams.push(limitFirst, limitLast)
          selectSql+= " limit ?,?"; // 分页查询
          let objSelectList = selectWeeklyList+selectSql
          conn.query(objSelectList, objParams, function(err, subResult) {
            let resultParams = {}
            if(err) {
              resultParams = {
                  code: -2,
                  message: '查询失败',
                  errMessage: err
              }
              return jsonWrite(res, resultParams)
            }
            if(subResult){
              let resultData = {
                list: subResult.length===0 ? [] : subResult,
                totalCount: totalCount
              }
              resultParams = {
                code: 1,
                data: resultData,
                message: '成功'
              } 
              return jsonWrite(res, resultParams)
            }
            

          })
        }
        

      })



    }


  }

})

// 查询周报详情
router.post('/queryWeeklyDetail', (req,res) => {
  let token=req.headers.token //获取前端请求头发送过来的token
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  if (decoded.exp <= Date.now()) {
    let resultParams = {
        code: 20,
        message: '登录过期'
    }
    return jsonWrite(res, resultParams)
  } else {
    let params = req.body
    let weeklyId = params.weeklyId
    let userId = params.userId
    
    if(!weeklyId || !userId){
      resultParams = {
        code: 2,
        message: '参数有误'
      }
      return jsonWrite(res, resultParams)
    }else{
      let selectWeeklyDetail = $sql.weekly.selectWeeklyDetail
      let objParams = [weeklyId, userId]
      conn.query(selectWeeklyDetail, objParams, function(err, result) {
        let resultParams = {}
        if(err) {
          resultParams = {
              code: -2,
              message: '查询失败',
              errMessage: err
          }
          return jsonWrite(res, resultParams)
        }
        if(result){
          let resultData = result.length===0 ? {} : result[0]
          resultParams = {
            code: 1,
            data: resultData,
            message: '成功'
          } 
          return jsonWrite(res, resultParams)
        }
      })
    }
  }
})

module.exports = router