import Vue from 'vue'
import Router from 'vue-router'
import Recommendations from '@/components/Recommendations'
import LoginTwitter from '@/components/LoginTwitter'
import Dashboard from '@/components/Dashboard'
import Unauthorized from '@/components/error-pages/Unauthorized'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'LoginTwitter',
      component: LoginTwitter
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/recommendations',
      name: 'Recommendations',
      component: Recommendations
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    }
  ]
})
