<template>
  <el-dialog title="新增周报" :visible.sync="showFlag" top="7vh" @close="closeDialog">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="周报时间">
        <el-date-picker
          v-model="form.weekOfYear"
          type="week"
          format="yyyy 第 WW 周"
          value-format="yyyy-MM-dd"
          placeholder="选择周"
          :picker-options="pickerOptions">
        </el-date-picker>
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
      form: {},
      rules: {},
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
      let weekOfYear = this.form.weekOfYear
      console.log('form.weekOfYear==' + weekOfYear)

      let yearNum = this.$moment(weekOfYear).year()
      console.log('yearNum===' + yearNum)

      let weekNum = this.$moment(weekOfYear).week()
      console.log('weekNum===' + weekNum)

      let weekStart = this.$moment(weekOfYear).startOf('week').format('YYYY-MM-DD')
      console.log('weekStart===' + weekStart)

      let weekEnd = this.$moment(weekOfYear).endOf('week').format('YYYY-MM-DD')
      console.log('weekEnd===' + weekEnd)
      // this.changeShowFlag()
    },
    // 取消
    onCancel () {
      this.changeShowFlag()
    },
    // 关闭弹出框
    closeDialog () {}
  }
}
</script>

<style lang="scss">
.quill-editor { height: 200px; }
.quill-editor .ql-container { height: 70%; }
.limit { height: 30px; border: 1px solid #ccc; line-height: 30px; text-align: right; }
.limit span { color: #ee2a7b; }

.ql-snow .ql-editor img { max-width: 480px; }

.ql-editor .ql-video { max-width: 480px; }
</style>
