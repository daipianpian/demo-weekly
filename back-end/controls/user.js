let $sql = require('../sql/sqlMap');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let $func = require('../sql/func');
const jwt = require('jwt-simple');
const express = require('express');
const app = express();

const user = {
  // 登录
  login (req, res) {
    let params = req.body
    let name = params.name
    let password = params.password
    
    let sqlLogIn = $sql.user.logIn
    let arrayParams = [name, password]

    $func.connPool(sqlLogIn, arrayParams, result => {
        // if(err) return $func.writeJson(res, {code:-2, message:'登录失败',errMsg: err})
        if (!result.length) return $func.writeJson(res, {code: 2, message:'用户或密码不正确'})

        let resultData = result[0]
        let password = resultData.password;
        bcrypt.compare(pass, password, (err, sure) => {
            if (sure) {
                /**设置移动端登录连续30分钟过后过期**/
                let expires = moment().add(30, 'minutes').valueOf();
                // let expires = moment().add(20, 'seconds').valueOf();
                let token = jwt.encode({
                  iss: result.id,
                  exp: expires,
                }, app.get('jwtTokenSecret'));
                
                let data = {
                  id: resultData.id,
                  name: resultData.name,
                  email: resultData.email,
                  type: resultData.type,
                  state: resultData.state,
                  token: token
                }

                res.json({code: 1, msg: '登录成功', date: data});
            } else {
                res.json({code: 1, msg: '登录失败'});
            }
        });
    });


  },

  // 添加用户
  add (req, res) {
  }
}

module.exports = user
