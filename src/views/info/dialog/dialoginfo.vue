<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="dialog_close" width="580px" @open="open">
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="类型：" :label-width="formLabelWidth" prop="region">
                <el-select v-model="form.region" placeholder="请输入类型">
                    <el-option v-for="item in options.item" :key="item.id" :label="item.category_name"
                               :value="item.id"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况：" :label-width="formLabelWidth" prop="desc">
                <el-input class="overview" type="textarea" v-model="form.desc" placeholder="请输入概况"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog_close">取 消</el-button>
            <el-button type="danger" @click="onSubmit" :loading="submitLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {ref, reactive, watch} from '@vue/composition-api'
    import {addInfo} from "@/api/news"

    export default {
        name: "dialoginfo",
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            cateGoryInfo: {
                type: Array,
                default: []
            }
        },
        setup(props, {root, emit, refs}) {
            const dialog_info_flag = ref(false)
            const formLabelWidth = ref('70px')
            const submitLoading=ref(false)
            const form = reactive({
                title: '',
                region: '',
                desc: '',
            })
            const rules = reactive({
                title: [
                    {required: true, message: '请输入标题名称', trigger: 'blur'},
                ],
                region: [
                    {required: true, message: '请选择类型', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '请填写输入概况', trigger: 'blur'}
                ]
            })
            const dialog_close = () => {
                refs['ruleForm'].resetFields();
                emit('update:flag', false);

            }
            /*提交方法*/
            const onSubmit = () => {
                refs["ruleForm"].validate((valid)=>{
                    if (valid) {
                        submitLoading.value=true;
                        addInfoApi()
                    } else {
                        return false;
                    }
                })

            }
            /*添加接口*/
            const addInfoApi = () => {
                let data = {
                    category: form.region,
                    title: form.title,
                    content: form.desc,
                }
                addInfo(data).then(res => {
                    if (res.resCode == 0) {
                        root.$message.success(res.message);
                        refs['ruleForm'].resetFields();
                        submitLoading.value=false;
                    }
                }).catch(err => {
                    console.log(err);
                    submitLoading.value=false;
                })

            }
            let options = reactive({item: []});
            /*关闭*/
            const open = () => {
                options.item = props.cateGoryInfo;
                console.log(options);
            }
            watch(() => {
                dialog_info_flag.value = props.flag;
            })
            return {
                dialog_info_flag,
                formLabelWidth,
                form,
                dialog_close,
                open,
                rules,
                options,
                onSubmit,
                submitLoading
            }
        },
    }
</script>

<style scoped lang="scss">
</style>