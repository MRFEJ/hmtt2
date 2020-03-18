import store from "@/store/"
// import { getToken } from "@/utils/token.js"
import { Toast } from 'vant';
import router from "@/router/"
let myLike = {
    commen() {
        if (store.state.myToken) {
        // window.console.log('6666');
        // if (getToken('myToken')) {
            return true;
        } else {
            // window.console.log('7777');

            Toast.fail('请先登录哦!')
            router.push('/goLogin')
            return false;
        }
    },
    install(Vue) {
        Vue.prototype.commen = myLike.commen
    }
}

export default myLike