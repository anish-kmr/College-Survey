import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import LandingPage from './views/LandingPage.vue'
import FacultyLogin from './views/FacultyLogin.vue'
import StudentLogin from './views/StudentLogin.vue'
import AdminLogin from './views/AdminLogin.vue'
import AdminDashboard from './views/AdminDashboard.vue'


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
    {
      path:'/faculty/login',
      component:FacultyLogin,
    },
    {
      path:'/admin',
      component:AdminDashboard,
    }
  ],
  mode:'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
