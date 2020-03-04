<template>
    <div>
        <!--导航栏-->
        <el-form :inline="true" class="demo-form-inline" style="margin-bottom: 50px">
            <el-row type="flex" justify="center" class="row-bg" :gutter="50">
                <el-col :span="4">
                    <el-form-item label="分类：" label-width="60px">
                        <el-select v-model="InfoType" placeholder="请选择" style="width:110%" class="InfoType">
                            <el-option
                                    v-for="item in options.category"
                                    :key="item.id"
                                    :label="item.category_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="9">
                    <el-form-item label="日期：" label-width="60px">
                        <el-date-picker style="width:100%"
                                        v-model="Datetime"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd  HH:mm:ss"
                                        align="right">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="关键字：" label-width="75px">
                        <el-select v-model="keyword" placeholder="请选择" style="padding-right:10px" class="keyWord">
                            <el-option
                                    v-for="item in keywords"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-form-item style="height:50px;">
                            <el-input v-model="keyWordInput" placeholder="请输入内容" clearable></el-input>
                        </el-form-item>
                        <el-form-item style="margin-top:-2px;">
                            <el-button type="danger" @click="search">搜索</el-button>
                            <el-button type="danger" @click="dialog_info = true">新增</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <!--表格数据-->
        <el-table :data="tableData.item" style="width:100%;" v-loading="loading" border  @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="categoryId" label="类别" width="130" :formatter="toCategory"></el-table-column>
            <el-table-column prop="createDate" label="日期" width="237" :formatter="getTime"></el-table-column>
            <!--            <el-table-column prop="user" label="管理人" width="115"></el-table-column>-->
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" type="success">编辑</el-button>
                    <el-button size="mini" type="danger" @click="doDeleteInfo(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页控件-->
        <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="4">
                <el-button plain @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="16" style="margin-top:10px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DiaLogInfo :flag.sync="dialog_info" :cateGoryInfo="options.category"/>
    </div>
</template>

<script>
    import DiaLogInfo from '@/views/info/dialog/dialoginfo';
    import {onMounted, reactive, ref, watch} from '@vue/composition-api';
    import {global_3} from "../../utils/global3.0";
    import {GetCategory, getInfoList,deleteInfo} from "@/api/news"
    import {common} from "@/api/common"
    import {getLocalTime} from "@/utils/common"
    import {Message} from "element-ui";

    export default {
        components: {DiaLogInfo},
        setup(props, {root}) {
            /*加载提示*/
            const loading = ref(false)

            const {category, getInfoCategory} = common();
            /*类型选择数据*/
            const options = reactive({category: []})
            /*关键字数组*/
            const keywords = reactive([
                {
                    value: 'id',
                    label: 'ID'
                },
                {
                    value: 'title',
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
            const tableData = reactive({item: []})
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
            /*总条数*/
            let total = ref(0)
            let deleteInfoId=reactive([]);
            /*页码*/
            const page = reactive({
                pageNumber: 1,
                pageSize: 10,
            })
            const handleSizeChange = (val) => {
                page.pageSize = val;
                getInfoListApi();
            }
            const handleCurrentChange = (val) => {
                page.pageNumber = val;
                getInfoListApi();
            }
            const getTime = (row, column, cellValue, index) => {
                return getLocalTime(row.createDate)

            }
            /*分类ID转汉字*/
            const toCategory = (row, column, cellValue, index) => {
                let categoryData=options.category.filter(item=>item.id==row.categoryId)[0];
                if(categoryData!='')
                {
                    return   categoryData.category_name;
                }


            }

            /*获取信息列表接口*/
            const getInfoListApi = () => {
                loading.value = true;
                getInfoList(infoDate()).then(res => {
                    tableData.item = res.data.data
                    total.value = res.data.total
                    loading.value = false
                    console.log(res.data);

                }).catch(err => {
                    loading.value = false
                })
            }
            /*str:sss 是将str重命名为sss*/
           // const {confirm, str: sss} = global_3()
            watch(() => {
            })
            //删除弹窗data函数
            const confirmData = () => {
                deleteInfo({id:deleteInfoId}).then(res=>{
                    deleteInfoId=[];
                    getInfoListApi();

                })
            }
            /*列表删除操作*/
            const doDeleteInfo = (id) => {
                // root.confirm({
                //     message:'此操作将永久删除该文件, 是否继续?',
                //     center:true
                // });options
                deleteInfoId=[id];
                root.confirm({
                    message: '此操作将批量删除, 是否继续?',
                    center: true,
                    thenFn: confirmData,

                })

            }
            /*多选*/
            const handleSelectionChange=(val)=>{
                deleteInfoId=val.map(item=>item.id);

            }
            /*批量删除操作*/
            const deleteAll = () => {
                if(deleteInfoId.length<0)
                {
                    root.$message.error("请至少选择一条信息");
                }else
                {
                    root.confirm({
                        message: '此操作将批量删除, 是否继续?',
                        center: true,
                        thenFn: confirmData,
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


            }
            /*重新组合数据用于搜索*/
            const infoDate=()=>{
                let data = {
                    pageNumber: page.pageNumber,
                    pageSize: page.pageSize
                }
                data.categoryId=InfoType.value;
                data.startTiem=Datetime[0];
                data.endTime=Datetime[1];
                data[keyword.value]=keyWordInput.value;
                return data;
            }
            /*点击搜索按钮*/
            const search=()=>{

                getInfoListApi();
            }
            /*生命周期*/
            onMounted(() => {
                //这个是调用了公共的方法需要配合WATCH使用
                getInfoCategory();
                //这是第二种方法使用的VUEX
                getInfoListApi()
                // root.$store.dispatch('common/getInfoCategory').then(res=>{
                //     console.log(res);
                // }).catch(err=>{
                //
                // })
            })
            /*watch*/
            watch(() => category.item, (value) => {
                options.category = value;
            })

            /*  /!*获取分类列表*!/
              const GetCategoryApi=()=>{
                  GetCategory({}).then(res=>{
                      if (res.resCode == 0) {
                          InfoTypes.category=res.data.data;

                      }
                  }).catch(err=>{
                      console.log(err);
                  })
              };

              onMounted(()=>{
                  GetCategoryApi();
              });*/

            return {
                options,
                InfoType,
                keywords,
                tableData,
                pickerOptions,
                Datetime,
                keyword,
                keyWordInput,
                dialog_info,
                loading,
                total,
                handleSizeChange,
                handleCurrentChange,
                doDeleteInfo,
                deleteAll,
                getTime,
                toCategory,
                handleSelectionChange,
                search
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