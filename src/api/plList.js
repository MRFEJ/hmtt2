import requery from "@/utils/requery.js"

// 获取评论
export function commentsList(params) {
    return requery({
        url: 'comments',
        method: "get",
        params
    })
}

// 给评论点赞
export function plLikings(data) {
    return requery({
        url: 'comment/likings',
        method: "post",
        data
    })
}

// 取消评论点赞
export function qxLikings(data) {
    return requery({
        url: `comment/likings/${data}`,
        method: "DELETE",
    })
}

// 发评论
export function sendPl(data) {
    return requery({
        url: `comments`,
        method: "post",
        data
    })
}