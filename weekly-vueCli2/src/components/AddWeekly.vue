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
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>

        <el-col class="line" :span="4" align="center">-</el-col>

        <el-col :span="12">
          <el-date-picker
            v-model="form.weekOfYear"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周">
          </el-date-picker>
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: '',
  data () {
    return {
      form: {
        weekTime: [],
        weekOfYear: '',
        thisWeekWork: '',
        nextWeekWork: '',
        collaboration: ''
      },
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
  components: {
    
  },
  methods: {
    onSubmit() {
      var that = this;

      that.form.weekOfYear = that.getWeekNumber(that.form.weekOfYear);

      var params = {
        adminId: sessionStorage.getItem('adminId'),
        weekTime: that.form.weekTime,
        weekOfYear: that.form.weekOfYear,
        thisWeekWork: that.form.thisWeekWork,
        nextWeekWork: that.form.nextWeekWork,
        collaboration: that.form.collaboration
      };
      that.$axios.post('/admin/Operate/addWeekly',params,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        var data = res.data;
        var status = data.status;
        if(status){
          that.$router.replace('weekly');
        }
      })
      .catch(function(error){
        console.log(error)
      });
    },
    getWeekNumber(src){
      var date = new Date(src.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
      // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
      var weekYear = date.getFullYear();
      var weekNum = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);

      return weekYear+' 第 '+weekNum+' 周';

    },
    onCancel(){
      this.form = {
        weekTime: [],
        weekOfYear: '',
        thisWeekWork: '',
        nextWeekWork: '',
        collaboration: ''
      }
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
</style>
