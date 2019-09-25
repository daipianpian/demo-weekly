<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-main">
      <h3 class="title">周报管理系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitLogin('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '登陆成功',
            type: 'success',
            duration: 2000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.login-container{width: 100vw; height: 100vh;background-image:url('../assets/images/login_bg.png'); background-size: cover; overflow: hidden;
  .login-main{ -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; background-clip: padding-box; margin: 280px auto; width: 350px; padding: 35px 35px 15px; background: #fff; border: 1px solid #eaeaea; box-shadow: 0 0 25px #cac6c6;
    h3{text-align: center;}
    .btn-box{text-align: center;}
  }
}
</style>
