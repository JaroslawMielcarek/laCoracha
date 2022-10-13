import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Settings from '../views/Settings.vue'
import Moderator from '../views/Moderator.vue'
import Finances from '../views/Finances.vue'
import Permissions from '../views/Permissions.vue'
import Practice from '../views/Practice.vue'
import Locations from '../views/Locations.vue'
import Join from '../views/Join.vue'
import Reset from '../views/Reset.vue'
import Forgot from '../views/Forgot.vue'
import NotFound from '../views/404.vue'
import AccessDenied from '../views/AccessDenied.vue'
import store from '../store/index'
import { Buffer } from 'buffer'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  // },
  {
    name: 'Locations',
    path: '/locations',
    component: Locations
  },
  {
    path: '/:teamName',
    component: Team,
    beforeEnter: (to, from, next) => {
      // reject the navigation
      const teams = store.getters.getTeamsNames
      const { teamName } = to.params
      // TODO
      // change path to 404 page
      if (!teams.includes(teamName)) return next({ path: '/error' })
      return next()
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
    meta: { requiresAuth: true, requiresRole: ['ROLE_USER'] }
    // beforeEnter: (to, from, next) => {
    //   if (!store.getters.getStatus) next({ name: 'Login', query: { nextUrl: to.fullPath } })
    //   else next()
    // }
  },
  {
    name: 'Moderator',
    path: '/moderator',
    component: Moderator,
    meta: { requiresAuth: true, requiresRole: ['ROLE_MODERATOR', 'ROLE_ADMIN'] }
  },
  {
    name: 'Finances',
    path: '/finances',
    component: Finances,
    meta: { requiresAuth: true, requiresRole: ['ROLE_ADMIN'] }
  },
  {
    name: 'Permissions',
    path: '/permissions',
    component: Permissions,
    meta: { requiresAuth: true, requiresRole: ['ROLE_ADMIN'] }
  },
  {
    name: 'Practice',
    path: '/practice',
    component: Practice,
    meta: { requiresAuth: true, requiresRole: ['ROLE_USER'] }
  },
  {
    name: 'Join',
    path: '/join',
    component: Join
  },
  {
    name: 'Forgot',
    path: '/forgot',
    component: Forgot
  },
  {
    name: 'Reset',
    path: '/reset:', // only links with token in url are valid
    component: Reset
  },
  {
    name: 'Not Found',
    path: '/error',
    component: NotFound
  },
  {
    name: 'Access Denied',
    path: '/accessdenied',
    component: AccessDenied
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {

  // const requiresRole = to.meta ? to.meta.requiresRole : false
  const requiresRole = to.meta.requiresRole

  if (requiresRole) {
    const currentUser = store.getters.getStatus
    // Not loged in so redirect to login page
    if(!currentUser) return next({ path: '/accessdenied' })
    // if (!currentUser) return next({ name: 'Login', query: { nextUrl: to.fullPath } })

    // If loged in check if is not expired
    const token = store.getters.getUser.accessToken
    const base64URL = token.split('.')[1]
    const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = JSON.parse(decodeURIComponent(Buffer.from(base64, 'base64').toString('ascii').split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')) )
    // just for test purpose
    // const d = new Date(0)
    // d.setUTCSeconds(jsonPayload.exp)
    // const now = new Date()
    // now.setUTCHours(19)
    // console.log('user', d , jsonPayload.exp, new Date().setUTCSeconds(jsonPayload.exp))
    if (jsonPayload.exp < new Date()/1000) {
      store.commit('logout')
      return next({ name: 'Login', query: { nextUrl: to.fullPath } })
    }

    const userRole = store.getters.getUser.roles

    // check if route is restricted by role
    if (requiresRole.length && !requiresRole.some(r => userRole.includes(r))) return next({ path: '/accessdenied' })
    // TODO
    // if yes and user does not have required role rediredct to Unauthorised PAGE
  }
  next()
})

export default router
