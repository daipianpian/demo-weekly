let path = '/api';

module.exports = {
    // user-用户管理
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAdd: path + '/user/add',
    userUpdate: path + '/user/update',
    userChangeState: path + '/user/changeState',
    userDetail: path + '/user/detail',
    userList: path + '/user/list',

    // weekly-周报管理
    weeklyAdd: path + '/weekly/add',
    weeklyUpdate: path + '/weekly/update',
    weeklyChangeState: path + '/weekly/changeState',
    weeklyDetail: path + '/weekly/detail',
    weeklyList: path + '/weekly/list',
    weeklyTotal: path + '/weekly/total',
};