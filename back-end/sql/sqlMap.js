const sqlMap = {
  user: {
    selectUser: 'select * from user where name = ? and password = ? and state=1',
    userList: 'select * from user where state=1'
  },
  weekly: {
    selectWeeklyCount: 'select count(*) as totalCount from weekly where weekly.state=1', // 查询周报列表条数
    selectWeeklyList: 'select weekly.id, userId, user.name as userName, startTime, endTime, weekOfYear, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state=1',  // 查询周报列表
    selectWeeklyDetail: 'select weekly.id, userId, user.name as userName, startTime, endTime, weekOfYear, thisWeekWork, nextWeekWork, collaboration, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state=1 and weekly.id=? and weekly.userId=?'  // 以id为主条件查询某篇周报详情
  }
}
module.exports = sqlMap;