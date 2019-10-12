const sqlMap = {
  user: {
    // 登陆
    login: 'select * from user where name = ? and password = ? and state != 0',
    // 新增用户
    add: 'insert IGNORE into user (name, password, email, create_time, update_time) values (?, ?, ?, ?, ?)',
    // 更新用户信息
    updateInfo: 'update user set name = ?, password = ?, email = ?, update_time = ? where id = ? and id != 1 and state != 0',
    // 更改用户状态
    updateState: 'update table user set state = ?, update_time = ? where id = ? and id != 1 and state != 0',
    // 获取用户信息
    getDetail: 'select * from user where id = ? and state != 0',
    // 用户列表
    selectList: 'select * from user where state != 0'
  },
  weekly: {
    // 新增周报
    add: 'insert into weekly (adminId, startTime, endTime, weekOfYear, thisWeekWork, nextWeekWork, collaboration, create_time, update_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // 更新周报信息
    updateInfo: 'update table weekly set startTime = ?, endTime = ?, weekOfYear = ?, thisWeekWork = ?, nextWeekWork = ?, collaboration = ?, update_time = ? where id = ? and state != 0',
    // 更新周报状态
    updateState: 'update table weekly set state = ?, update_time = ? where id = ? and state != 0',
    // 查询周报列表条数
    selectTotal: 'select count(*) as totalCount from weekly where weekly.state != 0',
     // 查询周报列表
    selectList: 'select weekly.id, userId, user.name as userName, startTime, endTime, weekOfYear, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state != 0',
    // 以id为主条件查询某篇周报详情
    getDetail: 'select weekly.id, userId, user.name as userName, startTime, endTime, weekOfYear, thisWeekWork, nextWeekWork, collaboration, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state != 0 and weekly.id=? and weekly.userId=?'
  }
}
module.exports = sqlMap;