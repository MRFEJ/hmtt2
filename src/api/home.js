import requery from "@/utils/requery.js"

// 获取用户频道
export function userChannel() {
    return requery({
        url: 'user/channels',
        method:'get'
    })
}

// 获取用户列表
export function userList(params) {
    return requery({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params
    })
}

// 拉黑用户
export function userBlacklists(data) {
    return requery({
        url: 'user/blacklists',
        method: 'post',
        data
    })
}



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

// 不喜欢文章
export function userDislikes(data) {
    return requery({
        url: 'article/dislikes',
        method: 'post',
        data
    })
}

// 举报文章
export function userReports(data) {
    return requery({
        url: 'article/reports',
        method: 'post',
        data
    })
}




