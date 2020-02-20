import {MessageBox,Message } from "element-ui";

export default {
    install(Vue,options){
        Vue.prototype.confirm=(params)=>{
            MessageBox.confirm(params.message, params.title||'提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type||'warning',
                center:  params.center||false
            }).then(() => {
                params.data && params.data(params.id)
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
    }

}