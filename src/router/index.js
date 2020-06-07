import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [  
  {
    path: '/index',
    name: 'index',
    component: ()=> import('@/views/index/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: ()=> import('@/views/about/about.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
