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
// export function search(params) {
//     return requery({
//         url: 'search',
//         method: 'get',
//         params
//     })
// }

// // 删除用户搜索记录
// export function searchHistories() {
//     return requery({
//         url: 'search/histories',
//         method: 'DELETE'
//     })
// }



// // 用户搜索记录
// export function searchHistories() {
//     return requery({
//         url: 'search/histories',
//         method: 'get',
        
//     })
// }

