<template>
    <div id="category">
        <el-button type="danger" @click="btnAddFirst({level: 'addCategory'})">添加一级分类</el-button>
        <hr style="margin:30px -30px 30px -30px;border:1px solid #DCDFE6;">
        <div>
            <el-row :gutter="30">
                <el-col :span="8" class="category-warp">
                    <div class="category" v-for="firstItem in categorys.item" :key="firstItem.id">
                        <h4>
                            <svg-icon icon-class="add"></svg-icon>
                            {{firstItem.category_name}}
                            <div class="button-group">
                                <el-button size="mini" type="danger" round
                                           @click="btneditCategory({data:firstItem,level:'firstCategory'})">编辑
                                </el-button>
                                <el-button size="mini" type="success" round @click="btnAddSecond()">添加子类
                                </el-button>
                                <el-button size="mini" round @click="btnDeleteCategory(firstItem.id)">删除</el-button>
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
                        分类编辑
                    </h4>
                    <el-form label-width="120px" :model="form" :rules="rules" ref="ruleForm" class="form-warp"
                             :style="{'display':(formState ? 'block' : 'none')}">
                        <el-form-item label="一级分类名称：" v-if="categoryDisabled" prop="categoryName">
                            <el-input v-model="form.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" v-else prop="secCategoryName">
                            <el-input v-model="form.secCategoryName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit('ruleForm')" :loading="btnSubmitState">确定
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {reactive, ref, onMounted, watch} from "@vue/composition-api"
    import {AddFirstCategory, GetCategory, deleteCategory, editCategory, getInfoList} from "@/api/news"
    import {striptscript} from "@/utils/validate"
    import {Message} from "element-ui";
    import {common} from "@/api/common";

    export default {
        name: "category",
        setup: function (props, {root, refs}) {
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
            let categorys = reactive({item: [], current: []});
            /*ref*/
            let categoryDisabled = ref(false);
            let btnSubmitState = ref(false);
            let formState = ref(false);
            let btnSubmitType = ref('');
            const {getInfoCategory, category} = common();
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
                        btnSubmitState.value = true;
                        if (btnSubmitType.value && btnSubmitType.value != '') {
                            switch (btnSubmitType.value) {
                                case'addCategory': //添加接口
                                    console.log(btnSubmitType.value);
                                    addCategoryApi();
                                    break;
                                case'firstCategory'://编辑一级分类
                                    categorys.current.id ? editCategoryApi()
                                        : root.$message({message: '请填写分类！！！', type: 'warning'});
                                    break;
                                default:
                                    Message.error("提交错误！");
                                    btnSubmitState.value = false;
                            }
                        }
                    } else {

                        return false;
                    }


                })
            }
            /*显示编辑菜单*/
            const showFirstCategory = () => {
                categoryDisabled.value = true;
                formState.value = true;
            }
            /*添加一级分类按钮*/
            const btnAddFirst = (Item) => {
                showFirstCategory()
                form.categoryName = '';
                btnSubmitType.value = Item.level;
            }
            /*添加一级分类接口调用*/
            const addCategoryApi = () => {
                AddFirstCategory({categoryName: form.categoryName}).then(res => {
                    if (res.resCode === 0) {
                        root.$message({message: res.message, type: 'success'});
                        //添加成功需要把返回的数据重新添加到信息分类里面
                        categorys.item.push(res.data);

                    }
                    btnSubmitState.value = false
                    refs['ruleForm'].resetFields()
                }).catch(err => btnSubmitState.value = false)
            }
            /*编辑接口*/
            const editCategoryApi = () => {
                let data = {
                    id: categorys.current.id,
                    categoryName: form.categoryName  //修改后的名称
                }
                editCategory(data).then(res => {
                    if (res.resCode === 0) {
                        // let item=categorys.item.find(item=>item.id==categorys.current.id);
                        // item.category_name=form.categoryName;
                        categorys.current.category_name = res.data.data.categoryName;  //这里能够响应式是因为点击按钮传进来的值

                        root.$message({message: res.message, type: 'success'});
                        //添加成功需要把返回的数据重新添加到信息分类里面
                    }
                    categorys.current = [];
                    btnSubmitState.value = false
                    refs['ruleForm'].resetFields()

                }).catch(err => {
                    btnSubmitState.value = false
                })
            }

            /*添加二级级分类按钮*/
            const btnAddSecond = () => {
                categoryDisabled.value = false;
                formState.value = true;
            }
            /*删除分类接口*/
            const Deleteconfirm = (categoryId) => {
                deleteCategory({categoryId: categoryId}).then(res => {
                    if (res.resCode == 0) {
                        //进行元素的删除
                        let index = categorys.item.findIndex(item => item.id == categoryId);
                        categorys.item.splice(index, 1);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            /*删除分类*/
            const btnDeleteCategory = (categoryId) => {

                root.confirm({
                    message: '此操作将删除一级分类是否继续?',
                    center: true,
                    thenFn: Deleteconfirm,
                    catchFn: () => {
                        categoryId = '';
                    },
                    id: categoryId,
                });
            }
            /*修改分类信息按钮*/
            const btneditCategory = (firstItem) => {
                showFirstCategory();
                categorys.current = firstItem.data;
                form.categoryName = firstItem.data.category_name;
                btnSubmitType.value = firstItem.level;
                console.log(categorys.current);
            }
            // /*获取分类信息*/
            // const getCategory = () => {
            //
            //     GetCategory({}).then(res => {
            //         if (res.resCode == 0) {
            //             categorys.item = res.data.data;
            //             console.log(categorys);
            //         }
            //
            //     }).catch(err => {
            //         console.log(err)
            //     })
            //
            // }

            /*元素加载完成以后*/
            onMounted(() => {
                getInfoCategory()

            })
            /*watch*/
            watch(() => category.item, (value) => {
                console.log(category.item)
                categorys.item=value
            })

            return {
                form,
                categoryDisabled,
                submit,
                rules,
                categorys,
                btnSubmitState,
                formState,
                btnAddFirst,
                btnAddSecond,
                btnDeleteCategory,
                btneditCategory
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

            .button-group {
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