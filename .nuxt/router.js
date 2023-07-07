import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6ea05258 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _7e55e435 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _ba7ad3f8 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _6ef14c76 = () => interopDefault(import('..\\pages\\reset_pass.vue' /* webpackChunkName: "pages/reset_pass" */))
const _4d586ca5 = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _f1c16054 = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _83505ae2 = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _dda865b8 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _689a8082 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _54f5f752 = () => interopDefault(import('..\\pages\\admin\\basket\\index.vue' /* webpackChunkName: "pages/admin/basket/index" */))
const _cb2bbe4e = () => interopDefault(import('..\\pages\\admin\\candidate\\index.vue' /* webpackChunkName: "pages/admin/candidate/index" */))
const _53bd7551 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\index.vue' /* webpackChunkName: "pages/admin/edit_shop/index" */))
const _6c13dba2 = () => interopDefault(import('..\\pages\\admin\\shop\\index.vue' /* webpackChunkName: "pages/admin/shop/index" */))
const _52f93c2b = () => interopDefault(import('..\\pages\\admin\\table_teacher\\index.vue' /* webpackChunkName: "pages/admin/table_teacher/index" */))
const _c80d6288 = () => interopDefault(import('..\\pages\\admin\\table_user\\index.vue' /* webpackChunkName: "pages/admin/table_user/index" */))
const _064f11c6 = () => interopDefault(import('..\\pages\\teacher\\profile\\index.vue' /* webpackChunkName: "pages/teacher/profile/index" */))
const _7456687e = () => interopDefault(import('..\\pages\\teacher\\table\\index.vue' /* webpackChunkName: "pages/teacher/table/index" */))
const _67cdf2ee = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/profile/index" */))
const _400b1544 = () => interopDefault(import('..\\pages\\user\\table\\index.vue' /* webpackChunkName: "pages/user/table/index" */))
const _5158e8f3 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\additem.vue' /* webpackChunkName: "pages/admin/edit_shop/additem" */))
const _7991828e = () => interopDefault(import('..\\pages\\admin\\edit_shop\\testter.vue' /* webpackChunkName: "pages/admin/edit_shop/testter" */))
const _b400a81a = () => interopDefault(import('..\\pages\\admin\\shop\\item.vue' /* webpackChunkName: "pages/admin/shop/item" */))
const _1ce8a228 = () => interopDefault(import('..\\pages\\admin\\shop\\title.vue' /* webpackChunkName: "pages/admin/shop/title" */))
const _d81a3d16 = () => interopDefault(import('..\\pages\\admin\\table_teacher\\calendar.vue' /* webpackChunkName: "pages/admin/table_teacher/calendar" */))
const _b81c7488 = () => interopDefault(import('..\\pages\\user\\table\\calendar.vue' /* webpackChunkName: "pages/user/table/calendar" */))
const _4dca1a26 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _6ea05258,
    name: "admin"
  }, {
    path: "/inspire",
    component: _7e55e435,
    name: "inspire"
  }, {
    path: "/login",
    component: _ba7ad3f8,
    name: "login"
  }, {
    path: "/reset_pass",
    component: _6ef14c76,
    name: "reset_pass"
  }, {
    path: "/teacher",
    component: _4d586ca5,
    name: "teacher"
  }, {
    path: "/testbase64",
    component: _f1c16054,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _83505ae2,
    name: "testdatareal"
  }, {
    path: "/testimage",
    component: _dda865b8,
    name: "testimage"
  }, {
    path: "/user",
    component: _689a8082,
    name: "user"
  }, {
    path: "/admin/basket",
    component: _54f5f752,
    name: "admin-basket"
  }, {
    path: "/admin/candidate",
    component: _cb2bbe4e,
    name: "admin-candidate"
  }, {
    path: "/admin/edit_shop",
    component: _53bd7551,
    name: "admin-edit_shop"
  }, {
    path: "/admin/shop",
    component: _6c13dba2,
    name: "admin-shop"
  }, {
    path: "/admin/table_teacher",
    component: _52f93c2b,
    name: "admin-table_teacher"
  }, {
    path: "/admin/table_user",
    component: _c80d6288,
    name: "admin-table_user"
  }, {
    path: "/teacher/profile",
    component: _064f11c6,
    name: "teacher-profile"
  }, {
    path: "/teacher/table",
    component: _7456687e,
    name: "teacher-table"
  }, {
    path: "/user/profile",
    component: _67cdf2ee,
    name: "user-profile"
  }, {
    path: "/user/table",
    component: _400b1544,
    name: "user-table"
  }, {
    path: "/admin/edit_shop/additem",
    component: _5158e8f3,
    name: "admin-edit_shop-additem"
  }, {
    path: "/admin/edit_shop/testter",
    component: _7991828e,
    name: "admin-edit_shop-testter"
  }, {
    path: "/admin/shop/item",
    component: _b400a81a,
    name: "admin-shop-item"
  }, {
    path: "/admin/shop/title",
    component: _1ce8a228,
    name: "admin-shop-title"
  }, {
    path: "/admin/table_teacher/calendar",
    component: _d81a3d16,
    name: "admin-table_teacher-calendar"
  }, {
    path: "/user/table/calendar",
    component: _b81c7488,
    name: "user-table-calendar"
  }, {
    path: "/",
    component: _4dca1a26,
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
