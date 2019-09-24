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

})
// 用户登出
router.post('/logOut', (req,res) => {
})

router.post('/queryWeeklyList', (req,res) => {
  let token=req.headers.token//获取前端请求头发送过来的token
  let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  if (decoded.exp <= Date.now()) {
    let unlogin = {
        code: 20,
        message: '登录过期'
    }
    res.json(unlogin);
  } else {
    let params = req.body
    let adminId = req.body.adminId
    if(!adminId){
      let unlogin = {
          code: 20,
          message: '登录有误'
      }
      res.json(unlogin);
    }else{
      let keywords = req.body.keywords
      let adminType = req.body.adminType

      /*分页查询入参 start*/
      let limitFirst = (params.pageNum-1)*params.pageSize;
      let limitLast = params.pageSize;
      /*分页查询入参 end*/

      let objParams = []

      let selectWeeklyList = $sql.weekly.selectWeeklyList

      if(!keywords){
          objParams = [limitFirst, limitLast];
      }else{
          objParams = ["%"+req.body.keywords+"%", limitFirst, limitLast];
          selectWeeklyList += " and name like ?"; // 模糊查询
      }


      if(adminType!=1){
        selectWeeklyList += "and adminId = ?"
      }

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
              code: 2,
              message: '查询有误'
          }
        }else{
          let resultData = result[0]
          resultParams = {
            code: 1,
            data: resultData,
            message: '成功'
          }

        }
      }) 

    }

  }





})

module.exports = router