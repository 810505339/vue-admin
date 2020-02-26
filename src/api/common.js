import {ref,reactive} from "@vue/composition-api";
import {GetCategory} from "./news";

export function common() {
    const category=reactive({item:[]})
    /*获取分类*/
    const getInfoCategory = () => {
        GetCategory({}).then(res=>{
            if (res.resCode == 0) {
                category.item=res.data.data;
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return {
        getInfoCategory,
        category
    }
}
