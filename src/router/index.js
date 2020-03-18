import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login/login"
import index from "@/views/index/index"
import home from "@/views/home/home"
import video from "@/views/video/video"
import questions from "@/views/questions/questions"
import my from "@/views/my/my"
import search from "@/views/search/search"
import searchResult from "@/views/searchResult/searchResult"
import compoment from "@/views/compoment/compoment"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/goLogin',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
      },
      {
        path: '/questions',
        name: 'questions',
        component: questions,
      },

      {
        path: '/video',
        name: 'video',
        component: video,
      },
      {
        path: '/my',
        name: 'my',
        component: my,
      },

    ]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/searchResult/:key',
    name: 'searchResult',
    component: searchResult
  },
  {
    path: '/compoment/:key',
    component: compoment
  },

]

const router = new VueRouter({
  routes
})

export default router
