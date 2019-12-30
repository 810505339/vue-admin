
<template>
    <div id="login">

        <div class="login-wrap">

            <ul class="menu-tab">
                <li :class="{'current':item.current}" v-for="(item,index) in menutab" :key="item.text" @click="toggleMenu(item)">{{item.text}}</li>
            </ul>
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item  prop="username" class="item-from">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="password"  class="item-from">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item  prop="passwords"  class="item-from" v-show="model=='register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code"  class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code"  autocomplete="off"  minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9"><el-button type="success" class="block">验证码</el-button></el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class=" login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {striptscript,validateEmail,validateCode,validatePass} from "utils/validate"
    export default {
        name: "index",
        data(){
            /*密码验证*/
            let password = (rule, value, callback) => {
                this.password=striptscript(value)
                value=this.password

                if (!value) {
                    return callback(new Error('密码不能为空'));
                }else if(validatePass(value)){
                    return callback(new Error('密码为6-20数字+字母'));
                }else {
                    return  callback();
                }

            };
            /*邮箱验证*/
            let username = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入邮箱'));
                } else if(validateEmail(value)) {
                    callback(new Error('邮箱格式不正确'));

                }else {
                    callback();
                }
            }; //验证用户名
            /*验证码验证*/
            let code = (rule, value, callback) => {

                if (!value) {
                    callback(new Error('请输入验证码'));
                } else if (validateCode(value)) {
                    callback(new Error('验证码格式错误'));
                } else {
                    callback();
                }

            };
            /*重复密码验证*/
            let passwords=(rule,value,callback)=>{
                this.passwords=striptscript(value)
                value=this.passwords
                /*如果是登录的话直接不用验证了*/
                if(this.model=='login')
                    {
                        callback()
                    }
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                }else if(value!=this.password){
                    return callback(new Error('重复密码不正确'));
                }else {
                    return  callback();
                }

            }
            return{
                menutab: [{text:'登录',current:true,type:'login'}, {text:'注册',current: false,type: 'register'}],
                model:'login',
                ruleForm: {
                    username: '',
                    password: '',
                    code: '',
                    passwords:''
                },
                rules: {
                    username: [
                        { validator: username, trigger: 'blur' }
                    ],
                    password: [
                        { validator: password, trigger: 'blur' }
                    ],
                    code: [
                        { validator: code, trigger: 'blur' }
                    ],
                    passwords:[
                        {validator:passwords,trigger:'blur' }
                    ]
                }
            }
        },
        methods:{
            toggleMenu(item){
                this.menutab.forEach(item=>{
                    item.current=false;
                })
                item.current=true;
                this.model=item.type;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style  lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }
    .login-wrap {
        width: 330px;
        margin: auto;
    }
    .menu-tab {
        text-align: center;
        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }
        .current {
            background-color: rgba(0, 0, 0, .1);
        }
    }
    .login-form {
        margin-top: 29px;
        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }
        .item-from { margin-bottom: 13px; }
        .block {
            display: block;
            width: 100%;
        }
        .login-btn { margin-top: 19px; }
    }

</style>