<template>
  <el-dialog title="新增管理员" :visible.sync="showFlag" custom-class="dialog-small" @close="closeDialog">
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.name" placeholder="请输入管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item class="dialog-footer" align="center">
        <el-button type="primary" @click="onConfirm">保 存</el-button>
        <el-button @click="onCancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false,
      formData: {},
      formRules: {}
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
    closeDialog () {
      this.$refs['formData'].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>
