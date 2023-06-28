import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4d59b95f = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _49fbf4ce = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _5db5f8dd = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5944cc9d = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _c5dd8cd4 = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _0b901b7d = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _20cc39e0 = () => interopDefault(import('..\\pages\\admin\\candidate.vue' /* webpackChunkName: "pages/admin/candidate" */))
const _d7e35474 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4d59b95f,
    name: "admin"
  }, {
    path: "/inspire",
    component: _49fbf4ce,
    name: "inspire"
  }, {
    path: "/login",
    component: _5db5f8dd,
    name: "login"
  }, {
    path: "/testbase64",
    component: _5944cc9d,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _c5dd8cd4,
    name: "testdatareal"
  }, {
    path: "/testimage",
    component: _0b901b7d,
    name: "testimage"
  }, {
    path: "/admin/candidate",
    component: _20cc39e0,
    name: "admin-candidate"
  }, {
    path: "/",
    component: _d7e35474,
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
