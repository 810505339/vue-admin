import server from "@/utils/request";
/*添加一级分类*/
export function AddFirstCategory(data) {
    return server.request({
        method:'post',
        url:'/news/addFirstCategory/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}
