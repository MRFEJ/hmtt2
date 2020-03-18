import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

// 导入全局过滤器
import "@/filter/filter.js"

// 导入判断用户有没有登录的自定义插件自定义插件
import myLike from "@/utils/like.js"
// 注册这个组件相当于调用了myLike对象里面的install方法 记得把Vue作参数
Vue.use(myLike)

// 字体图标
import "@/assets/style/font.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
