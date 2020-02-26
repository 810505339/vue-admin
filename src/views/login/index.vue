<template>
    <div id="login">

        <div class="login-wrap">

            <ul class="menu-tab">
                <li :class="{'current':item.current}" v-for="(item,index) in menutab" :key="item.text" @click="toggleMenu(item)">{{item.text}}</li>
            </ul>
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item  prop="username" class="item-from">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="password"  class="item-from">
                    <label for="password">密码</label>
                    <el-input  id="password" type="password"  v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item  prop="passwords"  class="item-from" v-show="model=='register'">
                    <label for="passwords">重复密码</label>
                    <el-input type="password" id="passwords" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code"  class="item-from">
                    <label for="code">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15"><el-input @keyup.13.native="submitForm('ruleForm')" id="code" v-model="ruleForm.code"  autocomplete="off"  minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9"><el-button type="success" class="block" @click="getSms()" :disabled="yzmBtn.State">{{yzmBtn.Text}}</el-button></el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class=" login-btn block" :disabled="btnState">{{model=='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {striptscript,validateEmail,validateCode,validatePass} from "utils/validate";
    import {isRef, onMounted, reactive, ref, toRefs} from "@vue/composition-api";
    import Cookies from 'js-cookie';
    import {GetSms, Login, Register} from "@/api/login";

    import sha1 from 'js-sha1';
    export default {
        name: "index",
        setup(props,{root,refs}){

            /*声明验证函数*/
            /*密码验证*/
            let password = (rule, value, callback) => {
                ruleForm.password=striptscript(value)
                value=ruleForm.password

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
                console.log(value)
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
                ruleForm.passwords=striptscript(value)
                value=ruleForm.passwords
                /*如果是登录的话直接不用验证了*/
                if(model.value =='login')
                {
                    callback()
                }
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                }else if(value!=ruleForm.passwords){
                    return callback(new Error('重复密码不正确'));
                }else {
                    return  callback();
                }

            }
           /*对象声明reactive*/
           const menutab=reactive([
               {text:'登录',current:true,type:'login'},
               {text:'注册',current: false,type: 'register'}
               ])
            /*声明rules*/
            const rules=reactive({
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
            })

            /*声明ruleForm*/
            const ruleForm= reactive({
                username: '',
                password: '',
                code: '',
                passwords:''
            })

            //验证码状态
            const yzmBtn=reactive({
                State:false,
                Text:'获取验证码'
            })
            /*挂载完成以后*/
            onMounted(()=>{


            })
            /*基础类型ref
         * isRef 判断是否是基础数据类型
         * toRefs把对象类型转成基础类型
         * */
            const model=ref('login')
            //点击提交按钮状态
            const btnState=ref(true)

            //倒计时
            const timer=ref(null)
            console.log(model.value)
            console.log(isRef(model)?true:false)
            console.log(toRefs(menutab))
            /*切换登录注册*/
            const toggleMenu=data =>{
                menutab.forEach(item=>{
                    item.current=false;
                })
                    data.current=true;
                model.value=data.type;
                //清理表单
                resetFields();
                clearCountDown();
            }
            /*更新按钮状态*/
            const updateBtnState=((params)=>{
                yzmBtn.State=params.State;
                yzmBtn.Text=params.Text;
            })
            /*清理表单*/
            const resetFields=(()=>{
                refs.ruleForm.resetFields();
            })
            /*提交按钮*/
            const submitForm=formName=> {
                refs[formName].validate((valid) => {
                    if (valid) {
                        let data={
                            username:ruleForm.username,
                            //sha1(ruleForm.password)
                            password:ruleForm.password,
                            code:ruleForm.code
                        }
                        //请求注册接口
                       model.value=='login'?login(data):register(data)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
            /*获取验证码*/
            const getSms=()=>{

                if(ruleForm.username=="")
                {
                    root.$message.error('请输入邮箱');
                }else if(validateEmail(ruleForm.username)){
                    root.$message.error('邮箱格式不正确');
                }
                else {
                    updateBtnState({
                        State:true,
                        Text:'发送中'
                    })
                   setTimeout(()=>{
                       //发送验证码
                       GetSms({username:ruleForm.username,module:model.value}).then(res=>{
                           if(res.resCode==0)
                           {
                               btnState.value=false
                               //定时器
                               countDown(60);
                               root.$message({
                                   message: res.message,
                                   type: 'success'
                               });
                           }

                       }).catch(err=>console.log(err))

                   },1000)
                }

            }
            /*调用登录接口*/
            const login=((data)=>{
                root.$store.dispatch('app/login',data).then(res=>{
                    if(res.resCode==0)
                    {
                        //登录成功
                        root.$message({
                            message: res.message,
                            type: 'success'
                        });
                        //跳转路由
                        root.$router.push({
                            name:'Console',
                            path:'/console'
                        });
                    }
                }).catch(err=>console.log(err))

                // Login(data).then(res=>{
                //     if(res.resCode==0)
                //     {
                //         //登录成功
                //         root.$message({
                //             message: res.message,
                //             type: 'success'
                //         });
                //         //跳转路由
                //         root.$router.push({
                //             name:'Console',
                //             path:'/console'
                //         });
                //     }
                // }).catch(err=>console.log(err))

            })
            /*调用注册接口*/
            const register=((data)=>{
                Register(data).then(res=>{
                    if(res.resCode==0)
                    {
                        //注册成功
                        root.$message({
                            message: res.message,
                            type: 'success'
                        });
                        setTimeout(()=>{
                            toggleMenu(menutab[0])

                        },500)
                    }
                }).catch(err=>console.log(err))

            })
            /*倒计时*/
            const countDown=((number)=>{
                let time=number;
                //判断是否存在计时器，存在就清除
                if(time.value)
                {
                    clearInterval(timer.value);
                }
                timer.value = setInterval(()=>{
                    if(time === 0)
                    {
                     clearInterval(timer.value)
                        updateBtnState({
                            State:false,
                            Text:'再次获取'
                        })
                    }else {
                        time--;
                        yzmBtn.Text=`倒计时${time}秒`
                    }
                },1000)
            })
            /*清除定时器*/
            const clearCountDown=(()=>{
                updateBtnState({
                    State:false,
                    Text:'获取验证码'
                });
                clearInterval(timer.value)
            })

            const get = () => { Cookies.get('username'); }
            return{
                toggleMenu,
                submitForm,
                getSms,
                menutab,
                ruleForm,
                model,
                rules,
                btnState,
                yzmBtn,
                timer
            }

        },
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