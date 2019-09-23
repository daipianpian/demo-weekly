<template>
<div class="login-page-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleLogin" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            logining: false,
            ruleForm: {
                account: '',
                checkPass: ''
            },
            rules: {
                account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                checkPass: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true
        };
    },
    methods: {
        handleLogin(ev) {
            var that = this;
            that.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    that.logining = true;
                    var loginParams = {
                        name: this.ruleForm.account,
                        password: this.ruleForm.checkPass
                    };
                    that.$axios.post('/admin/Login/login',loginParams,{
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    })
                    .then(function(res){
                        console.log(res);
                        that.logining = false;
                        var data = res.data;
                        console.log(data);
                        if(data.status=='1'){

                            sessionStorage.setItem("adminId", data.adminId);
                            sessionStorage.setItem("adminName", data.adminName);
                            sessionStorage.setItem("loginTime", data.loginTime);
                            
                            that.$message({
                              message: '登陆成功',
                              type: 'success',
                              duration: 1000
                            });
                            return that.$router.push('/home/admin');
                        } 
                    })
                    .catch(function(error){
                        that.logining = false;
                        that.$message({
                            message: '登陆失败',
                            type: 'error',
                            duration: 1000
                        });
                        console.log(error);
                        return false;
                    });
                } else {
                    that.logining = false;
                    that.$message({
                        message: '登陆失败',
                        type: 'error',
                        duration: 1000
                    });
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 280px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login-container h3{text-align: center;}
label.el-checkbox.remember {margin: 0px 0px 35px 0px;}
</style>