import Vue from 'vue'
import Router from 'vue-router'
import Recommendations from '@/components/recommendations/Recommendations'
import Portal from '@/components/Portal'
import About from '@/components/About'
import Resume from '@/components/analysis/Resume'
import Dashboard from '@/components/dashboard/Dashboard'
import Unauthorized from '@/components/error-pages/Unauthorized'
import PageNotFound from '@/components/error-pages/PageNotFound'
import PageServerError from '@/components/error-pages/PageServerError'
import InstructionsBlankPage from '@/components/instructions/InstructionsBlankPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Portal',
      component: Portal
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
      path: '/resume',
      name: 'Resume',
      component: Resume
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
    },
    {
      path: '/instructions',
      name: 'InstructionsBlankPage',
      component: InstructionsBlankPage
    }
  ]
})
