import requery from "@/utils/requery.js"

// 不喜欢文章
export function articleDislikes(data) {
    return requery({
        url: 'article/dislikes',
        method: 'post',
        data
    })
}

// 举报文章
export function articleReports(data) {
    return requery({
        url: 'article/reports',
        method: 'post',
        data
    })
}

// 获取文章列表
export function articleList(params) {
    return requery({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params
    })
}


// 获取文章详情
export function article(params) {
    return requery({
        url: `articles/${params}`
    })
}

// 对文章点赞
export function articleLikings(data) {
    return requery({
        url: `article/likings`,
        method: 'post',
        data
    })
}

// 取消对文章点赞
export function axLikings(data) {
    return requery({
        url: `article/likings/${data}`,
        method: 'DELETE',
    })
}

// 取消不喜欢文章
export function articleXh(data) {
    return requery({
        url: `article/dislikes/${data}`,
        method: 'DELETE',
    })
}

// 不喜欢文章
export function articleBxh(data) {
    return requery({
        url: `article/dislikes`,
        method: 'post',
        data
    })
}

// 收藏文章
export function scArticle(data) {
    return requery({
        url: `article/collections`,
        method: 'post',
        data
    })
}

// 取消收藏文章
export function qxscArticle(data) {
    return requery({
        url: `article/collections/${data}`,
        method: 'DELETE',
    })
}
