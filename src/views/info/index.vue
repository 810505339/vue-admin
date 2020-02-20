<template>
    <div>
        <!--导航栏-->
        <el-form :inline="true" class="demo-form-inline" style="margin-bottom: 50px">
            <el-form-item label="类型：" label-width="60px">
                <el-select v-model="InfoType" placeholder="请选择" class="InfoType">
                    <el-option
                            v-for="item in InfoTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期：" label-width="60px">
                <el-date-picker style="max-width: 330px"
                                v-model="Datetime"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" label-width="75px">
                <el-select v-model="keyword" placeholder="请选择" class="keyWord">
                    <el-option
                            v-for="item in keywords"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="keyWordInput" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger">搜索</el-button>
                <el-button type="danger" @click="dialog_info = !dialog_info">新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据-->
        <el-table :data="tableData" style="width:100%;" border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="category" label="类别" width="130"></el-table-column>
            <el-table-column prop="date" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理人" width="115"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="dialog_info=true">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteInfo">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页控件-->
        <el-row type="flex" justify="space-between">
            <el-col>
                <el-button plain @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DiaLogInfo :flag.sync="dialog_info"/>
    </div>
</template>

<script>
    import DiaLogInfo from '@/views/info/dialog/dialoginfo'
    import {reactive, ref, watch} from '@vue/composition-api'
    import {global_3} from "../../utils/global3.0";

    export default {
        components: {DiaLogInfo},
        setup(props, {root}) {
            /*类型选择数据*/
            const InfoTypes = reactive([{
                value: '国际信息',
                label: '国际信息'
            }, {
                value: '国内信息',
                label: '国内信息'
            }, {
                value: '行业信息',
                label: '行业信息'
            }])
            /*关键字数组*/
            const keywords = reactive([
                {
                    value: 'ID',
                    label: 'ID'
                },
                {
                    value: '标题',
                    label: '标题'
                },
            ])
            const pickerOptions = reactive({
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            })
            /*表格数据*/
            const tableData = reactive([{
                title: '二狗11111111111111111111111111111111111111111111111',
                category: '国内信息',
                date: '2019-10-01',
                user: '二狗'
            },
                {
                    title: '二狗',
                    category: '国内信息',
                    date: '2019-10-01',
                    user: '二狗'
                }])
            /*类型选择数据显示*/
            const InfoType = ref('')
            /*时间选择*/
            const Datetime = ref('')
            /*所选关键字*/
            const keyword = ref('')
            /*填写的关键字*/
            const keyWordInput = ref('')
            /*新增按钮操作*/
            const dialog_info = ref(false)

            const handleSizeChange = (val) => {


            }
            const handleCurrentChange = (val) => {
            }
            /*str:sss 是将str重命名为sss*/
            const {confirm, str: sss} = global_3()
            watch(() => {
                console.log(sss.value)
            })
            //删除弹窗data函数
            const confirmData = (val) => {
                console.log(val)
            }
            /*列表删除操作*/
            const deleteInfo = () => {
                // root.confirm({
                //     message:'此操作将永久删除该文件, 是否继续?',
                //     center:true
                // });

                confirm({
                    message: '此操作将批量删除, 是否继续?',
                    center: true,
                    data: confirmData,
                    id: 222
                })

            }

            /*批量删除操作*/
            const deleteAll = () => {
                confirm({
                    message: '此操作将批量删除, 是否继续?',
                    center: true,
                    data: confirmData,
                    id: 1111
                })
                /*这是2.0原型链*/
                /* root.confirm({
                     message:'此操作将批量删除, 是否继续?',
                     center:true,
                     data:confirmData,
                     id:1111
                 });*/

            }
            return {
                InfoTypes,
                InfoType,
                keywords,
                tableData,
                pickerOptions,
                Datetime,
                keyword,
                keyWordInput,
                dialog_info,
                handleSizeChange,
                handleCurrentChange,
                deleteInfo,
                deleteAll
            }
        }
    }
</script>

<style scoped lang="scss">
    .InfoType {
        max-width: 110px;
    }

    .keyWord {
        max-width: 90px;
    }

</style>