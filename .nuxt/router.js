import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17247bd4 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _273515b7 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _6d644006 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3c3393b4 = () => interopDefault(import('..\\pages\\reset_pass.vue' /* webpackChunkName: "pages/reset_pass" */))
const _d4ee363a = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _54619714 = () => interopDefault(import('..\\pages\\testbase64.vue' /* webpackChunkName: "pages/testbase64" */))
const _4425424d = () => interopDefault(import('..\\pages\\testdatareal.vue' /* webpackChunkName: "pages/testdatareal" */))
const _7f04a626 = () => interopDefault(import('..\\pages\\testimage.vue' /* webpackChunkName: "pages/testimage" */))
const _43a12104 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _74aec910 = () => interopDefault(import('..\\pages\\admin\\basket\\index.vue' /* webpackChunkName: "pages/admin/basket/index" */))
const _1f0a0e5b = () => interopDefault(import('..\\pages\\admin\\candidate\\index.vue' /* webpackChunkName: "pages/admin/candidate/index" */))
const _74f31cd8 = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _4f453a5a = () => interopDefault(import('..\\pages\\admin\\edit_shop\\index.vue' /* webpackChunkName: "pages/admin/edit_shop/index" */))
const _c676390e = () => interopDefault(import('..\\pages\\admin\\matching\\index.vue' /* webpackChunkName: "pages/admin/matching/index" */))
const _8a9bf640 = () => interopDefault(import('..\\pages\\admin\\shop\\index.vue' /* webpackChunkName: "pages/admin/shop/index" */))
const _0b89a3a3 = () => interopDefault(import('..\\pages\\admin\\student\\index.vue' /* webpackChunkName: "pages/admin/student/index" */))
const _79e34012 = () => interopDefault(import('..\\pages\\admin\\subject\\index.vue' /* webpackChunkName: "pages/admin/subject/index" */))
const _357220a9 = () => interopDefault(import('..\\pages\\admin\\table_now.vue' /* webpackChunkName: "pages/admin/table_now" */))
const _f9facea6 = () => interopDefault(import('..\\pages\\admin\\table_teacher\\index.vue' /* webpackChunkName: "pages/admin/table_teacher/index" */))
const _a951dd0c = () => interopDefault(import('..\\pages\\admin\\table_user\\index.vue' /* webpackChunkName: "pages/admin/table_user/index" */))
const _50819b9c = () => interopDefault(import('..\\pages\\admin\\teacher\\index.vue' /* webpackChunkName: "pages/admin/teacher/index" */))
const _ea220170 = () => interopDefault(import('..\\pages\\teacher\\profile\\index.vue' /* webpackChunkName: "pages/teacher/profile/index" */))
const _c5939c7a = () => interopDefault(import('..\\pages\\teacher\\table\\index.vue' /* webpackChunkName: "pages/teacher/table/index" */))
const _285c4f72 = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/profile/index" */))
const _e2ad82fc = () => interopDefault(import('..\\pages\\user\\table\\index.vue' /* webpackChunkName: "pages/user/table/index" */))
const _2db37df5 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\additem.vue' /* webpackChunkName: "pages/admin/edit_shop/additem" */))
const _55ec1790 = () => interopDefault(import('..\\pages\\admin\\edit_shop\\testter.vue' /* webpackChunkName: "pages/admin/edit_shop/testter" */))
const _3e554f67 = () => interopDefault(import('..\\pages\\admin\\matching\\calendar.vue' /* webpackChunkName: "pages/admin/matching/calendar" */))
const _175f6880 = () => interopDefault(import('..\\pages\\admin\\matching\\table_active.vue' /* webpackChunkName: "pages/admin/matching/table_active" */))
const _0773e87b = () => interopDefault(import('..\\pages\\admin\\matching\\table_match.vue' /* webpackChunkName: "pages/admin/matching/table_match" */))
const _d617a072 = () => interopDefault(import('..\\pages\\admin\\register-teacher\\register.vue' /* webpackChunkName: "pages/admin/register-teacher/register" */))
const _667862f5 = () => interopDefault(import('..\\pages\\admin\\shop\\item.vue' /* webpackChunkName: "pages/admin/shop/item" */))
const _6b86cb66 = () => interopDefault(import('..\\pages\\admin\\shop\\title.vue' /* webpackChunkName: "pages/admin/shop/title" */))
const _04043f60 = () => interopDefault(import('..\\pages\\admin\\student\\detail.vue' /* webpackChunkName: "pages/admin/student/detail" */))
const _b6b45046 = () => interopDefault(import('..\\pages\\admin\\student\\list.vue' /* webpackChunkName: "pages/admin/student/list" */))
const _2fa69fe2 = () => interopDefault(import('..\\pages\\admin\\student\\register.vue' /* webpackChunkName: "pages/admin/student/register" */))
const _2960b880 = () => interopDefault(import('..\\pages\\admin\\subject\\sub.vue' /* webpackChunkName: "pages/admin/subject/sub" */))
const _0d56e1e2 = () => interopDefault(import('..\\pages\\admin\\subject\\table_sub.vue' /* webpackChunkName: "pages/admin/subject/table_sub" */))
const _e2e8a9a8 = () => interopDefault(import('..\\pages\\admin\\subject\\table_sub_inter.vue' /* webpackChunkName: "pages/admin/subject/table_sub_inter" */))
const _97351514 = () => interopDefault(import('..\\pages\\admin\\table_user\\status_student.vue' /* webpackChunkName: "pages/admin/table_user/status_student" */))
const _4c87f372 = () => interopDefault(import('..\\pages\\admin\\table_user\\table_tea.vue' /* webpackChunkName: "pages/admin/table_user/table_tea" */))
const _5804e777 = () => interopDefault(import('..\\pages\\admin\\teacher\\detail.vue' /* webpackChunkName: "pages/admin/teacher/detail" */))
const _33427cc4 = () => interopDefault(import('..\\pages\\admin\\teacher\\list.vue' /* webpackChunkName: "pages/admin/teacher/list" */))
const _24087949 = () => interopDefault(import('..\\pages\\admin\\teacher\\register.vue' /* webpackChunkName: "pages/admin/teacher/register" */))
const _7b532bbe = () => interopDefault(import('..\\pages\\user\\table\\calendar.vue' /* webpackChunkName: "pages/user/table/calendar" */))
const _b886c622 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _17247bd4,
    name: "admin"
  }, {
    path: "/inspire",
    component: _273515b7,
    name: "inspire"
  }, {
    path: "/login",
    component: _6d644006,
    name: "login"
  }, {
    path: "/reset_pass",
    component: _3c3393b4,
    name: "reset_pass"
  }, {
    path: "/teacher",
    component: _d4ee363a,
    name: "teacher"
  }, {
    path: "/testbase64",
    component: _54619714,
    name: "testbase64"
  }, {
    path: "/testdatareal",
    component: _4425424d,
    name: "testdatareal"
  }, {
    path: "/testimage",
    component: _7f04a626,
    name: "testimage"
  }, {
    path: "/user",
    component: _43a12104,
    name: "user"
  }, {
    path: "/admin/basket",
    component: _74aec910,
    name: "admin-basket"
  }, {
    path: "/admin/candidate",
    component: _1f0a0e5b,
    name: "admin-candidate"
  }, {
    path: "/admin/dashboard",
    component: _74f31cd8,
    name: "admin-dashboard"
  }, {
    path: "/admin/edit_shop",
    component: _4f453a5a,
    name: "admin-edit_shop"
  }, {
    path: "/admin/matching",
    component: _c676390e,
    name: "admin-matching"
  }, {
    path: "/admin/shop",
    component: _8a9bf640,
    name: "admin-shop"
  }, {
    path: "/admin/student",
    component: _0b89a3a3,
    name: "admin-student"
  }, {
    path: "/admin/subject",
    component: _79e34012,
    name: "admin-subject"
  }, {
    path: "/admin/table_now",
    component: _357220a9,
    name: "admin-table_now"
  }, {
    path: "/admin/table_teacher",
    component: _f9facea6,
    name: "admin-table_teacher"
  }, {
    path: "/admin/table_user",
    component: _a951dd0c,
    name: "admin-table_user"
  }, {
    path: "/admin/teacher",
    component: _50819b9c,
    name: "admin-teacher"
  }, {
    path: "/teacher/profile",
    component: _ea220170,
    name: "teacher-profile"
  }, {
    path: "/teacher/table",
    component: _c5939c7a,
    name: "teacher-table"
  }, {
    path: "/user/profile",
    component: _285c4f72,
    name: "user-profile"
  }, {
    path: "/user/table",
    component: _e2ad82fc,
    name: "user-table"
  }, {
    path: "/admin/edit_shop/additem",
    component: _2db37df5,
    name: "admin-edit_shop-additem"
  }, {
    path: "/admin/edit_shop/testter",
    component: _55ec1790,
    name: "admin-edit_shop-testter"
  }, {
    path: "/admin/matching/calendar",
    component: _3e554f67,
    name: "admin-matching-calendar"
  }, {
    path: "/admin/matching/table_active",
    component: _175f6880,
    name: "admin-matching-table_active"
  }, {
    path: "/admin/matching/table_match",
    component: _0773e87b,
    name: "admin-matching-table_match"
  }, {
    path: "/admin/register-teacher/register",
    component: _d617a072,
    name: "admin-register-teacher-register"
  }, {
    path: "/admin/shop/item",
    component: _667862f5,
    name: "admin-shop-item"
  }, {
    path: "/admin/shop/title",
    component: _6b86cb66,
    name: "admin-shop-title"
  }, {
    path: "/admin/student/detail",
    component: _04043f60,
    name: "admin-student-detail"
  }, {
    path: "/admin/student/list",
    component: _b6b45046,
    name: "admin-student-list"
  }, {
    path: "/admin/student/register",
    component: _2fa69fe2,
    name: "admin-student-register"
  }, {
    path: "/admin/subject/sub",
    component: _2960b880,
    name: "admin-subject-sub"
  }, {
    path: "/admin/subject/table_sub",
    component: _0d56e1e2,
    name: "admin-subject-table_sub"
  }, {
    path: "/admin/subject/table_sub_inter",
    component: _e2e8a9a8,
    name: "admin-subject-table_sub_inter"
  }, {
    path: "/admin/table_user/status_student",
    component: _97351514,
    name: "admin-table_user-status_student"
  }, {
    path: "/admin/table_user/table_tea",
    component: _4c87f372,
    name: "admin-table_user-table_tea"
  }, {
    path: "/admin/teacher/detail",
    component: _5804e777,
    name: "admin-teacher-detail"
  }, {
    path: "/admin/teacher/list",
    component: _33427cc4,
    name: "admin-teacher-list"
  }, {
    path: "/admin/teacher/register",
    component: _24087949,
    name: "admin-teacher-register"
  }, {
    path: "/user/table/calendar",
    component: _7b532bbe,
    name: "user-table-calendar"
  }, {
    path: "/",
    component: _b886c622,
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
