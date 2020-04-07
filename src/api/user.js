import requery from "@/utils/requery.js"


// 获取用户频道
export function userChannel() {
    return requery({
        url: 'user/channels',
        method: 'get'
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


// 关注用户
export function followingUser(data) {
    return requery({
        url: 'user/followings',
        method: 'post',
        data
    })
}

// 取消关注用户
export function qxgzUser(data) {
    return requery({
        url: `user/followings/${data}`,
        method: 'DELETE',
    })
}

// 获取用户个人信息
export function userProfile() {
    return requery({
        url: 'user/profile',
        method: 'get',
    })
}

// 获取用户个人资料
export function user() {
    return requery({
        url: 'user',
        method: 'get',
    })
}

// 上传用户头像
export function userPhoto(data) {
    let fd = new FormData()
    fd.append('photo', data.photo)
    return requery({
        url: 'user/photo',
        method: 'PATCH',
        data: fd
    })
}
// 编辑用户的资料
export function userEdit(data) {
    return requery({
        url: 'user/profile',
        method: 'PATCH',
        data
    })
}
