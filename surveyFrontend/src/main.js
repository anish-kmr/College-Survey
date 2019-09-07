import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import LandingPage from './views/LandingPage.vue'
import StudentLogin from './views/StudentLogin.vue'
import AdminLogin from './views/AdminLogin.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {
      path:'/',
      component:LandingPage,
    },
    {
      path:'/admin/login',
      component:AdminLogin,
    },
    {
      path:'/student/login',
      component:StudentLogin,
    },
  ],
  mode:'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
