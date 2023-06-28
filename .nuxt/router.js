import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7f3e90f0 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _1fd70105 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _a6f6b258 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _11d17df4 = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _101837bf = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _524e1418 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _6d33a4b9 = () => interopDefault(import('..\\pages\\admin\\candidate.vue' /* webpackChunkName: "pages/admin/candidate" */))
const _3a45f886 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _7f3e90f0,
    name: "admin"
  }, {
    path: "/inspire",
    component: _1fd70105,
    name: "inspire"
  }, {
    path: "/login",
    component: _a6f6b258,
    name: "login"
  }, {
    path: "/testbase64",
    component: _11d17df4,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _101837bf,
    name: "testdatareal"
  }, {
    path: "/testimage",
    component: _524e1418,
    name: "testimage"
  }, {
    path: "/admin/candidate",
    component: _6d33a4b9,
    name: "admin-candidate"
  }, {
    path: "/",
    component: _3a45f886,
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
