import server from "@/utils/request";
/*添加一级分类*/
export function AddFirstCategory(data) {
    return server.request({
        method:'post',
        url:'/news/addFirstCategory/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}
/*获取分类*/
export function GetCategory(data) {
    return server.request({
        method:'post',
        url:'/news/getCategory/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}
/*删除分类*/
export function deleteCategory(data) {
    return server.request({
        method:'post',
        url:'/news/deleteCategory/',
        data
    }).then(res=>Promise.resolve(res.data)).catch(err=>Promise.resolve(err))

}
/*修改分类*/
export function editCategory(data) {
    return server.request({
        method:'post',
        url:'/news/editCategory/',
        data
    }).then(res=>Promise.resolve(res.data)).catch(err=>Promise.resolve(err))
}