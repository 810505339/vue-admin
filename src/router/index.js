import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const login=()=>import('views/login')
const layout=()=>import('views/layout')
const consoleIndex=()=>import('views/console')
const infoIndex=()=>import('views/info')
const category=()=>import('views/info/category')
const UserIndex=()=>import('views/user')


const routes = [
  {
    path: '/',
    redirect:'login',
    hidden:true,
    meta:{
      name:'主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    component:login,
    hidden:true,
    meta:{
      name:'登陆'
    }
  },
  {
    path: "/console",
    name: "Console",
    component:layout,
    redirect:'index',
    meta:{
      name:'控制台',
      icon:'console'
    },
    children:[
      {
        path:'/index',
        name:'Index',
        component:consoleIndex,
        meta:{
          name:'首页'
        }
      },

    ]
  },
  {
    path: "/info",
    name: "Info",
    component:layout,

    meta:{
      name:'信息管理',
      icon:'info'
    },
    children:[
      {
        path:'/infoindex',
        name:'InfoIndex',
        component:infoIndex,
        meta:{
          name:'信息列表'
        }
      },
      {
        path:'/category',
        name:'Category',
        component:category,
        meta:{
          name:'信息分类'
        }
      },

    ]
  },
  {
    path: "/user",
    name: "User",
    component:layout,
    meta:{
      name:'用户管理',
      icon:'user'
    },
    children:[
      {
        path:'/userindex',
        name:'UserIndex',
        component:UserIndex,
        meta:{
          name:'用户列表'
        }
      },


    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
});

export default router;
