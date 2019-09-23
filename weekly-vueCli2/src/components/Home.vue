<template>
  <div id="app">
    <!-- 头部导航 start -->
    <header class="header">
      <el-row>
        <el-col :span="19" :offset="2">
          <router-link class="title" tag="a" to="/home/admin"><i class="el-icon-date"></i>工作周报</router-link>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="loginOut()">退出</el-button>
        </el-col>
      </el-row>
    </header>
    <!-- 头部导航 end -->

    <main>
        <!-- 左侧导航 -->
        <div class="main-left">
          <sidebar></sidebar>
        </div>

        <!-- 右侧主内容区 -->
        <div class="main-right" >
          <router-view></router-view>
        </div>
    </main>

    <!-- <router-view/> -->
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  export default {
    name: 'app',
    data() {
      return {
        isBill: this.$store.state.isBill
      }
    },
    mounted() {
      let adminId = sessionStorage.getItem('adminId');
      console.log('adminId='+adminId);
      if(adminId == '' || adminId == null || typeof(adminId) == 'undefined'){
          return this.$router.replace('/');
      }else{
        console.log('已登录');
      }
    },
    components: {
      Sidebar
    },
    methods: {
      loginOut(){
        var that = this;
        var params = {};
        that.$axios.post('/admin/Login/logout',params,{
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(function(res){
            console.log(res);
            var data = res.data;
            console.log(data);
            if(data.status){
              sessionStorage.removeItem('adminId');
              sessionStorage.removeItem('adminName');
              sessionStorage.removeItem('loginTime');
              that.$message({
                message: '退出成功',
                type: 'success',
                duration: 1000
              });
              return that.$router.replace('/');
            }else{
              that.$message({
                message: '退出失败',
                type: 'error',
                duration: 1000
              });
            }
        })
        .catch(function(error){
            that.$message({
              message: '退出失败',
              type: 'error',
              duration: 1000
            });
            console.log(error);
            return false;
        });
      },
      changeIsBill(){
        console.log('this.isBill='+this.isBill);
        /*this.isBill = (this.isBill ? 0 : 1);*/
        if(this.isBill){
          this.$store.dispatch('changeIsBill',1);
        }else{
          this.$store.dispatch('changeIsBill',0);
        }
        // this.$store.dispatch('changeIsBill',this.isBill);
      }
    }
  }
</script>

<style>
  body{margin: 0;}
  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  /* 头部导航 */
  header{z-index: 1000;padding: 0 40px; transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
  header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
  header .el-row{height: 61px;line-height: 61px;}
  header .el-row .title{display: inline-block; width: auto;color: #303133;text-decoration: none;}
  header .el-row .title:hover{color: #409EFF;cursor: pointer;-webkit-transition:all .3s;transition:all .3s;}
  /* 主内容区 */
  main{    display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
  main .main-left{text-align: center;width: 200px;float: left;}
  main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 30px 50px; }
  main .el-menu{background-color: transparent!important;}
</style>
