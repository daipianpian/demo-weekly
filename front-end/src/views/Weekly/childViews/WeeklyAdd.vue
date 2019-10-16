<template>
  <div class="weekly-main-wrap weekly-add-wrap">
    <h3 class="v-line-icon">新增周报</h3>
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="110px">

      <el-form-item label="周报时间" prop="title">
        <el-col :span="12">
          <el-date-picker
            v-model="formData.title"
            type="week"
            format="yyyy 第 WW 周"
            value-format="yyyy-MM-dd"
            placeholder="选择周"
            :picker-options="pickerOptions">
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
        <quill-editor class="quill" :options="editorOption" ref="QuillEditor" v-model="formData.thisWeekWork">
        </quill-editor>
      </el-form-item>

      <el-form-item label="下周工作计划" prop="nextWeekWork">
        <quill-editor class="quill" :options="editorOption" ref="QuillEditor" v-model="formData.nextWeekWork">
        </quill-editor>
      </el-form-item>

      <el-form-item label="需协调与帮助" prop="collaboration">
        <el-input v-model="formData.collaboration"></el-input>
      </el-form-item>

      <el-form-item class="dialog-footer" align="center">
        <el-button type="primary" @click="onSave('formData')">保 存</el-button>
        <el-button @click="onCancel('formData')">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { weeklyAdd } from '@/config/interface'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      formData: {
        title: this.$moment().format('YYYY-MM-DD'),
        thisWeekWork: null,
        nextWeekWork: null,
        collaboration: null
      },
      formRules: {
        title: [
          { required: true, message: '请选择周报时间', trigger: 'blur' }
        ],
        thisWeekWork: [
          { required: true, message: '请填写本周工作总结', trigger: 'blur' }
        ]
      },
      reqFlag: {
        add: true
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
  },
  methods: {
    // 初始化
    init () {

    },
    // 保存
    onSave (formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const url = weeklyAdd
          if (this.reqFlag.add) {
            this.reqFlag.add = false

            let title = this.formData.title
            console.log('formData.title==' + title)

            let yearNum = this.$moment(title).year()
            console.log('yearNum==' + yearNum)

            let weekNum = this.$moment(title).week()
            console.log('weekNum==' + weekNum)

            let params = {
              title: yearNum + ' 第 ' + weekNum + ' 周',
              startTime: this.startTime,
              endTime: this.endTime,
              thisWeekWork: this.formData.thisWeekWork,
              nextWeekWork: this.formData.nextWeekWork,
              collaboration: this.formData.collaboration
            }
            this.$http(url, params)
            .then(res => {
              if (res.code == 1) {
                this.$common.toast('添加成功', 'success', false)
                this.onCancel(formData)
              }
              this.reqFlag.add = true
            })
          }
        } else {
          console.log('error submit!!')
          return false
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
