import {setToken,setUsername,getUserName,getToken,removeToken,removeUserName} from "../../utils/app";
import {Login} from "@/api/login";

const state= {
 //session里面是否有值，没有的为false 有直接去
 isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false,
     Token:getToken()||'',
     userName:getUserName()||'',
}
const getters={

}
const mutations= {
 Set_Collapse(state){
  state.isCollapse=!state.isCollapse;
  //点击存进session
  sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  console.log( state.isCollapse);
 },
 Set_Token(state,value){
  state.Token=value
 },
 Set_useName(state,value){
  state.userName=value
 }
}
const actions={
 login({commit},requestData){
  return new Promise((resolve,reject)=>{
    Login(requestData).then(res=>{
    let data=res
     console.log(res);
    commit('Set_Token',data.data.token);
    commit('Set_useName',data.data.username);
    setToken(data.data.token);
    setUsername(data.data.username);
    return resolve(data);
   }).catch(err=>{
    return reject(err);
   })
  })
  },
 exit(){
  return new Promise((resolve, reject)=>{

   removeToken();
   removeUserName();

   return resolve();
  })

 }
}

export default {
 namespaced:true,
 state,
 getters,
 mutations,
 actions
}





