import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login/login"
import home from "@/views/home/home"
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },

]

const router = new VueRouter({
  routes
})

export default router
