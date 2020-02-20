<template>
    <div id="category">
        <el-button type="danger">添加一级分类</el-button>
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category">
                        <h4>新闻</h4>
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
                <el-col :span="16">asdasd</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "category"
    }
</script>

<style lang="scss" scoped>
.category{
    line-height: 44px;
    h4{
        padding-left: 40px;
    }
    li{
        margin-left: 20px;
        padding-left: 40px;
        position: relative;
        &:before{
            content: '';
            position: absolute;
            width: 32px;
            border-bottom: 1px dotted #000;
            left: 0;
            top: 50%;
        }
    }
}
</style>