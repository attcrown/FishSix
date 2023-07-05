exports.ids = [22];
exports.modules = {

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/testbase64.vue?vue&type=template&id=9dee79f0&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', []);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/testbase64.vue?vue&type=template&id=9dee79f0&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/testbase64.vue?vue&type=script&lang=js&
// base64
// btoa encode
// atob decode
/* harmony default export */ var testbase64vue_type_script_lang_js_ = ({
  layout: 'login',
  data() {
    return {};
  },
  mounted() {
    this.encode();
    this.decode();
  },
  methods: {
    encode() {
      const encodedData = btoa('Hello, World!');
      console.log(encodedData);
    },
    decode() {
      const decodedData = atob('SGVsbG8sIFdvcmxkIQ==');
      console.log(decodedData);
    }
  }
});
// CONCATENATED MODULE: ./pages/testbase64.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_testbase64vue_type_script_lang_js_ = (testbase64vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// CONCATENATED MODULE: ./pages/testbase64.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_testbase64vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2037adb6"
  
)

/* harmony default export */ var testbase64 = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=testbase64.js.map