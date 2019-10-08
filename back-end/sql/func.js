let mysql = require('mysql');
let db = require('../config/db');
let pool = mysql.createPool(db);
const jwt = require('jwt-simple');

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let query = conn.query(sql, val, (err, result) => {
                /*if (err) {
                    console.log(err);
                }*/
                if(err) return writeJson(res, {code:-2, message:'失败',errMsg: err})
                cb(err, result);
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
    // Token验证
    tokenVerify(token) {
        let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
        if (decoded.exp <= Date.now()) {
            return false
        } else {
            return true
        }
    }
};