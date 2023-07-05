(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{708:function(e,t,r){"use strict";r.r(t);var n=r(730),o=r(217),c=r(693),l=r(602),h=r(200),m=r(486),d=r(54),v=r(483),$=(r(40),r(532)),f=r(533),x={mixins:[$.validationMixin],validations:{name:{required:f.required,maxLength:Object(f.maxLength)(10),minLength:Object(f.minLength)(6)},email:{required:f.required,email:f.email},select:{required:f.required},status:{required:f.required},pass:{required:f.required,maxLength:Object(f.maxLength)(20),minLength:Object(f.minLength)(6)},checkbox:{checked:function(e){return e}}},data:function(){return{login_go:"off",name:"",pass:"",conpass:"",email:"",select:null,status:null,items:["MEN","WOMEN"],status_items:["admin","teacher","user"],checkbox:!1}},computed:{checkboxErrors:function(){var e=[];return this.$v.checkbox.$dirty?(!this.$v.checkbox.checked&&e.push("You must agree to continue!"),e):e},selectErrors:function(){var e=[];return this.$v.select.$dirty?(!this.$v.select.required&&e.push("Item is required"),e):e},statusErrors:function(){var e=[];return this.$v.status.$dirty?(!this.$v.status.required&&e.push("Item is required"),e):e},nameErrors:function(){var e=[];return this.$v.name.$dirty?(!this.$v.name.maxLength&&e.push("Name must be at most 10 characters long"),!this.$v.name.minLength&&e.push("Name must be at least 6 characters long"),!this.$v.name.required&&e.push("Name is required."),e):e},emailErrors:function(){var e=[];return this.$v.email.$dirty?(!this.$v.email.email&&e.push("Must be valid e-mail"),!this.$v.email.required&&e.push("E-mail is required"),e):e},passErrors:function(){var e=[];return this.$v.pass.$dirty?(this.$v.pass.maxLength||e.push("Password must be at most 20 characters long"),this.$v.pass.minLength||e.push("Password must be at least 6 characters long"),this.$v.pass.required||e.push("Password is required"),e):e},conpassErrors:function(){var e=[];return this.$v.pass.$dirty?(this.$v.pass.maxLength||e.push("Password must be at most 20 characters long"),this.$v.pass.minLength||e.push("Password must be at least 6 characters long"),this.$v.pass.required||e.push("Password is required"),this.pass!==this.conpass&&e.push("รหัสผ่านไม่ตรงกัน"),e):e}},methods:{submit:function(){this.$v.$touch(),0===this.emailErrors.length&&0===this.passErrors.length&&0===this.nameErrors.length&&0===this.selectErrors.length&&0===this.checkboxErrors.length&&this.pass==this.conpass?(console.log("Save"),this.saveuser(),console.log(this.name+" "+this.pass+" "+this.email+" "+this.select+" "+this.checkbox)):console.log("errors save")},clear:function(){this.$v.$reset(),this.name="",this.email="",this.pass="",this.conpass="",this.select=null,this.status=null,this.checkbox=!1},saveuser:function(){this.$fireModule.database().ref("user/".concat(this.encode(this.name),"/")).set({name:this.name,password:this.pass,email:this.email,sex:this.select,status:this.status}),this.login_go="on",this.clear()},encode:function(a){return btoa(a)}}},k=r(56),component=Object(k.a)(x,(function(){var e=this,t=e._self._c;return t("div",[t(l.a,{directives:[{name:"show",rawName:"v-show",value:"on"===e.login_go,expression:"login_go === 'on'"}],staticClass:"text-center container",attrs:{cols:"12",md:"4"}},[t(n.a,{attrs:{elevation:"24",prominent:"",type:"success"}},[e._v("ท่านสามารถ login ในระบบได้เลย >>\n            "),t("nuxt-link",{attrs:{to:"/login"}},[e._v("Go to About Page")])],1)],1),e._v(" "),t("div",{staticClass:"d-flex justify-center align-center"},[t(d.a,{directives:[{name:"show",rawName:"v-show",value:"off"===e.login_go,expression:"login_go === 'off'"}],staticClass:"pa-1 text-center rounded-5 m-2",staticStyle:{background:"rgba(156, 154, 154, 0.719)",width:"500px"},attrs:{elevation:"16"}},[t(d.a,{staticClass:"rounded-5 p-4 m-3",staticStyle:{background:"rgba(255, 255, 255, 0.918)"},attrs:{elevation:"16"}},[t("form",{},[t(v.a,{attrs:{"error-messages":e.nameErrors,counter:10,label:"Username",required:""},on:{input:function(t){return e.$v.name.$touch()},blur:function(t){return e.$v.name.$touch()}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),t(v.a,{attrs:{"error-messages":e.passErrors,counter:20,label:"Password",type:"password",required:""},on:{input:function(t){return e.$v.pass.$touch()},blur:function(t){return e.$v.pass.$touch()}},model:{value:e.pass,callback:function(t){e.pass=t},expression:"pass"}}),e._v(" "),t(v.a,{attrs:{"error-messages":e.conpassErrors,counter:20,label:"Confirm Password",type:"password",required:""},on:{input:function(t){return e.$v.pass.$touch()},blur:function(t){return e.$v.pass.$touch()}},model:{value:e.conpass,callback:function(t){e.conpass=t},expression:"conpass"}}),e._v(" "),t(v.a,{attrs:{"error-messages":e.emailErrors,label:"E-mail",required:""},on:{input:function(t){return e.$v.email.$touch()},blur:function(t){return e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),t(m.a,{attrs:{items:e.items,"error-messages":e.selectErrors,label:"sex",required:""},on:{change:function(t){return e.$v.select.$touch()},blur:function(t){return e.$v.select.$touch()}},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}}),e._v(" "),t(m.a,{attrs:{items:e.status_items,"error-messages":e.statusErrors,label:"ตำแหน่ง",required:""},on:{change:function(t){return e.$v.status.$touch()},blur:function(t){return e.$v.status.$touch()}},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}}),e._v(" "),t(c.a,{attrs:{"error-messages":e.checkboxErrors,label:"Confirm ",required:""},on:{change:function(t){return e.$v.checkbox.$touch()},blur:function(t){return e.$v.checkbox.$touch()}},model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}}),e._v(" "),t(o.a,{staticClass:"me-4",attrs:{color:"green darken-3"},on:{click:e.submit}},[t(h.a,{staticClass:"me-3"},[e._v("mdi-content-save-settings-outline")]),e._v("\n                        submit\n                    ")],1),e._v(" "),t(o.a,{attrs:{color:"deep-orange darken-4"},on:{click:e.clear}},[t(h.a,{staticClass:"me-3"},[e._v("mdi-backspace-reverse")]),e._v(" clear\n                    ")],1)],1)])],1)],1),e._v(" "),t("div",{staticClass:"text-center d-flex justify-center align-center"},[t(h.a,{staticClass:"white--text"},[e._v("mdi-account-multiple-plus")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);