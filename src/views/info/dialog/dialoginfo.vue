<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="dialog_close" width="580px">
        <el-form :model="form">
            <el-form-item label="类型：" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请输入">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题：" :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况：" :label-width="formLabelWidth">
                <el-input class="overview" type="textarea" v-model="form.name" placeholder="请输入概况"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog_close">取 消</el-button>
            <el-button type="danger" @click="dialog_close">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {ref, reactive, watch} from '@vue/composition-api'

    export default {
        name: "dialoginfo",
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },
        setup(props, {emit}) {
            const dialog_info_flag = ref(false)
            const formLabelWidth = ref('70px')
            const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            })
            const dialog_close = () => {
                emit('update:flag', false);
            }

            watch(() => {
                dialog_info_flag.value = props.flag;
            })
            return {
                dialog_info_flag,
                formLabelWidth,
                form,
                dialog_close
            }
        },
    }
</script>

<style scoped lang="scss">
</style>