<template>
  <el-dialog title="新增周报" :visible.sync="showFlag" top="7vh" @close="closeDialog">
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="120px">

      <el-form-item label="周报时间">
        <el-col :span="12">
          <el-date-picker
            v-model="form.weekOfYear"
            type="week"
            format="yyyy 第 WW 周"
            value-format="yyyy-MM-dd"
            placeholder="选择周"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col class="week-time" :span="12">
          <span class="title">时间范围：</span>
          <span><i class="el-icon-date"></i> {{weekStartTime}}</span>
          <span class="line">-</span>
          <span><i class="el-icon-date"></i> {{weekEndTime}}</span>
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

      <el-form-item class="dialog-footer" align="center">
        <el-button type="primary" @click="onConfirm">保 存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      showFlag: false,
      formData: {
        weekOfYear: this.$moment().format('YYYY-MM-DD')
      },
      formRules: {},
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
  components: {
  },
  computed: {
    // 周报开始时间
    weekStartTime: function () {
      let weekOfYear = this.formData.weekOfYear
      let weekStartTime = this.$moment(weekOfYear).startOf('week').format('YYYY-MM-DD')
      return weekStartTime
    },
    // 周报结束时间
    weekEndTime: function () {
      let weekOfYear = this.formData.weekOfYear
      let weekEndTime = this.$moment(weekOfYear).endOf('week').format('YYYY-MM-DD')
      return weekEndTime
    }
  },
  created () {
  },
  methods: {
    // 初始化
    init () {
      this.$nextTick(() => {
        this.changeShowFlag()
      })
    },
    changeShowFlag () {
      this.showFlag = !this.showFlag
    },
    // 确定
    onConfirm () {
      let weekOfYear = this.formData.weekOfYear
      console.log('form.weekOfYear==' + weekOfYear)

      let yearNum = this.$moment(weekOfYear).year()
      console.log('yearNum===' + yearNum)

      let weekNum = this.$moment(weekOfYear).week()
      console.log('weekNum===' + weekNum)

      // this.changeShowFlag()
    },
    // 取消
    onCancel () {
      this.changeShowFlag()
    },
    // 关闭弹出框
    closeDialog () {
      this.$refs['formData'].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>
