import Vue from 'vue'
import Router from 'vue-router'
import Recommendations from '@/components/recommendations/Recommendations'
import LoginTwitter from '@/components/LoginTwitter'
import About from '@/components/About'
import Dashboard from '@/components/dashboard/Dashboard'
import Unauthorized from '@/components/error-pages/Unauthorized'
import PageNotFound from '@/components/error-pages/PageNotFound'
import PageServerError from '@/components/error-pages/PageServerError'

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
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/internal-error',
      name: 'PageServerError',
      component: PageServerError
    }
  ]
})
