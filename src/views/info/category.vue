<template>
    <div id="category">
        <el-button type="danger" @click="category=!category">添加一级分类</el-button>
        <hr style="margin:30px -30px 30px -30px;border:1px solid #DCDFE6;">
        <div>
            <el-row :gutter="30">
                <el-col :span="8" class="category-warp">
                    <div class="category" v-for="firstItem in categorys.item" :key="firstItem.id">
                        <h4>
                            <svg-icon icon-class="add"></svg-icon>
                            {{firstItem.category_name}}
                            <div class="button-group">
                                <el-button size="mini" type="danger" round>编辑</el-button>
                                <el-button size="mini" type="success" round>添加子类</el-button>
                                <el-button size="mini" round>删除</el-button>
                            </div>
                        </h4>
                        <ul v-if="firstItem.children">
                            <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                {{childrenItem.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round>编辑</el-button>
                                    <el-button size="mini" round>删除</el-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">
                        一级分类编辑
                    </h4>
                    <el-form label-width="120px" :model="form" :rules="rules" ref="ruleForm" class="form-warp">
                        <el-form-item label="一级分类名称：" v-if="category" prop="categoryName">
                            <el-input v-model="form.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" v-else prop="secCategoryName">
                            <el-input v-model="form.secCategoryName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit('ruleForm')" :loading="btnSubmitState">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div>{{categorys}}123</div>
    </div>
</template>
<script>
    import {reactive, ref, onMounted} from "@vue/composition-api"
    import {AddFirstCategory, GetCategory} from "@/api/news"
    import {striptscript} from "@/utils/validate"

    export default {
        name: "category",
        setup(props, {root, refs}) {
            /*分类提交数据 reactive*/
            const form = reactive({
                categoryName: '',
                secCategoryName: ''
            })
            const rules = reactive({
                categoryName: [
                    {validator: categoryName, trigger: 'blur'}
                ],
                secCategoryName: [
                    {validator: secCategoryName, trigger: 'blur'}
                ],
            })
            /*分类信息*/
            let categorys = reactive({item:[]})
            /*ref*/
            const category = ref(false)
            let btnSubmitState=ref(false)
            /*验证第一级分类*/
            let categoryName = (rule, value, callback) => {
                form.categoryName = striptscript(value); //过滤一次
                value = form.categoryName; //赋值回去
                if (!value) {
                    callback(new Error('请输入一级分类'));
                } else if (value != form.categoryName) {
                    callback(new Error('一级分类不正确'));

                } else {
                    callback();
                }
            };
            /*验证第二级分类*/
            let secCategoryName = (rule, value, callback) => {
                form.secCategoryName = striptscript(value);
                value = form.secCategoryName;
                if (!value) {
                    callback(new Error('请输入二级分类分类'));
                } else if (value != form.secCategoryName) {
                    callback(new Error('二级分类不正确'));

                } else {
                    callback();
                }
            };
            /*提交*/
            const submit = formName => {
                refs[formName].validate((valid) => {
                    if (valid) {
                        /*这是提交一级分类*/
                        //把按钮变为loading状态
                        btnSubmitState.value=true;
                        AddFirstCategory({categoryName: form.categoryName}).then(res => {
                            if (res.resCode === 0)
                            {
                                root.$message({message: res.message, type: 'success'});
                                //添加成功需要把返回的数据重新添加到信息分类里面
                                categorys.item.push(res.data);

                            }
                            btnSubmitState.value=false
                            refs[formName].resetFields()
                        }).catch(err =>  btnSubmitState.value=false)
                    } else {

                        return false;
                    }


                })
            }
            /*获取分类信息*/
            const getCategory = () => {
                GetCategory({}).then(res => {
                    if(res.resCode==0)
                    {
                        categorys.item=res.data.data;
                        console.log(categorys);
                    }else
                    {
                        root.$message();
                    }

                }).catch(err => {
                    console.log(err)
                })

            }
            /*元素加载完成以后*/
            onMounted(() => {
                getCategory()
            })

            return {
                form,
                category,
                submit,
                rules,
                categorys,
                btnSubmitState
            }

        }

    }
</script>

<style lang="scss" scoped>
    @import "@/styles/config.scss";

    .menu-title {
        line-height: 44px;
        background-color: #f3f3f3;
        padding-left: 22px;
    }

    .category-warp {
        cursor: pointer;

        div:first-child {
            &:before {
                top: 20px;
            }
        }

        div:last-child {
            &:before {
                bottom: 20px;
            }
        }
    }

    .category {
        line-height: 44px;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            width: 32px;
            border-left: 1px dotted #000;
            left: 22px;
            top: 0;
            bottom: 0;
        }

        h4 {
            padding-left: 40px;
            position: relative;

            svg {
                position: absolute;
                top: 12px;
                left: 13px;
                font-size: 17px;
                border: 1px solid #000;
                background-color: white;
            }


        }

        li {
            margin-left: 24px;
            padding-left: 36px;
            position: relative;

            &:before {
                content: '';
                position: absolute;
                width: 32px;
                border-bottom: 1px dotted #000;
                left: 0;
                top: 50%;
            }
        }
    }

    li, h4 {
        &:hover {
            @include webkit(transition, all .5s ease 0);
            background-color: #f3f3f3;
            .button-group{
                display: block;
            }

        }
    }

    .button-group {
        display: none;
        position: absolute;
        z-index: 2;
        right: 10px;
        top: 0;

        button {
            font-size: 12px;
        }
    }

    .form-warp {
        width: 440px;
        padding-top: 22px;

        .el-form-item {
            margin-bottom: 22px;

        }
    }

</style>