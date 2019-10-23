<template>
  <el-dialog title="新增管理员" :visible.sync="showFlag" custom-class="dialog-small" @close="closeDialog">
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="formData.name" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item class="dialog-footer" align="center">
        <el-button type="primary" @click="onSave('formData')">保 存</el-button>
        <el-button @click="onCancel('formData')">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { userDetail, userUpdateInfo } from '../../config/interface'
export default {
  data () {
    const validate = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]*$/g
      if (!value) {
        callback(new Error('请输入内容'))
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error('内容长度需在 3 到 6 个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('内容需为字母或数字'))
      } else {
        callback()
      }
    }
    return {
      showFlag: false,
      formData: {
        name: null,
        password: null,
        email: null
      },
      formRules: {
        name: [
          { validator: validate, trigger: 'blur' }
        ],
        password: [
          { validator: validate, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      reqFlag: {
        edit: true
      }
    }
  },
  components: {
  },
  created () {
  },
  methods: {
    // 初始化
    init (id) {
      this.$nextTick(() => {
        this.id = id
        this.getUserDetail()
        console.log('this.id==' + this.id)
        this.changeShowFlag()
      })
    },
    changeShowFlag () {
      this.showFlag = !this.showFlag
    },
    getUserDetail () {
      const url = userDetail
      let params = {
        id: this.id
      }
      this.$http(url, params)
      .then(res => {
        if (res.code == 1) {
          let data = res.data
          this.formData = {
            name: data.name,
            password: null,
            email: data.email
          }
        }
      })
    },
    // 保存
    onSave (formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const url = userUpdateInfo
          if (this.reqFlag.edit) {
            this.reqFlag.edit = false
            let params = {
              id: this.id,
              name: this.formData.name,
              password: this.$md5(this.formData.password),
              email: this.formData.email
            }
            this.$http(url, params)
            .then(res => {
              if (res.code == 1) {
                this.$common.toast('修改成功', 'success', false)
                this.$emit('editCallBack')
                this.onCancel(formData)
              }
              this.reqFlag.edit = true
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
      this.changeShowFlag()
      this.$refs[formName].resetFields()
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
