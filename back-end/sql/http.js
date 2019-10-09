let mysql = require('mysql');
let db = require('../config/db');
let pool = mysql.createPool(db);
const jwt = require('jwt-simple');
const express = require('express')
const app = express()
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING')

const $http = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let query = conn.query(sql, val, (err, result) => {
                /*if (err) {
                    console.log(err);
                }*/
                if(err) writeJson(res, {code:-2, message:'失败',errMsg: err})
                cb(result);
                conn.release();
            });
        });
    },
    // json格式
    writeJson(res, result) {
        if(typeof result === 'undefined') {
            res.send('err')
        } else {
            res.json(result);
            // res.send('ok')
        }
    },
    // user验证
    userVerify(req, res, cb) {
        let params = req.body
        let userId = params.userId
        let resultData = {}
        let token=req.headers.token //获取前端请求头发送过来的token
        let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
        if (!userId || decoded.iss!=userId) {
          resultData = {
            code: 2,
            message: 'userId有误'
          }
          $http.writeJson(res, resultData)
        } else {
          if(decoded.exp <= Date.now()){
            resultData = {
              code: 20,
              message: '登录过期'
            }
            $http.writeJson(res, resultData)
          }else{
            cb()
          }
        }
    }
};

module.exports = $http
