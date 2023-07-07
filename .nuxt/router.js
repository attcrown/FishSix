import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7f3e90f0 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _1fd70105 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _a6f6b258 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _422d84b4 = () => interopDefault(import('..\\pages\\reset_pass.vue' /* webpackChunkName: "pages/reset_pass" */))
const _309445d5 = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _11d17df4 = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _101837bf = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _524e1418 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _10be955c = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _9953a6fc = () => interopDefault(import('..\\pages\\admin\\basket\\index.vue' /* webpackChunkName: "pages/admin/basket/index" */))
const _38379da9 = () => interopDefault(import('..\\pages\\admin\\candidate\\index.vue' /* webpackChunkName: "pages/admin/candidate/index" */))
const _1cea1bbe = () => interopDefault(import('..\\pages\\admin\\edit_shop\\index.vue' /* webpackChunkName: "pages/admin/edit_shop/index" */))
const _2e5f9cd2 = () => interopDefault(import('..\\pages\\admin\\shop\\index.vue' /* webpackChunkName: "pages/admin/shop/index" */))
const _211bd0fb = () => interopDefault(import('..\\pages\\admin\\table_teacher\\index.vue' /* webpackChunkName: "pages/admin/table_teacher/index" */))
const _90492828 = () => interopDefault(import('..\\pages\\admin\\table_user\\index.vue' /* webpackChunkName: "pages/admin/table_user/index" */))
const _b7c6e2d4 = () => interopDefault(import('..\\pages\\teacher\\profile\\index.vue' /* webpackChunkName: "pages/teacher/profile/index" */))
const _337b3c91 = () => interopDefault(import('..\\pages\\teacher\\table\\index.vue' /* webpackChunkName: "pages/teacher/table/index" */))
const _2a793bb9 = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/profile/index" */))
const _0256d674 = () => interopDefault(import('..\\pages\\user\\table\\index.vue' /* webpackChunkName: "pages/user/table/index" */))
const _9c8b1c7a = () => interopDefault(import('..\\pages\\admin\\edit_shop\\additem.vue' /* webpackChunkName: "pages/admin/edit_shop/additem" */))
const _4c19e944 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\testter.vue' /* webpackChunkName: "pages/admin/edit_shop/testter" */))
const _179f04c3 = () => interopDefault(import('..\\pages\\admin\\shop\\item.vue' /* webpackChunkName: "pages/admin/shop/item" */))
const _41973950 = () => interopDefault(import('..\\pages\\admin\\shop\\title.vue' /* webpackChunkName: "pages/admin/shop/title" */))
const _83934ab6 = () => interopDefault(import('..\\pages\\admin\\table_teacher\\calendar.vue' /* webpackChunkName: "pages/admin/table_teacher/calendar" */))
const _1198368c = () => interopDefault(import('..\\pages\\user\\table\\calendar.vue' /* webpackChunkName: "pages/user/table/calendar" */))
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
    path: "/admin/calendar",
    component: _113fccf8,
    name: "admin-calendar"
  }, {
    path: "/admin/candidate",
    component: _cb2bbe4e,
    name: "admin-candidate"
  }, {
    path: "/admin/dashboard",
    component: _7aaa094a,
    name: "admin-dashboard"
  }, {
    path: "/admin/edit_shop",
    component: _53bd7551,
    name: "admin-edit_shop"
  }, {
    path: "/admin/shop",
    component: _6c13dba2,
    name: "admin-shop"
  }, {
    path: "/admin/table_active",
    component: _2baf98d1,
    name: "admin-table_active"
  }, {
    path: "/admin/table_match",
    component: _e543956c,
    name: "admin-table_match"
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
    component: _83934ab6,
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
