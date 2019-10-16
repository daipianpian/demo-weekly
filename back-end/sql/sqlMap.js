const sqlMap = {
  user: {
    // 登陆
    login: 'select * from user where name = ? and password = ? and state != 0',
    // 新增用户
    add: 'insert IGNORE into user (name, password, email, create_time, update_time) values (?, ?, ?, ?, ?)',
    // 更新用户信息
    updateInfo: 'update user set name = ?, password = ?, email = ?, update_time = ? where id = ? and type != 1 and state != 0',
    // 更改用户状态
    updateState: 'update user set state = ?, update_time = ? where id = ? and type != 1 and state != 0',
    // 获取用户信息
    getDetail: 'select * from user where id = ? and state != 0',
    // 查询周报列表条数
    selectTotal: 'select count(*) as totalCount from user where state != 0',
    // 用户列表
    selectList: 'select id, name, email, type, create_time, update_time, state from user where state != 0'
  },
  weekly: {
    // 新增周报
    add: 'insert into weekly (userId, startTime, endTime, title, thisWeekWork, nextWeekWork, collaboration, create_time, update_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // 更新周报信息
    updateInfo: 'update weekly set startTime = ?, endTime = ?, title = ?, thisWeekWork = ?, nextWeekWork = ?, collaboration = ?, update_time = ? where id = ? and state != 0',
    // 更新周报状态
    updateState: 'update weekly set state = ?, update_time = ? where id = ? and state != 0',
    // 查询周报列表条数
    selectTotal: 'select count(*) as totalCount from weekly where state != 0',
     // 查询周报列表
    selectList: 'select weekly.id, userId, user.name as userName, startTime, endTime, title, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state != 0',
    // 以id为主条件查询某篇周报详情
    getDetail: 'select weekly.id, userId, user.name as userName, startTime, endTime, title, thisWeekWork, nextWeekWork, collaboration, weekly.create_time, weekly.update_time, weekly.state from weekly,user where weekly.userId = user.id and weekly.state != 0 and weekly.id=?'
  }
}
module.exports = sqlMap;