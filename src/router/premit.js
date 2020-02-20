import router from "./index";
import store from "@/store/index";
import {getToken,removeToken,removeUserName} from '@/utils/app'
/*白名单*/
const whiteRouter=['/login']
/*跳转之前导航守卫*/
router.beforeEach((to, from, next)=>{
    /*如果cookie里面存在token*/
        if(getToken()){
            if(to.path=='/login')
            {
                removeToken()
                removeUserName()
                store.commit('app/Set_Token','');
                store.commit('app/Set_useName','');
            }
            next()

        }else{
            /*判断是否是登陆界面如果是的话就正常操作next()
            * 如果不是的话就跳转到登陆界面*/
            if(whiteRouter.indexOf(to.path) !==-1)
            {
                next()
            }else {
                next('/login')
            }
        }
     next();
})
