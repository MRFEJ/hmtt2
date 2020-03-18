let time = null;
// 闭包方法处理函数抖动
export function main(hs, sj) {
    return ()=> {
        clearTimeout(time);
        time=setTimeout(hs,sj);
    }
}