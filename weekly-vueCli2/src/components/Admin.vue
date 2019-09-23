<template>
  <div class="admin-info">
    <!-- <div class="">用户Id={{adminId}}</div>
        <div class="">用户Name={{adminName}}</div>
    <div class="">登陆时间={{loginTime}}</div> -->
    <el-row>
      <el-col :span="10"><div class="grid-content grid-content-left">管理员Id</div></el-col>
      <el-col :span="14"><div class="grid-content grid-content-right">{{adminId}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><div class="grid-content grid-content-left">管理员昵称</div></el-col>
      <el-col :span="14"><div class="grid-content grid-content-right">{{adminName}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="10"><div class="grid-content grid-content-left">管理员登陆时间</div></el-col>
      <el-col :span="14"><div class="grid-content grid-content-right">{{loginTime}}</div></el-col>
    </el-row>
    <!-- <div>用户信息页isBill = {{isBill}}</div> -->
    <!-- <el-switch
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch> -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      value2: true,
      adminId: sessionStorage.getItem('adminId'),
      adminName: sessionStorage.getItem('adminName'),
      loginTime: sessionStorage.getItem('loginTime')
    }
  },
  computed: {
      isBill: {
        get: function () {
          return this.$store.state.isBill
        },
        set: function () {
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .admin-info {width:500px;margin:0 auto;}
  .admin-info .el-row{padding:25px 0;/* line-height: 1; */color: #909399;font-size: 14px; border-bottom: solid 1px #e6e6e6;}
  .admin-info .el-row:last-child{border:none;}

  .admin-info .grid-content-left{padding:0 20px; color: #909399;text-align: right;}
  .admin-info .grid-content-right{padding:0 20px;color: #606266;}
</style>
