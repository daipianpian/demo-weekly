# demo-weekly
Vue+nodeJs+mySql实现的工作周报后台管理系统


## 源码位置
1. 前端vue源码--front-end
2. 后台nodejs源码--back-end
3. 数据库--back-end/sql/demo_weekly.sql


## 运行方式
### 导入数据库
1. 安装mySql数据库（已安装的小伙伴请忽略这一步）；
2. 创建demo_weekly数据库；
3. 将back-end/sql/demo_weekly.sql导入到demo_weekly数据库里。

### 启动后台
1. 安装依赖
   npm install
2. 修改db.js数据库配置
   修改back-end/config/db.js文件里的mySql数据库配置
3. 运行
   nodemon index.js

### 启动前端
1. 安装依赖
   npm install
2. 运行
   npm run serve
3. 打包
   npm run build

### 登录管理系统
管理员账号：admin    初始密码：191023  
普通用户账号：test1    初始密码：123456    
管理员账号登录后即有权限创建普通用户账号  


本人前端程序员，长期混迹于各种前端开发中，现在专门为前端热爱者建了个微信群，和大家一起分享自己在工作、学习中遇到的技术知识或问题，各位感兴趣的可以加入哦~ 
![微信前端交流群](http://daipianpian.com/common/images/weChatGroup.jpg)
