
import server from "../utils/request";

/*登录*/
export function GetSms(data){
    return server.request({
        method: 'post',
        url: '/getSms/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}
/*注册*/
export function Register(data){
    return server.request({
        method: 'post',
        url: '/register/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}


/*登录*/
export function Login(data){
    return server.request({
        method: 'post',
        url: '/login/',
        data
    }).then(res=> Promise.resolve(res.data)).catch(err=>Promise.reject(err))
}