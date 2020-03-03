/*vue3*/
import {ref,reactive} from "@vue/composition-api";
import {Message, MessageBox} from "element-ui";
/*这是3.0公共方法*/
export function global_3() {
    const str=ref('')
    const confirm=(params)=>{
        MessageBox.confirm(params.message, params.title||'提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type||'warning',
            center:  params.center||false
        }).then(() => {
            str.value='修改str'
            //params.data && params.data(params.id)
            Message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }
    return{
        confirm,
        str
    }

}