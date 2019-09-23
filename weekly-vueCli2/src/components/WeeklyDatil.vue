<template>
  <div v-cloak class="weekly-datil">
    <div class="datil-info">
    	<el-row>
    	  <el-col :span="4"><div class="grid-content grid-content-left">序号(ID)</div></el-col>
    	  <el-col :span="20"><div class="grid-content grid-content-right">{{weeklyDatil.id}}</div></el-col>
    	</el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">创建者</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right">{{weeklyDatil.adminName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">起始日期</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right">{{weeklyDatil.startTime}} ~ {{weeklyDatil.endTime}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">第几周</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right">{{weeklyDatil.weekOfYear}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">这周完成工作</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right" v-html="weeklyDatil.thisWeekWork"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">下周工作计划</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right" v-html="weeklyDatil.nextWeekWork"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content grid-content-left">需协调与帮助</div></el-col>
        <el-col :span="20"><div class="grid-content grid-content-right">{{weeklyDatil.collaboration}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24" align="center">
          <el-button type="primary" @click="goWeekly">返回到列表</el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>无相关周报信息，请返回周报列表！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>

  </div>

  

</template>

<script>
export default {
  name: '',
  data () {
    return {
      id: this.$route.query.id,
      weeklyDatil: {},
      dialogVisible: false
    }
  },
  created() {
    if(this.id>0){
      this.fetchData();
    }else{
      this.dialogVisible = !this.dialogVisible;
    }
  },
  methods: {
    fetchData() {
      var that = this;
      var params = {
        id: that.id,
        adminId: sessionStorage.getItem('adminId')
      };
      that.$axios.post('/admin/Weekly/getWeeklyDatil',params,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function(res){
          console.log(res);
          var data = res.data;
          var status = data.status;
          if(status){
            that.weeklyDatil = data.data;
          }
        })
        .catch(function(error){
          console.log(error)
        });
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
      return this.$router.push('/home/weekly');
    },
    goWeekly() {
      var that = this;
      that.$router.replace('weekly');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weekly-datil {width:1120px;margin:0 auto;}
  .weekly-datil .datil-info .el-row{padding:25px 0;/* line-height: 1; */color: #909399;font-size: 14px; border-bottom: solid 1px #e6e6e6;}
  .weekly-datil .datil-info .el-row:last-child{border:none;}

  .weekly-datil .datil-info .grid-content-left{padding:0 20px; color: #909399;text-align: right;}
  .weekly-datil .datil-info .grid-content-right{padding:0 20px;color: #606266;}
</style>
