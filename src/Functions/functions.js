export function getToken(){
    return localStorage.getItem('token');
}

export function setToken(value){
    return localStorage.setItem('token', value)
}