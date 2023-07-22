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
const _7aaa094a = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _1cea1bbe = () => interopDefault(import('..\\pages\\admin\\edit_shop\\index.vue' /* webpackChunkName: "pages/admin/edit_shop/index" */))
const _61bd9b2a = () => interopDefault(import('..\\pages\\admin\\matching\\index.vue' /* webpackChunkName: "pages/admin/matching/index" */))
const _2e5f9cd2 = () => interopDefault(import('..\\pages\\admin\\shop\\index.vue' /* webpackChunkName: "pages/admin/shop/index" */))
const _bc62a31e = () => interopDefault(import('..\\pages\\admin\\student\\index.vue' /* webpackChunkName: "pages/admin/student/index" */))
const _10284ae0 = () => interopDefault(import('..\\pages\\admin\\subject\\index.vue' /* webpackChunkName: "pages/admin/subject/index" */))
const _3b290d1b = () => interopDefault(import('..\\pages\\admin\\table_now.vue' /* webpackChunkName: "pages/admin/table_now" */))
const _211bd0fb = () => interopDefault(import('..\\pages\\admin\\table_teacher\\index.vue' /* webpackChunkName: "pages/admin/table_teacher/index" */))
const _90492828 = () => interopDefault(import('..\\pages\\admin\\table_user\\index.vue' /* webpackChunkName: "pages/admin/table_user/index" */))
const _3272b32c = () => interopDefault(import('..\\pages\\admin\\teacher\\index.vue' /* webpackChunkName: "pages/admin/teacher/index" */))
const _b7c6e2d4 = () => interopDefault(import('..\\pages\\teacher\\profile\\index.vue' /* webpackChunkName: "pages/teacher/profile/index" */))
const _337b3c91 = () => interopDefault(import('..\\pages\\teacher\\table\\index.vue' /* webpackChunkName: "pages/teacher/table/index" */))
const _2a793bb9 = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/profile/index" */))
const _0256d674 = () => interopDefault(import('..\\pages\\user\\table\\index.vue' /* webpackChunkName: "pages/user/table/index" */))
const _9c8b1c7a = () => interopDefault(import('..\\pages\\admin\\edit_shop\\additem.vue' /* webpackChunkName: "pages/admin/edit_shop/additem" */))
const _4c19e944 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\testter.vue' /* webpackChunkName: "pages/admin/edit_shop/testter" */))
const _7b477996 = () => interopDefault(import('..\\pages\\admin\\matching\\calendar.vue' /* webpackChunkName: "pages/admin/matching/calendar" */))
const _70fca88e = () => interopDefault(import('..\\pages\\admin\\matching\\table_active.vue' /* webpackChunkName: "pages/admin/matching/table_active" */))
const _2c81b9ed = () => interopDefault(import('..\\pages\\admin\\matching\\table_match.vue' /* webpackChunkName: "pages/admin/matching/table_match" */))
const _112d14d6 = () => interopDefault(import('..\\pages\\admin\\register-teacher\\register.vue' /* webpackChunkName: "pages/admin/register-teacher/register" */))
const _179f04c3 = () => interopDefault(import('..\\pages\\admin\\shop\\item.vue' /* webpackChunkName: "pages/admin/shop/item" */))
const _41973950 = () => interopDefault(import('..\\pages\\admin\\shop\\title.vue' /* webpackChunkName: "pages/admin/shop/title" */))
const _305a2f42 = () => interopDefault(import('..\\pages\\admin\\student\\detail.vue' /* webpackChunkName: "pages/admin/student/detail" */))
const _39658962 = () => interopDefault(import('..\\pages\\admin\\student\\list.vue' /* webpackChunkName: "pages/admin/student/list" */))
const _3c2afa54 = () => interopDefault(import('..\\pages\\admin\\student\\register.vue' /* webpackChunkName: "pages/admin/student/register" */))
const _29e81328 = () => interopDefault(import('..\\pages\\admin\\subject\\input_location.vue' /* webpackChunkName: "pages/admin/subject/input_location" */))
const _2b661ece = () => interopDefault(import('..\\pages\\admin\\subject\\sub.vue' /* webpackChunkName: "pages/admin/subject/sub" */))
const _ebfe8e30 = () => interopDefault(import('..\\pages\\admin\\subject\\table_location.vue' /* webpackChunkName: "pages/admin/subject/table_location" */))
const _7d5b82dd = () => interopDefault(import('..\\pages\\admin\\subject\\table_sub.vue' /* webpackChunkName: "pages/admin/subject/table_sub" */))
const _dcd7e70c = () => interopDefault(import('..\\pages\\admin\\subject\\table_sub_inter.vue' /* webpackChunkName: "pages/admin/subject/table_sub_inter" */))
const _16dabb44 = () => interopDefault(import('..\\pages\\admin\\table_user\\status_student.vue' /* webpackChunkName: "pages/admin/table_user/status_student" */))
const _026c508e = () => interopDefault(import('..\\pages\\admin\\table_user\\table_tea.vue' /* webpackChunkName: "pages/admin/table_user/table_tea" */))
const _eb3d932e = () => interopDefault(import('..\\pages\\admin\\teacher\\detail.vue' /* webpackChunkName: "pages/admin/teacher/detail" */))
const _71e9e036 = () => interopDefault(import('..\\pages\\admin\\teacher\\list.vue' /* webpackChunkName: "pages/admin/teacher/list" */))
const _308cd3bb = () => interopDefault(import('..\\pages\\admin\\teacher\\register.vue' /* webpackChunkName: "pages/admin/teacher/register" */))
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
    path: "/reset_pass",
    component: _422d84b4,
    name: "reset_pass"
  }, {
    path: "/teacher",
    component: _309445d5,
    name: "teacher"
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
    path: "/user",
    component: _10be955c,
    name: "user"
  }, {
    path: "/admin/basket",
    component: _9953a6fc,
    name: "admin-basket"
  }, {
    path: "/admin/candidate",
    component: _38379da9,
    name: "admin-candidate"
  }, {
    path: "/admin/dashboard",
    component: _7aaa094a,
    name: "admin-dashboard"
  }, {
    path: "/admin/edit_shop",
    component: _1cea1bbe,
    name: "admin-edit_shop"
  }, {
    path: "/admin/matching",
    component: _61bd9b2a,
    name: "admin-matching"
  }, {
    path: "/admin/shop",
    component: _2e5f9cd2,
    name: "admin-shop"
  }, {
    path: "/admin/student",
    component: _bc62a31e,
    name: "admin-student"
  }, {
    path: "/admin/subject",
    component: _10284ae0,
    name: "admin-subject"
  }, {
    path: "/admin/table_now",
    component: _3b290d1b,
    name: "admin-table_now"
  }, {
    path: "/admin/table_teacher",
    component: _211bd0fb,
    name: "admin-table_teacher"
  }, {
    path: "/admin/table_user",
    component: _90492828,
    name: "admin-table_user"
  }, {
    path: "/admin/teacher",
    component: _3272b32c,
    name: "admin-teacher"
  }, {
    path: "/teacher/profile",
    component: _b7c6e2d4,
    name: "teacher-profile"
  }, {
    path: "/teacher/table",
    component: _337b3c91,
    name: "teacher-table"
  }, {
    path: "/user/profile",
    component: _2a793bb9,
    name: "user-profile"
  }, {
    path: "/user/table",
    component: _0256d674,
    name: "user-table"
  }, {
    path: "/admin/edit_shop/additem",
    component: _9c8b1c7a,
    name: "admin-edit_shop-additem"
  }, {
    path: "/admin/edit_shop/testter",
    component: _4c19e944,
    name: "admin-edit_shop-testter"
  }, {
    path: "/admin/matching/calendar",
    component: _7b477996,
    name: "admin-matching-calendar"
  }, {
    path: "/admin/matching/table_active",
    component: _70fca88e,
    name: "admin-matching-table_active"
  }, {
    path: "/admin/matching/table_match",
    component: _2c81b9ed,
    name: "admin-matching-table_match"
  }, {
    path: "/admin/register-teacher/register",
    component: _112d14d6,
    name: "admin-register-teacher-register"
  }, {
    path: "/admin/shop/item",
    component: _179f04c3,
    name: "admin-shop-item"
  }, {
    path: "/admin/shop/title",
    component: _41973950,
    name: "admin-shop-title"
  }, {
    path: "/admin/student/detail",
    component: _305a2f42,
    name: "admin-student-detail"
  }, {
    path: "/admin/student/list",
    component: _39658962,
    name: "admin-student-list"
  }, {
    path: "/admin/student/register",
    component: _3c2afa54,
    name: "admin-student-register"
  }, {
    path: "/admin/subject/input_location",
    component: _29e81328,
    name: "admin-subject-input_location"
  }, {
    path: "/admin/subject/sub",
    component: _2b661ece,
    name: "admin-subject-sub"
  }, {
    path: "/admin/subject/table_location",
    component: _ebfe8e30,
    name: "admin-subject-table_location"
  }, {
    path: "/admin/subject/table_sub",
    component: _7d5b82dd,
    name: "admin-subject-table_sub"
  }, {
    path: "/admin/subject/table_sub_inter",
    component: _dcd7e70c,
    name: "admin-subject-table_sub_inter"
  }, {
    path: "/admin/table_user/status_student",
    component: _16dabb44,
    name: "admin-table_user-status_student"
  }, {
    path: "/admin/table_user/table_tea",
    component: _026c508e,
    name: "admin-table_user-table_tea"
  }, {
    path: "/admin/teacher/detail",
    component: _eb3d932e,
    name: "admin-teacher-detail"
  }, {
    path: "/admin/teacher/list",
    component: _71e9e036,
    name: "admin-teacher-list"
  }, {
    path: "/admin/teacher/register",
    component: _308cd3bb,
    name: "admin-teacher-register"
  }, {
    path: "/user/table/calendar",
    component: _1198368c,
    name: "user-table-calendar"
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
