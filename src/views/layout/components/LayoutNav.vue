<template>
    <div id="nav-wrap">
        <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#fff"
                router>
            <template  v-for="(item,index) in routes">
                <el-submenu :index="item.path" v-if="!item.hidden" :key="item.id" >
                    <template slot="title" :hidden="item.hidden">
                        <i class="el-icon-location"></i>
                        <span slot="title" >{{item.meta.name}}</span>
                    </template>
                    <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {reactive, ref} from '@vue/composition-api'
    export default {
        name: "LayoutNav",
        setup(props,{root,}){
          //data数组
            const isCollapse=ref(false);
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
#nav-wrap{
     position: fixed;
     width: $NavMenuWidth;
     top: 0;
     left: 0;
     height: 100vh;
     background: #344a5f;
}
</style>