<template>

        <el-row type="flex" id="header-wrap" class="row-bg" justify="space-between"   >
            <el-col :span="2" >
                <div class="header-icon" >
                    <svg-icon class-name="menu" icon-class="menu" @click.native="set_Collapse" />
                </div>
            </el-col>
            <el-col :span="4" style="min-width: 300px;">
                <el-col :span="18" class="user-info">
                    <el-col class="avatar"> <el-avatar :size="45" class=""
                                        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar></el-col>
                    <el-col style="min-width: 170px;">
                        <label>{{userName}}</label>
                    </el-col>
                </el-col>
                <el-col :span="6" class="header-icon">
                    <svg-icon class-name="exit" icon-class="exit" @click.native="exit()"/>
                </el-col>
            </el-col>
        </el-row>

</template>

<script>
    import {computed} from "@vue/composition-api";

    export default {
        name: "LayHeader",

        setup(props,{root}){
            const set_Collapse=()=>{
               root.$store.commit('app/Set_Collapse');
            }
            const userName=computed(()=>{
                return root.$store.state.app.userName
            })

            const exit=()=>{
                return root.$store.dispatch('app/exit').then(()=>{

                    root.$router.push({
                        name:'Login',
                        path:'/login'
                    })
                })

            }


            console.log(userName)

            return{
                set_Collapse,
                userName,
                exit
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/config.scss";
    #header-wrap {
        position: fixed;
        height: 75px;
        left: $NavMenuWidth;
        background: #ffffff;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
        right: 0;
        top: 0;
        line-height: 75px;
        @include webkit(transition, all 1s ease-out 0s);
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
        text-align: center;
        .avatar{
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
             justify-content: center; /*定义body的里的元素水平居中*/
        }
        + .header-icon {

            text-align: center;
            margin-left: auto;
        }
    }

    .close{
        #header-wrap{
            left: $closeWidth;
        }

    }
    .open{
        #header-wrap{
            left: $NavMenuWidth;
        }
    }


</style>