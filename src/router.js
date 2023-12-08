import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index'

import coaches from './pages/coaches/coachesPage.vue'
// import coachesId from './pages/coaches/coachesId'
// import contact from './pages/contact/contactPage'
// import registercomp from './pages/coaches/registerPage'
// import requests from './pages/contact/requestsPage'
// import Auth from './pages/auth/UserAuth.vue'
import notfound from './pages/notFound'

const registercomp = () => import('./pages/coaches/registerPage')
const requests = () => import('./pages/contact/requestsPage')
const Auth = () => import('./pages/auth/UserAuth')
const contact = () => import('./pages/contact/contactPage')
const coachesId = () => import('./pages/coaches/coachesId')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: coaches
    },
    {
      path: '/coaches/:id',
      name: 'coachesid',
      component: coachesId,
      props: true,
      children: [{
        path: 'contact',
        component: contact
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: registercomp,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'requests',
      component: requests,
      meta: { requiresAuth: true }
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)',
      component: notfound
    }
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthent) {
    next('/Auth')
  } else if (to.meta.requiresUnAuth && store.getters.isAuthent) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
