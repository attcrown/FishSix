exports.ids = [9];
exports.modules = {

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/index.vue?vue&type=template&id=08067bfe&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._ssrNode("<span>" + _vm._ssrEscape(_vm._s(_vm.firstName)) + "</span> <span>" + _vm._ssrEscape(_vm._s(_vm.keyuser)) + "</span> <button>out</button>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/admin/index.vue?vue&type=template&id=08067bfe&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/index.vue?vue&type=script&lang=js&
/* harmony default export */ var adminvue_type_script_lang_js_ = ({
  data() {
    return {
      firstName: 'ไม่มี',
      keyuser: 'ไม่มี'
    };
  },
  computed: {},
  mounted() {
    this.fullName();
  },
  methods: {
    getout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/login");
    },
    fullName() {
      if (localStorage.getItem('firstName') == null) {
        this.firstName = sessionStorage.getItem('firstName') || '';
        this.keyuser = sessionStorage.getItem('lastName') || '';
      } else {
        this.firstName = localStorage.getItem('firstName') || '';
        this.keyuser = localStorage.getItem('lastName') || '';
      }
    }
  }
});
// CONCATENATED MODULE: ./pages/admin/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_adminvue_type_script_lang_js_ = (adminvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// CONCATENATED MODULE: ./pages/admin/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_adminvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "5858b680"
  
)

/* harmony default export */ var admin = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=index.js.map