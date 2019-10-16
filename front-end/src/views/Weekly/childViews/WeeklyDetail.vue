<template>
  <div class="weekly-main-wrap weekly-add-wrap">
    <h3 class="v-line-icon">周报详情</h3>
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="110px">

      <el-form-item label="周报时间" prop="title">
        <el-col :span="12">
          <el-date-picker
            v-model="formData.title"
            type="week"
            format="yyyy 第 WW 周"
            value-format="yyyy-MM-dd"
            placeholder="选择周"
            :picker-options="pickerOptions"
            :disabled="true">
          </el-date-picker>
        </el-col>
        <el-col class="week-time" :span="12">
          <span class="title">时间范围：</span>
          <span><i class="el-icon-date"></i> {{startTime}}</span>
          <span class="line">-</span>
          <span><i class="el-icon-date"></i> {{endTime}}</span>
        </el-col>
      </el-form-item>

      <el-form-item label="本周工作总结" prop="thisWeekWork">
        <div class="week-work-box" v-html="formData.thisWeekWork"></div>
      </el-form-item>

      <el-form-item label="下周工作计划" prop="nextWeekWork">
        <div class="week-work-box" v-html="formData.nextWeekWork"></div>
      </el-form-item>

      <el-form-item label="需协调与帮助" prop="collaboration">
        <el-input v-model="formData.collaboration" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item class="dialog-footer" align="center">
        <el-button @click="onCancel('formData')">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { weeklyDetail } from '@/config/interface'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      id: null, // 周报id
      formData: {
        title: this.$moment().format('YYYY-MM-DD'),
        thisWeekWork: null,
        nextWeekWork: null,
        collaboration: null
      },
      formRules: {},
      reqFlag: {
        edit: true
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      editorOption: {
        modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
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
  computed: {
    // 周报开始时间
    startTime: function () {
      let title = this.formData.title
      let startTime = this.$moment(title).startOf('week').format('YYYY-MM-DD')
      return startTime
    },
    // 周报结束时间
    endTime: function () {
      let title = this.formData.title
      let endTime = this.$moment(title).endOf('week').format('YYYY-MM-DD')
      return endTime
    }
  },
  created () {
    this.id = this.$route.query.id
    console.log('this.id==' + this.id)
    this.getUserDetail()
  },
  methods: {
    getUserDetail () {
      const url = weeklyDetail
      let params = {
        id: this.id
      }
      this.$http(url, params)
      .then(res => {
        if (res.code == 1) {
          let data = res.data
          this.formData = {
            title: data.startTime,
            thisWeekWork: data.thisWeekWork,
            nextWeekWork: data.nextWeekWork,
            collaboration: data.collaboration
          }
        }
      })
    },
    // 取消
    onCancel (formName) {
      this.$router.push({ path: '/home/weekly' })
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>
