import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getToken } from "@/utils/token.js"
export default new Vuex.Store({
  state: {
    myToken: getToken('myToken') && getToken('myToken').token,
    resToken: getToken('myToken') && getToken('myToken').refresh_token,
    num: 0,
    time: ''
  },
  mutations: {
    changeMytoken(state, val) {
      state.myToken = val;
    },
    changeRestoken(state, val) {
      state.resToken = val;
    },
    changeNum(state, val) {
      state.num = val;
    },
    changeTime(state, val) {
      state.time = val;
    }


  },
  actions: {
  },
  modules: {
  }
})
