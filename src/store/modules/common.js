import {setToken, setUsername} from "../../utils/app";
import {GetCategory} from "@/api/news"
const actions={
    getInfoCategory(){
        return new Promise((resolve,reject)=>{
            GetCategory({}).then(res=>{
                return resolve(res.data);
            }).catch(err=>{
                return reject(err);
            })
        })
    },
}

export default {
    namespaced:true,
    actions
}
