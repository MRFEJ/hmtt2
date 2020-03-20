import requery from "@/utils/requery.js"




// 获取全部频道
export function userAllChannel() {
    return requery({
        url: 'channels',
        method: 'get',
    })
}

// 修改频道
export function userEditChannel(data) {
    return requery({
        url: 'user/channels',
        method: 'PUT',
        data
    })
}

// 删除频道
export function userDelChannel(data) {
    return requery({
        url: 'user/channels',
        method: 'DELETE',
        data
    })
}





