import Cookies from 'js-cookie';

export function getToken(){
   return  Cookies.get('Token');
}
export function getUserName() {
    return  Cookies.get('userName');
    
}
export function setToken(token) {
    return  Cookies.set('Token',token);
    
}
export function setUsername(username) {
    return  Cookies.set('userName',username);

}

export function removeToken() {
    return  Cookies.remove('Token');
    
}

export function removeUserName() {
    return  Cookies.remove('userName');

}