import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {getToken} from "@/utils/token.js"
export default new Vuex.Store({
  state: {
    myToken: getToken('myToken'),
    resToken: getToken('resToken')
  },
  mutations: {
    changeMytoken(state, val) {
      state.myToken = val;
    },
    changeRestoken(state, val) {
      state.resToken = val;
    }

  },
  actions: {
  },
  modules: {
  }
})
