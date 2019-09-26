<template>
  <el-dialog title="新增管理员" :visible.sync="showFlag" custom-class="dialog-small" @close="closeDialog">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name" placeholder="请输入管理员邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onConfirm">确 定</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false,
      form: {},
      rules: {}
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
