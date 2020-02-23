<template>
    <div id="category">
        <el-button type="danger" @click="category=!category">添加一级分类</el-button>
        <hr style="margin:30px -30px 30px -30px;border:1px solid #DCDFE6;">
        <div>
            <el-row :gutter="30">
                <el-col :span="8" class="category-warp">
                    <div class="category">
                        <h4>
                            <svg-icon icon-class="add"></svg-icon>
                            新闻
                            <div class="button-group">
                                <el-button size="mini" type="danger" round>编辑</el-button>
                                <el-button size="mini" type="success" round>添加子类</el-button>
                                <el-button size="mini" round>删除</el-button>
                            </div>
                        </h4>
                        <ul>
                            <li>
                                国内
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round>编辑</el-button>
                                    <el-button size="mini" round>删除</el-button>
                                </div>
                            </li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>

                        </ul>
                    </div>
                    <div class="category">
                        <h4>
                            <svg-icon icon-class="add"></svg-icon>
                            新闻
                        </h4>
                        <ul>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>

                        </ul>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">
                        一级分类编辑
                    </h4>
                    <el-form label-width="120px" :model="form" :rules="rules"  ref="ruleForm"  class="form-warp">
                        <el-form-item label="一级分类名称：" v-if="category" prop="categoryName">
                            <el-input v-model="form.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" v-else prop="secCategoryName">
                            <el-input v-model="form.secCategoryName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit('ruleForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {reactive, ref} from "@vue/composition-api"
    import {AddFirstCategory} from "@/api/news"
    import {striptscript} from "@/utils/validate"

    export default {
        name: "category",
        setup(props, {root, refs}) {
            const form = reactive({
                categoryName: '',
                secCategoryName: ''
            })
            const rules = reactive({
                categoryName: [
                    {validator: vcategoryName, trigger: 'blur'}
                ],
                secCategoryName: [
                    {validator: vsecCategoryName, trigger: 'blur'}
                ],
            })
            const category = ref(false)
            const vcategoryName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入一级分类'));
                } else if (striptscript(value)) {
                    callback(new Error('一级分类不正确'));

                } else {
                    callback();
                }
            };
            const vsecCategoryName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入二级分类分类'));
                } else if (striptscript(value)) {
                    callback(new Error('二级分类不正确'));

                } else {
                    callback();
                }
            };
            const submit = formName=> {refs[formName].validate((valid) => {
                console.log(valid);
                if (valid) {
                         alert('submit!');
                     } else {
                         console.log('error submit!!');
                         return false;
                     }

                 /*   AddFirstCategory({categoryName: form.categoryName}).then(res => {
                        if (res.resCode === 0)
                            root.$message({message: res.message, type: 'success'})
                    }).catch(err => console.log(err))*/

            })}


            return {
                form,
                category,
                submit,
                rules
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