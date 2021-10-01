import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/home.vue'


Vue.use(VueRouter)
const routes = [
    {
      path: '/red',
      component: Home
    },
    {
      path: '/yellow',
      component: Home
    },
    {
      path: '/green',
      component: Home
    },
  ]
  
  const router = new VueRouter({

    // base: process.env.BASE_URL,
    routes
  })
  
  export default router

  
  
  
