import requery from "@/utils/requery.js"

export function login(data) {
    return requery({
        url: 'authorizations',
        method: 'post',
        data
    })
}