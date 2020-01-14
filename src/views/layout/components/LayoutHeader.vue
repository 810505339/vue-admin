<template>
    <div >
        <el-row type="flex" id="header-wrap" class="row-bg" justify="space-between"   >
            <el-col :span="1" @click.native="set_Collapse">
                <div class="header-icon">
                    <svg-icon class-name="menu" icon-class="menu" />
                </div>
            </el-col>
            <el-col :span="3">
                <el-col :span="16" class="user-info">
                    <el-col class="avatar"> <el-avatar :size="45" class=""
                                        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar></el-col>
                    <el-col>
                        <label>管理员</label>
                    </el-col>


                </el-col>
                <el-col :span="8" class="header-icon">
                    <svg-icon class-name="exit" icon-class="exit"/>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "LayHeader",
        setup(props,{root}){
           const set_Collapse=()=>{
               console.log('aaa');
               root.$store.commit('Set_Collapse');

           }

            return{
                set_Collapse
            }
        },
    }
</script>

<style lang="scss" scoped>

    #header-wrap {
        position: fixed;
        height: 75px;
        left: $NavMenuWidth;
        background: #ffffff;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
        right: 0;
        top: 0;
        line-height: 75px;
    }

    .header-icon {
        margin-left: 30px;

        svg {
            margin-bottom: -8px;
            font-size: 25px;
            cursor: pointer;
            fill: currentColor;
            color: #d4d4d4;
        }

    }

    .user-info {
        height: 100%;
        border-right: 1px solid #efefef;
        display: flex;
        text-align: left;
        .avatar{
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
           /*   justify-content: center; 定义body的里的元素水平居中*/
        }
        + .header-icon {

            text-align: center;
            margin-left: auto;
        }
    }
</style>