(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{612:function(t,e,r){var content=r(640);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(17).default)("5e99e7fa",content,!0,{sourceMap:!1})},639:function(t,e,r){"use strict";r(612)},640:function(t,e,r){var n=r(16)((function(i){return i[1]}));n.push([t.i,".input-container{align-items:center;display:flex}.input-container .mdi{margin-right:8px}.large-icon{font-size:24px}.sheet-container{position:relative;top:50%;transform:translateY(0)}",""]),n.locals={},t.exports=n},676:function(t,e,r){"use strict";r.r(e);var n=r(233),o=r(502),l=r(463),c=r(667),m=r(597),d=r(503),f=r(671),v=r(54),h=r(456),N=r(490),x=r(7),_=(r(40),r(41),r(175),{layout:"login",data:function(){return{dialog:!1,ex4:!1,firstName:"",firstNameRules:[function(t){return(null==t?void 0:t.length)>1||"กรุณาใส่ Username"}],lastName:"",lastNameRules:[function(t){return(null==t?void 0:t.length)>1||"กรุณาใส่ Password"}]}},mounted:function(){this.checkuser()},methods:{validate:function(){var t=this;return Object(x.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$refs.form.validate();case 2:r=e.sent,r.valid&&alert("Form is valid");case 5:case"end":return e.stop()}}),e)})))()},submitForm:function(){var t=this;""==!this.firstName&&""==!this.lastName&&this.$fireModule.database().ref("user/".concat(this.encode(this.firstName),"/")).on("value",(function(e){var r=e.val();null!=r&&r.name==t.firstName&&r.password==t.lastName?t.ex4?(localStorage.setItem("firstName",r.name),localStorage.setItem("lastName",t.encode(t.firstName)),localStorage.setItem("status",r.status),t.$router.push("/".concat(localStorage.getItem("status")))):(sessionStorage.setItem("firstName",r.name),sessionStorage.setItem("lastName",t.encode(t.firstName)),sessionStorage.setItem("status",r.status),t.$router.push("/".concat(sessionStorage.getItem("status")))):t.dialog=!0}))},checkuser:function(){"admin"!=localStorage.getItem("status")&&"admin"!=sessionStorage.getItem("status")||this.$router.push("/admin"),"user"!=localStorage.getItem("status")&&"user"!=sessionStorage.getItem("status")||this.$router.push("/user"),"teacher"!=localStorage.getItem("status")&&"teacher"!=sessionStorage.getItem("status")||this.$router.push("/teacher")},encode:function(a){return btoa(a)}}}),k=(r(639),r(56)),component=Object(k.a)(_,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container input-container",staticStyle:{height:"100%"}},[e(v.a,{staticClass:"mx-auto p-5 rounded-5",staticStyle:{"background-color":"rgba(245, 245, 245, 0.918)"},attrs:{width:"400"}},[e(f.a,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"input-container"},[e("span",{staticClass:"mdi mdi-account-key large-icon"}),t._v(" "),e(N.a,{attrs:{label:"Username",rules:t.firstNameRules,required:""},model:{value:t.firstName,callback:function(e){t.firstName=e},expression:"firstName"}})],1),t._v(" "),e("div",{staticClass:"input-container"},[e("span",{staticClass:"mdi mdi-lock large-icon"}),t._v(" "),e(N.a,{attrs:{type:"password",label:"Password",rules:t.lastNameRules,required:""},model:{value:t.lastName,callback:function(e){t.lastName=e},expression:"lastName"}})],1),t._v(" "),e("div",[e(c.a,{attrs:{label:"save",color:"success",value:"success","hide-details":""},model:{value:t.ex4,callback:function(e){t.ex4=e},expression:"ex4"}})],1),t._v(" "),e(n.a,{staticClass:"mt-3 mb-3",attrs:{type:"submit",block:"",color:"success"},on:{click:function(e){return t.validate()}}},[t._v("LOGIN")]),t._v(" "),e("nuxt-link",{attrs:{to:"/reset_pass"}},[t._v("Go to Reset Password")])],1)],1),t._v(" "),e("div",{staticClass:"text-center"},[e(m.a,{attrs:{width:"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(o.a,[e(l.c,{staticClass:"text-h5 red lighten-2"},[e("span",{staticClass:"mdi mdi-message-alert"}),t._v(" Failed \n        ")]),t._v(" "),e(l.b,[e("br"),t._v(" "),e("h5",[t._v("กรุณากรอก Username หรือ Password ให้ถูกต้อง")])]),t._v(" "),e(d.a),t._v(" "),e(l.a,[e(h.a),t._v(" "),e(n.a,{attrs:{color:"red",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);