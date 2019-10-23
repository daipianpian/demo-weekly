let express = require('express');
let user = require('../controls/user');
let weekly = require('../controls/weekly');
let api = require('../config/api');

let router = express.Router();

// user-用户管理 
router.post(api.userLogin, user.login);
router.post(api.userLogout, user.logout);
router.post(api.userAdd, user.add);
router.post(api.userUpdateInfo, user.updateInfo);
router.post(api.userUpdateState, user.updateState);
router.post(api.userDetail, user.detail);
router.post(api.userList, user.list);

// weekly-周报管理
router.post(api.weeklyAdd, weekly.add);
router.post(api.weeklyUpdateInfo, weekly.updateInfo);
router.post(api.weeklyUpdateState, weekly.updateState);
router.post(api.weeklyDetail, weekly.detail);
router.post(api.weeklyList, weekly.list);

module.exports = router;