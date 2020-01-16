<template>
    <div id="nav-wrap">
        <el-image class="nav-img"
                :src="require('@/assets/logo.png')"
               ></el-image>
        <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#fff"
                router
                collapse-transition
        >
            <template  v-for="(item,index) in routes">
                <el-submenu :index="item.path" v-if="!item.hidden" :key="item.id"   >
                    <template slot="title" :hidden="item.hidden">
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                        <span slot="title" >{{item.meta.name}}</span>
                    </template>
                    <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>

    </div>
</template>

<script>
    import {reactive, ref,computed} from '@vue/composition-api'
    export default {
        name: "LayoutNav",
        setup(props,{root}){
          //data数组
            const isCollapse=computed(()=>{
                console.log(root.$store.state.isCollapse)
                return  root.$store.state.isCollapse
            });
            const routes=reactive(root.$router.options.routes);
            //侧边栏展开事件
            const handleOpen=((key,keyPath)=>{
                console.log(key, keyPath);

            })
            //侧边栏合起来事件
            const handleClose=((key,keyPath)=>{
                console.log(key, keyPath);

            })

            console.log(root.$router.options.routes)
            return{
                isCollapse,
                handleOpen,
                handleClose,
                routes

            }
        }
    }
</script>

<style  lang="scss" scoped>
    @import "@/styles/config.scss";
#nav-wrap{
     position: fixed;
     width: $NavMenuWidth;
     top: 0;
     left: 0;
     height: 100vh;
     background: #344a5f;
    @include webkit(transition, all 1s ease-out 0s);

    .svg-icon{
        font-size: 20px;
        margin-right: 10px;

        fill: currentColor;
        color:#ffffff ;


    }

    .nav-img{
        margin: 0 auto;
        display: block;
        padding: 20px 0;
        width: 100px;
        height: 100px;
        @include webkit(transition, all 1s ease-out 0s);
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;


    }
    .el-menu-vertical-demo{
        border: none;

    }
}
.open{
    #nav-wrap{
        width: $NavMenuWidth;
    }
   .el-menu-vertical-demo{
       @include webkit(transition, all 1s ease-out 0s);
   }
}
.close{
    #nav-wrap{
        width:$closeWidth;
        .nav-img{
            width: 40px;
            height: 40px;
        }
    }

    .el-menu-vertical-demo{
        @include webkit(transition, all 0s ease-out 0s);
    }



}
</style>