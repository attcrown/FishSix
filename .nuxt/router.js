import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4248d186 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _79626430 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _0d564e82 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5ac089fb = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _2e931774 = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _09cf8b42 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _0f1da1ee = () => interopDefault(import('..\\pages\\admin\\candidate.vue' /* webpackChunkName: "pages/admin/candidate" */))
const _2fad35a8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _4248d186,
    name: "admin"
  }, {
    path: "/inspire",
    component: _79626430,
    name: "inspire"
  }, {
    path: "/login",
    component: _0d564e82,
    name: "login"
  }, {
    path: "/testbase64",
    component: _5ac089fb,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _2e931774,
    name: "testdatareal"
  }, {
    path: "/testimage",
    component: _09cf8b42,
    name: "testimage"
  }, {
    path: "/admin/candidate",
    component: _0f1da1ee,
    name: "admin-candidate"
  }, {
    path: "/",
    component: _2fad35a8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
