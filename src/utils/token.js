export function setToken(key, val){
    return window.localStorage.setItem(key, val)
}


export function getToken(key){
    return JSON.parse(window.localStorage.getItem(key))
}

export function removeToken(key){
    return window.localStorage.removeItem(key)
}