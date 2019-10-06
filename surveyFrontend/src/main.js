import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import LandingPage from './views/LandingPage.vue'
import FacultyLogin from './views/FacultyLogin.vue'
import StudentLogin from './views/StudentLogin.vue'
import AdminLogin from './views/AdminLogin.vue'
import AdminDashboard from './views/AdminDashboard.vue'
import FacultyDashboard from './views/FacultyDashboard.vue'
import FacultyAnalysis from './views/FacultyAnalysis.vue'
import StudentDashboard from './views/StudentDashboard.vue'
import Surveys from './views/Surveys.vue'
import SurveyDetails from './views/SurveyDetails.vue'
import CreateSurvey from './views/CreateSurvey.vue'
import CreateSurveyDetails from './views/CreateSurveyDetails.vue'


import HighchartsVue from "highcharts-vue";
Vue.use(VueRouter)
Vue.use(HighchartsVue)
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
      children:[
        {
          path:'',
          redirect:'survey/active',
        },
        {
          path:'survey/create',
          component:CreateSurvey, 
          props:true,
          children:[
            {
              path:'',
              redirect:'faculty'
            },
            {
              path:':type',
              props:true,
              component:CreateSurveyDetails,
            }
          ]
        },
        
        {
          path:'survey/:status',
          props:true,
          component:Surveys, 
          children:[
            {
              path:':id',
              component:SurveyDetails,
              props:true,
            }
          ]
        },
      ]
    },
    {
      path:'/faculty',
      component:FacultyDashboard,
      children:[
        {
          path:'',
          redirect:'survey/active'
        },
        {
          path:'analysis',
          component:FacultyAnalysis,
        },
        {
          path:'survey/:status',
          props:true,
          component:Surveys, 
          children:[
            {
              path:':id',
              component:SurveyDetails,
              props:true,
            }
          ]
        },
      ]
    },
    {
      path:'/student',
      component:StudentDashboard,
      children:[
        {
          path:'',
          redirect:'survey/active'
        },
        {
          path:'survey/:status',
          props:true,
          component:Surveys, 
          children:[
            {
              path:':id',
              component:SurveyDetails,
              props:true,
            }
          ]
        },
      ]
    }
  ],
  mode:'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
