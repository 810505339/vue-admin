import axios from 'axios'
import {Message} from "element-ui";

const baseURL=process.env.NODE_ENV ==='production' ?'':'/api'
const server=axios.create({
    baseURL:baseURL,
})


// 添加请求拦截器
server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data=response.data;
    if(data.resCode !==0)
    {
        Message.error(data.message);
        //切断操作 返回到catch
        return Promise.reject(data);

    }else
    {
        return response;
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default  server