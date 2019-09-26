<template>
  <el-dialog title="提示" :visible.sync="showFlag" custom-class="dialog-small" @close="closeDialog">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onConfirm">确 定</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false
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
      this.changeShowFlag()
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

</style>
