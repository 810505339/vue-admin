import router from "./index";
import store from "@/store/index";
import {getToken,removeToken,removeUserName} from '@/utils/app'

const whiteRouter=['/login']
router.beforeEach((to, from, next)=>{
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

            if(whiteRouter.indexOf(to.path) !==-1)
            {
                next()
            }else {
                next('/login')
            }
        }
     next();
})
