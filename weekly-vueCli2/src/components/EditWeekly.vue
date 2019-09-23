<template>
  <div v-cloak style="width:1200px;margin:0 auto;">
  	<el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="周报时间">
        <el-col :span="8">
          <el-date-picker
            v-model="form.weekTime" value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" :disabled="true">
          </el-date-picker>
        </el-col>

        <el-col class="line" :span="4" align="center">-</el-col>

        <el-col :span="12">
          <div class="weeknum">
            <input type="text" disabled v-model="form.weekOfYear">
            <span class="input-prefix">
              <i class="el-input__icon el-icon-date"></i>
            </span>
          </div>
        </el-col>
      </el-form-item>

      <el-form-item label="这周完成工作">
        <quill-editor class="quill" :options="editorOption" ref="QuillEditor" v-model="form.thisWeekWork">
        </quill-editor>
      </el-form-item>

      <el-form-item label="下周工作计划">
        <quill-editor class="quill" :options="editorOption" ref="QuillEditor" v-model="form.nextWeekWork">
        </quill-editor>
      </el-form-item>

      <el-form-item label="需协调与帮助">
        <el-input v-model="form.collaboration"></el-input>
      </el-form-item>

      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit">更新数据</el-button>
        <el-button @click="goWeekly">取消</el-button>
      </el-form-item>

    </el-form>

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
import { quillEditor } from 'vue-quill-editor'
export default {
  name: '',
  data () {
    return {
      id: this.$route.query.id,
      dialogVisible: false,
      form: {},
      editorOption:{
          modules:{
              toolbar:[
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }]
              ]
          }
      }
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
          var data = res.data;
          var status = data.status;
          if(status){
            that.form = data.data;
            that.form.weekTime = [that.form.startTime,that.form.endTime];
          }
        })
        .catch(function(error){
          console.log(error)
        });
    },
    onSubmit() {
      var that = this;
      var params = {
        id: that.form.id,
        adminId: sessionStorage.getItem('adminId'),
        thisWeekWork: that.form.thisWeekWork,
        nextWeekWork: that.form.nextWeekWork,
        collaboration: that.form.collaboration
      };
      that.$axios.post('/admin/Weekly/updateWeekly',params,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        console.log(res);
        var data = res.data;
        var status = data.status;
        if(status){
          console.log('更新成功');
          return that.$router.push(
            {path:'weekly-datil',query:{ id:that.form.id }}
          );
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
    goWeekly(){
      var that = this;
      that.$router.replace('weekly');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .quill-editor { height: 200px; }
  .quill-editor .ql-container { height: 70%; }
  .limit { height: 30px; border: 1px solid #ccc; line-height: 30px; text-align: right; }
  .limit span { color: #ee2a7b; }

  .ql-snow .ql-editor img { max-width: 480px; }

  .ql-editor .ql-video { max-width: 480px; }

  .weeknum{ position: relative; font-size: 14px; display: inline-block; width: 220px; text-align: left; line-height: 40px; }
  .weeknum  input{ -webkit-appearance: none; background-color: #fff; background-image: none; border-radius: 4px; border: 1px solid #dcdfe6; -webkit-box-sizing: border-box; box-sizing: border-box; color: #606266; display: inline-block; font-size: inherit; height: 40px; line-height: 40px; outline: 0; -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1); transition: border-color .2s cubic-bezier(.645,.045,.355,1); width: 100%; padding-left: 30px; padding-right: 30px; background-color: #f5f7fa; border-color: #e4e7ed; color: #c0c4cc; cursor: not-allowed; }
  .weeknum  .input-prefix{ position: absolute; top: 0; height: 100%; color: #c0c4cc; text-align: center; left: 5px; -webkit-transition: all .3s; transition: all .3s; }
  .el-icon-date:before { content: "\e608"}
</style>
