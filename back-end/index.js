// node 后端服务器
const weeklyApi = require('./controller/weekly');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api', weeklyApi);

// 监听端口
app.listen(3002);
console.log('success listen at port:3002......');