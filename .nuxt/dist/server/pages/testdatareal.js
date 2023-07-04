exports.ids = [23];
exports.modules = {

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/testdatareal.vue?vue&type=template&id=4b6f7d3b&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._ssrNode("<button>add</button> <button>del</button> <button>read</button>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/testdatareal.vue?vue&type=template&id=4b6f7d3b&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/testdatareal.vue?vue&type=script&lang=js&
/* harmony default export */ var testdatarealvue_type_script_lang_js_ = ({
  layout: 'login',
  data() {
    return {
      item: []
    };
  },
  mounted() {},
  methods: {
    readdata() {
      console.log('ทำงาน');
      const db = this.$fireModule.database();
      db.ref("test/").on("value", snapshot => {
        const childData = snapshot.val();
        console.log(childData);
        this.item = childData;
      });
    },
    write() {
      const db = this.$fireModule.database();
      db.ref("test/").set({
        date: 19,
        name: 'fff'
      });
    },
    deletedddd() {
      const db = this.$fireModule.database();
      db.ref(`test/`).remove();
    }
  }
});
// CONCATENATED MODULE: ./pages/testdatareal.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_testdatarealvue_type_script_lang_js_ = (testdatarealvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// CONCATENATED MODULE: ./pages/testdatareal.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_testdatarealvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "72d0386f"
  
)

/* harmony default export */ var testdatareal = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=testdatareal.js.map