import requery from "@/utils/requery.js"


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