// node 后端服务器
const router = require('./routes/router'); // 接口地址管理
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 后端api路由
app.use(router);

// 监听端口
app.listen(3002);
console.log('success listen at port:3002......');