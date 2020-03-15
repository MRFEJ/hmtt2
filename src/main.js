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

// 字体图标
import "@/assets/style/font.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
