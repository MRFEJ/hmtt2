import requery from "@/utils/requery.js"

// 用户搜索联想
export function searchSuggestion(params) {
    return requery({
        url: 'suggestion',
        method: 'get',
        params
    })
}

// // 用户搜索结果
export function getSearch(params) {
    return requery({
        url: 'search',
        method: 'get',
        params
    })
}


