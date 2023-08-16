import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3eecc170 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _dfa77d76 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _74a611d8 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _2fa91566 = () => interopDefault(import('..\\pages\\reset_pass.vue' /* webpackChunkName: "pages/reset_pass" */))
const _2bbb84d6 = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _47d718c6 = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _30411f7f = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _133fc190 = () => interopDefault(import('..\\pages\\testexcel.vue' /* webpackChunkName: "pages/testexcel" */))
const _f241b398 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _413b22ab = () => interopDefault(import('..\\pages\\testimportExcel.vue' /* webpackChunkName: "pages/testimportExcel" */))
const _824854dc = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _00845de9 = () => interopDefault(import('..\\pages\\admin\\candidate\\index.vue' /* webpackChunkName: "pages/admin/candidate/index" */))
const _411899b3 = () => interopDefault(import('..\\pages\\admin\\content\\index.vue' /* webpackChunkName: "pages/admin/content/index" */))
const _0899110a = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _33c92baa = () => interopDefault(import('..\\pages\\admin\\matching\\index.vue' /* webpackChunkName: "pages/admin/matching/index" */))
const _aa63029e = () => interopDefault(import('..\\pages\\admin\\student\\index.vue' /* webpackChunkName: "pages/admin/student/index" */))
const _19281b20 = () => interopDefault(import('..\\pages\\admin\\subject\\index.vue' /* webpackChunkName: "pages/admin/subject/index" */))
const _673df401 = () => interopDefault(import('..\\pages\\admin\\submit_table\\index.vue' /* webpackChunkName: "pages/admin/submit_table/index" */))
const _6dcfd64a = () => interopDefault(import('..\\pages\\admin\\table_now.vue' /* webpackChunkName: "pages/admin/table_now" */))
const _788e713b = () => interopDefault(import('..\\pages\\admin\\table_teacher\\index.vue' /* webpackChunkName: "pages/admin/table_teacher/index" */))
const _0db298a8 = () => interopDefault(import('..\\pages\\admin\\table_user\\index.vue' /* webpackChunkName: "pages/admin/table_user/index" */))
const _207312ac = () => interopDefault(import('..\\pages\\admin\\teacher\\index.vue' /* webpackChunkName: "pages/admin/teacher/index" */))
const _6c694ed6 = () => interopDefault(import('..\\pages\\teacher\\profile\\index.vue' /* webpackChunkName: "pages/teacher/profile/index" */))
const _3c7b0cd1 = () => interopDefault(import('..\\pages\\teacher\\table\\index.vue' /* webpackChunkName: "pages/teacher/table/index" */))
const _7a1dd6a9 = () => interopDefault(import('..\\pages\\user\\content\\index.vue' /* webpackChunkName: "pages/user/content/index" */))
const _d3c3390e = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/profile/index" */))
const _5eba2398 = () => interopDefault(import('..\\pages\\user\\table\\index.vue' /* webpackChunkName: "pages/user/table/index" */))
const _7a4dac40 = () => interopDefault(import('..\\pages\\admin\\content\\detail.vue' /* webpackChunkName: "pages/admin/content/detail" */))
const _ab0c1916 = () => interopDefault(import('..\\pages\\admin\\matching\\calendar.vue' /* webpackChunkName: "pages/admin/matching/calendar" */))
const _936f8e64 = () => interopDefault(import('..\\pages\\admin\\matching\\table_active.vue' /* webpackChunkName: "pages/admin/matching/table_active" */))
const _7939bca6 = () => interopDefault(import('..\\pages\\admin\\matching\\table_match.vue' /* webpackChunkName: "pages/admin/matching/table_match" */))
const _e01a3456 = () => interopDefault(import('..\\pages\\admin\\register-teacher\\register.vue' /* webpackChunkName: "pages/admin/register-teacher/register" */))
const _47546702 = () => interopDefault(import('..\\pages\\admin\\student\\detail.vue' /* webpackChunkName: "pages/admin/student/detail" */))
const _4ef2630f = () => interopDefault(import('..\\pages\\admin\\student\\list.vue' /* webpackChunkName: "pages/admin/student/list" */))
const _7d764214 = () => interopDefault(import('..\\pages\\admin\\student\\register.vue' /* webpackChunkName: "pages/admin/student/register" */))
const _4f326e2c = () => interopDefault(import('..\\pages\\admin\\subject\\input_location.vue' /* webpackChunkName: "pages/admin/subject/input_location" */))
const _269cff0e = () => interopDefault(import('..\\pages\\admin\\subject\\sub.vue' /* webpackChunkName: "pages/admin/subject/sub" */))
const _23b19eb0 = () => interopDefault(import('..\\pages\\admin\\subject\\table_location.vue' /* webpackChunkName: "pages/admin/subject/table_location" */))
const _6579331d = () => interopDefault(import('..\\pages\\admin\\subject\\table_sub.vue' /* webpackChunkName: "pages/admin/subject/table_sub" */))
const _46644531 = () => interopDefault(import('..\\pages\\admin\\submit_table\\card.vue' /* webpackChunkName: "pages/admin/submit_table/card" */))
const _225cd265 = () => interopDefault(import('..\\pages\\admin\\table_teacher\\calendar.vue' /* webpackChunkName: "pages/admin/table_teacher/calendar" */))
const _78cb9d88 = () => interopDefault(import('..\\pages\\admin\\table_teacher\\table_tea.vue' /* webpackChunkName: "pages/admin/table_teacher/table_tea" */))
const _a137a8f8 = () => interopDefault(import('..\\pages\\admin\\table_user\\status_student.vue' /* webpackChunkName: "pages/admin/table_user/status_student" */))
const _d4a9810e = () => interopDefault(import('..\\pages\\admin\\table_user\\table_tea.vue' /* webpackChunkName: "pages/admin/table_user/table_tea" */))
const _bd4923ae = () => interopDefault(import('..\\pages\\admin\\teacher\\detail.vue' /* webpackChunkName: "pages/admin/teacher/detail" */))
const _44e1f014 = () => interopDefault(import('..\\pages\\admin\\teacher\\list.vue' /* webpackChunkName: "pages/admin/teacher/list" */))
const _71d81b7b = () => interopDefault(import('..\\pages\\admin\\teacher\\register.vue' /* webpackChunkName: "pages/admin/teacher/register" */))
const _1a9806cc = () => interopDefault(import('..\\pages\\user\\table\\calendar.vue' /* webpackChunkName: "pages/user/table/calendar" */))
const _07f55806 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3eecc170,
    name: "admin"
  }, {
    path: "/inspire",
    component: _dfa77d76,
    name: "inspire"
  }, {
    path: "/login",
    component: _74a611d8,
    name: "login"
  }, {
    path: "/reset_pass",
    component: _2fa91566,
    name: "reset_pass"
  }, {
    path: "/teacher",
    component: _2bbb84d6,
    name: "teacher"
  }, {
    path: "/testbase64",
    component: _47d718c6,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _30411f7f,
    name: "testdatareal"
  }, {
    path: "/testexcel",
    component: _133fc190,
    name: "testexcel"
  }, {
    path: "/testimage",
    component: _f241b398,
    name: "testimage"
  }, {
    path: "/testimportExcel",
    component: _413b22ab,
    name: "testimportExcel"
  }, {
    path: "/user",
    component: _824854dc,
    name: "user"
  }, {
    path: "/admin/candidate",
    component: _00845de9,
    name: "admin-candidate"
  }, {
    path: "/admin/content",
    component: _411899b3,
    name: "admin-content"
  }, {
    path: "/admin/dashboard",
    component: _0899110a,
    name: "admin-dashboard"
  }, {
    path: "/admin/matching",
    component: _33c92baa,
    name: "admin-matching"
  }, {
    path: "/admin/student",
    component: _aa63029e,
    name: "admin-student"
  }, {
    path: "/admin/subject",
    component: _19281b20,
    name: "admin-subject"
  }, {
    path: "/admin/submit_table",
    component: _673df401,
    name: "admin-submit_table"
  }, {
    path: "/admin/table_now",
    component: _6dcfd64a,
    name: "admin-table_now"
  }, {
    path: "/admin/table_teacher",
    component: _788e713b,
    name: "admin-table_teacher"
  }, {
    path: "/admin/table_user",
    component: _0db298a8,
    name: "admin-table_user"
  }, {
    path: "/admin/teacher",
    component: _207312ac,
    name: "admin-teacher"
  }, {
    path: "/teacher/profile",
    component: _6c694ed6,
    name: "teacher-profile"
  }, {
    path: "/teacher/table",
    component: _3c7b0cd1,
    name: "teacher-table"
  }, {
    path: "/user/content",
    component: _7a1dd6a9,
    name: "user-content"
  }, {
    path: "/user/profile",
    component: _d3c3390e,
    name: "user-profile"
  }, {
    path: "/user/table",
    component: _5eba2398,
    name: "user-table"
  }, {
    path: "/admin/content/detail",
    component: _7a4dac40,
    name: "admin-content-detail"
  }, {
    path: "/admin/matching/calendar",
    component: _ab0c1916,
    name: "admin-matching-calendar"
  }, {
    path: "/admin/matching/table_active",
    component: _936f8e64,
    name: "admin-matching-table_active"
  }, {
    path: "/admin/matching/table_match",
    component: _7939bca6,
    name: "admin-matching-table_match"
  }, {
    path: "/admin/register-teacher/register",
    component: _e01a3456,
    name: "admin-register-teacher-register"
  }, {
    path: "/admin/student/detail",
    component: _47546702,
    name: "admin-student-detail"
  }, {
    path: "/admin/student/list",
    component: _4ef2630f,
    name: "admin-student-list"
  }, {
    path: "/admin/student/register",
    component: _7d764214,
    name: "admin-student-register"
  }, {
    path: "/admin/subject/input_location",
    component: _4f326e2c,
    name: "admin-subject-input_location"
  }, {
    path: "/admin/subject/sub",
    component: _269cff0e,
    name: "admin-subject-sub"
  }, {
    path: "/admin/subject/table_location",
    component: _23b19eb0,
    name: "admin-subject-table_location"
  }, {
    path: "/admin/subject/table_sub",
    component: _6579331d,
    name: "admin-subject-table_sub"
  }, {
    path: "/admin/submit_table/card",
    component: _46644531,
    name: "admin-submit_table-card"
  }, {
    path: "/admin/table_teacher/calendar",
    component: _225cd265,
    name: "admin-table_teacher-calendar"
  }, {
    path: "/admin/table_teacher/table_tea",
    component: _78cb9d88,
    name: "admin-table_teacher-table_tea"
  }, {
    path: "/admin/table_user/status_student",
    component: _a137a8f8,
    name: "admin-table_user-status_student"
  }, {
    path: "/admin/table_user/table_tea",
    component: _d4a9810e,
    name: "admin-table_user-table_tea"
  }, {
    path: "/admin/teacher/detail",
    component: _bd4923ae,
    name: "admin-teacher-detail"
  }, {
    path: "/admin/teacher/list",
    component: _44e1f014,
    name: "admin-teacher-list"
  }, {
    path: "/admin/teacher/register",
    component: _71d81b7b,
    name: "admin-teacher-register"
  }, {
    path: "/user/table/calendar",
    component: _1a9806cc,
    name: "user-table-calendar"
  }, {
    path: "/",
    component: _07f55806,
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
