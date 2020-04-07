import store from "@/store/index"
let num = null;
export default function time() {
    // window.console.log('666');
    num = 0;
    let time = setInterval(() => {
        num++
        store.commit('changeNum', num)
    }, 60000)
    store.commit('changeTime', time)

}