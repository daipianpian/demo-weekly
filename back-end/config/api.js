let path = '/api';

module.exports = {
    // user-用户管理
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAdd: path + '/user/add',
    userUpdateInfo: path + '/user/updateInfo',
    userUpdateState: path + '/user/updateState',
    userDetail: path + '/user/detail',
    userList: path + '/user/list',

    // weekly-周报管理
    weeklyAdd: path + '/weekly/add',
    weeklyUpdateInfo: path + '/weekly/updateInfo',
    weeklyUpdateState: path + '/weekly/updateState',
    weeklyDetail: path + '/weekly/detail',
    weeklyList: path + '/weekly/list',
    weeklyTotal: path + '/weekly/total',
};