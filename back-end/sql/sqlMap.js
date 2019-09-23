const sqlMap = {
  user: {
    selectUser: 'select * from admin where name = ? and password = ? and state=1'
  },
    weekly: {
        selectWeeklyList: 'select * from weekly where adminId = ? and state=1', // 查询文章列表
        selectWeeklyDetail: 'select * from weekly where id=? adminId = ? and and state=1'  // 以id为主条件查询某篇文章
    }
}
module.exports = sqlMap;