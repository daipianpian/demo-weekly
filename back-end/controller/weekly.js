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
  if(!name || !password){
    let resultParams = {
        code: 20,
        message: '用户名或者密码错误'
    }
    res.json(resultParams)
  }else{
    let objParams = [name, password]

    let selectUser = $sql.user.selectUser

    conn.query(selectUser, objParams, function(err, result) {
      let resultParams = {}
      if(err) {
        resultParams = {
            code: -2,
            message: '查询失败',
            errMessage: err
        }
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


      jsonWrite(res, resultParams)
    })
  }

})
// 用户登出
router.post('/logOut', (req,res) => {
})

router.post('/queryWeeklyList', (req,res) => {

  let token=req.headers.token //获取前端请求头发送过来的token
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  if (decoded.exp <= Date.now()) {
    let resultParams = {
        code: 20,
        message: '登录过期'
    }
    res.json(resultParams)
  } else {
    let params = req.body
    let adminId = params.adminId
    if(!adminId){
      let resultParams = {
          code: 20,
          message: 'adminId参数有误'
      }
      res.json(resultParams)
    }else{
      let selectWeeklyList = $sql.weekly.selectWeeklyList
      // let keywords = req.body.keywords
      let adminType = req.body.adminType
      let startTime = req.body.startTime
      let endTime = req.body.endTime

      // 分页查询入参 start
      let limitFirst = (params.pageNum-1)*params.pageSize;
      let limitLast = params.pageSize;
      // 分页查询入参 end

      let objParams = []

      if(adminType!=1){
        objParams.push(adminId)
        selectWeeklyList += " and adminId = ?"
      }
      if(startTime){
        objParams.push(startTime)
        selectWeeklyList += " and create_time >= ?"
      }
      if(endTime){
        objParams.push(endTime)
        selectWeeklyList += " and create_time <= ?"
      }
      objParams.push(limitFirst, limitLast)

      selectWeeklyList += " order by id desc"; // id倒序排
      selectWeeklyList+= " limit ?,?"; // 分页查询

      conn.query(selectWeeklyList, objParams, function(err, result) {
        let resultParams = {}
        if(err) {
          resultParams = {
              code: -2,
              message: '查询失败',
              errMessage: err
          }
        }

        if(result.length === 0) {
          resultParams = {
              code: 1,
              data: [],
              message: '成功'
          }
        }else{
          let resultData = result
          resultParams = {
            code: 1,
            data: resultData,
            message: '成功'
          }

        }

        jsonWrite(res, resultParams)

      })
    }


  }





})

module.exports = router