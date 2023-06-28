/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{527:function(e,t,r){"use strict";r.r(t);var n=r(442),o=r(438),c=r(440),h=r(439),l=r(443);const d=new Map,f={activated:!1,tokenObservers:[]},k={initialized:!1,enabled:!1};function w(e){return d.get(e)||Object.assign({},f)}function v(){return k}const m="https://content-firebaseappcheck.googleapis.com/v1",T="exchangeDebugToken",E={OFFSET_DURATION:3e5,RETRIAL_MIN_WAIT:3e4,RETRIAL_MAX_WAIT:96e4};class _{constructor(e,t,r,n,o){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=n,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=n,n>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch((()=>{}))}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new h.a,await(t=this.getNextRun(e),new Promise((e=>{setTimeout(e,t)}))),this.pending.resolve(),await this.pending.promise,this.pending=new h.a,await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch((()=>{}))}catch(e){this.retryPolicy(e)?this.process(!1).catch((()=>{})):this.stop()}var t}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const e=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),e}}}const A={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},y=new h.b("appCheck","AppCheck",A);function P(e=!1){var t;return e?null===(t=self.grecaptcha)||void 0===t?void 0:t.enterprise:self.grecaptcha}function C(e){if(!w(e).activated)throw y.create("use-before-activation",{appName:e.name})}function R(e){const t=Math.round(e/1e3),r=Math.floor(t/86400),n=Math.floor((t-3600*r*24)/3600),o=Math.floor((t-3600*r*24-3600*n)/60),c=t-3600*r*24-3600*n-60*o;let h="";return r&&(h+=I(r)+"d:"),n&&(h+=I(n)+"h:"),h+=I(o)+"m:"+I(c)+"s",h}function I(e){return 0===e?"00":e>=10?e.toString():"0"+e}async function O({url:e,body:body},t){const r={"Content-Type":"application/json"},n=t.getImmediate({optional:!0});if(n){const e=await n.getHeartbeatsHeader();e&&(r["X-Firebase-Client"]=e)}const o={method:"POST",body:JSON.stringify(body),headers:r};let c,h;try{c=await fetch(e,o)}catch(e){throw y.create("fetch-network-error",{originalErrorMessage:null==e?void 0:e.message})}if(200!==c.status)throw y.create("fetch-status-error",{httpStatus:c.status});try{h=await c.json()}catch(e){throw y.create("fetch-parse-error",{originalErrorMessage:null==e?void 0:e.message})}const l=h.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw y.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${h.ttl}`});const d=1e3*Number(l[1]),f=Date.now();return{token:h.token,expireTimeMillis:f+d,issuedAtTimeMillis:f}}function S(e,t){const{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${m}/projects/${r}/apps/${n}:${T}?key=${o}`,body:{debug_token:t}}}const D="firebase-app-check-database",N=1,x="firebase-app-check-store",j="debug-token";let M=null;function $(){return M||(M=new Promise(((e,t)=>{try{const r=indexedDB.open(D,N);r.onsuccess=t=>{e(t.target.result)},r.onerror=e=>{var r;t(y.create("storage-open",{originalErrorMessage:null===(r=e.target.error)||void 0===r?void 0:r.message}))},r.onupgradeneeded=e=>{const t=e.target.result;if(0===e.oldVersion)t.createObjectStore(x,{keyPath:"compositeKey"})}}catch(e){t(y.create("storage-open",{originalErrorMessage:null==e?void 0:e.message}))}})),M)}async function z(e,t){const r=(await $()).transaction(x,"readwrite"),n=r.objectStore(x).put({compositeKey:e,value:t});return new Promise(((e,t)=>{n.onsuccess=t=>{e()},r.onerror=e=>{var r;t(y.create("storage-set",{originalErrorMessage:null===(r=e.target.error)||void 0===r?void 0:r.message}))}}))}async function K(e){const t=(await $()).transaction(x,"readonly"),r=t.objectStore(x).get(e);return new Promise(((e,n)=>{r.onsuccess=t=>{const r=t.target.result;e(r?r.value:void 0)},t.onerror=e=>{var t;n(y.create("storage-get",{originalErrorMessage:null===(t=e.target.error)||void 0===t?void 0:t.message}))}}))}function B(e){return`${e.options.appId}-${e.name}`}const F=new l.b("@firebase/app-check");async function H(e){if(Object(h.G)()){let t;try{t=await function(e){return K(B(e))}(e)}catch(e){F.warn(`Failed to read token from IndexedDB. Error: ${e}`)}return t}}function L(e,t){return Object(h.G)()?function(e,t){return z(B(e),t)}(e,t).catch((e=>{F.warn(`Failed to write token to IndexedDB. Error: ${e}`)})):Promise.resolve()}async function W(){let e;try{e=await K(j)}catch(e){}if(e)return e;{const e=Object(h.W)();return(t=e,z(j,t)).catch((e=>F.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`))),e}var t}function U(){return v().enabled}async function X(){const e=v();if(e.enabled&&e.token)return e.token.promise;throw Error("\n            Can't get debug token in production mode.\n        ")}const G={error:"UNKNOWN_ERROR"};async function V(e,t=!1){const r=e.app;C(r);const n=w(r);let o,c=n.token;if(c&&!ee(c)&&(n.token=void 0,c=void 0),!c){const e=await n.cachedTokenPromise;e&&(ee(e)?c=e:await L(r,void 0))}if(!t&&c&&ee(c))return{token:c.token};let h,l=!1;if(U()){n.exchangeTokenPromise||(n.exchangeTokenPromise=O(S(r,await X()),e.heartbeatServiceProvider).finally((()=>{n.exchangeTokenPromise=void 0})),l=!0);const t=await n.exchangeTokenPromise;return await L(r,t),n.token=t,{token:t.token}}try{n.exchangeTokenPromise||(n.exchangeTokenPromise=n.provider.getToken().finally((()=>{n.exchangeTokenPromise=void 0})),l=!0),c=await w(r).exchangeTokenPromise}catch(e){"appCheck/throttled"===e.code?F.warn(e.message):F.error(e),o=e}return c?o?h=ee(c)?{token:c.token,internalError:o}:te(o):(h={token:c.token},n.token=c,await L(r,c)):h=te(o),l&&Z(r,h),h}function J(e,t,r,n){const{app:o}=e,c=w(o),h={next:r,error:n,type:t};if(c.tokenObservers=[...c.tokenObservers,h],c.token&&ee(c.token)){const t=c.token;Promise.resolve().then((()=>{r({token:t.token}),Q(e)})).catch((()=>{}))}c.cachedTokenPromise.then((()=>Q(e)))}function Y(e,t){const r=w(e),n=r.tokenObservers.filter((e=>e.next!==t));0===n.length&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),r.tokenObservers=n}function Q(e){const{app:t}=e,r=w(t);let n=r.tokenRefresher;n||(n=function(e){const{app:t}=e;return new _((async()=>{let r;if(r=w(t).token?await V(e,!0):await V(e),r.error)throw r.error;if(r.internalError)throw r.internalError}),(()=>!0),(()=>{const e=w(t);if(e.token){let t=e.token.issuedAtTimeMillis+.5*(e.token.expireTimeMillis-e.token.issuedAtTimeMillis)+3e5;const r=e.token.expireTimeMillis-3e5;return t=Math.min(t,r),Math.max(0,t-Date.now())}return 0}),E.RETRIAL_MIN_WAIT,E.RETRIAL_MAX_WAIT)}(e),r.tokenRefresher=n),!n.isRunning()&&r.isTokenAutoRefreshEnabled&&n.start()}function Z(e,t){const r=w(e).tokenObservers;for(const e of r)try{"EXTERNAL"===e.type&&null!=t.error?e.error(t.error):e.next(t)}catch(e){}}function ee(e){return e.expireTimeMillis-Date.now()>0}function te(e){return{token:(t=G,h.h.encodeString(JSON.stringify(t),!1)),error:e};var t}class re{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=w(this.app);for(const t of e)Y(this.app,t.next);return Promise.resolve()}}const ne="https://www.google.com/recaptcha/api.js",oe="https://www.google.com/recaptcha/enterprise.js";function ie(e,t){const r=new h.a;w(e).reCAPTCHAState={initialized:r};const n=ce(e),o=P(!1);return o?se(e,t,o,n,r):function(e){const script=document.createElement("script");script.src=ne,script.onload=e,document.head.appendChild(script)}((()=>{const o=P(!1);if(!o)throw new Error("no recaptcha");se(e,t,o,n,r)})),r.promise}function ae(e,t){const r=new h.a;w(e).reCAPTCHAState={initialized:r};const n=ce(e),o=P(!0);return o?se(e,t,o,n,r):function(e){const script=document.createElement("script");script.src=oe,script.onload=e,document.head.appendChild(script)}((()=>{const o=P(!0);if(!o)throw new Error("no recaptcha");se(e,t,o,n,r)})),r.promise}function se(e,t,r,n,o){r.ready((()=>{!function(e,t,r,n){const o=r.render(n,{sitekey:t,size:"invisible",callback:()=>{w(e).reCAPTCHAState.succeeded=!0},"error-callback":()=>{w(e).reCAPTCHAState.succeeded=!1}}),c=w(e);c.reCAPTCHAState=Object.assign(Object.assign({},c.reCAPTCHAState),{widgetId:o})}(e,t,r,n),o.resolve(r)}))}function ce(e){const t=`fire_app_check_${e.name}`,r=document.createElement("div");return r.id=t,r.style.display="none",document.body.appendChild(r),t}async function he(e){C(e);const t=w(e).reCAPTCHAState,r=await t.initialized.promise;return new Promise(((t,n)=>{const o=w(e).reCAPTCHAState;r.ready((()=>{t(r.execute(o.widgetId,{action:"fire_app_check"}))}))}))}class pe{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;fe(this._throttleData);const n=await he(this._app).catch((e=>{throw y.create("recaptcha-error")}));if(!(null===(e=w(this._app).reCAPTCHAState)||void 0===e?void 0:e.succeeded))throw y.create("recaptcha-error");let o;try{o=await O(function(e,t){const{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${m}/projects/${r}/apps/${n}:exchangeRecaptchaV3Token?key=${o}`,body:{recaptcha_v3_token:t}}}(this._app,n),this._heartbeatServiceProvider)}catch(e){throw(null===(t=e.code)||void 0===t?void 0:t.includes("fetch-status-error"))?(this._throttleData=de(Number(null===(r=e.customData)||void 0===r?void 0:r.httpStatus),this._throttleData),y.create("throttled",{time:R(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,o}initialize(e){this._app=e,this._heartbeatServiceProvider=Object(c._getProvider)(e,"heartbeat"),ie(e,this._siteKey).catch((()=>{}))}isEqual(e){return e instanceof pe&&this._siteKey===e._siteKey}}class le{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;fe(this._throttleData);const n=await he(this._app).catch((e=>{throw y.create("recaptcha-error")}));if(!(null===(e=w(this._app).reCAPTCHAState)||void 0===e?void 0:e.succeeded))throw y.create("recaptcha-error");let o;try{o=await O(function(e,t){const{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${m}/projects/${r}/apps/${n}:exchangeRecaptchaEnterpriseToken?key=${o}`,body:{recaptcha_enterprise_token:t}}}(this._app,n),this._heartbeatServiceProvider)}catch(e){throw(null===(t=e.code)||void 0===t?void 0:t.includes("fetch-status-error"))?(this._throttleData=de(Number(null===(r=e.customData)||void 0===r?void 0:r.httpStatus),this._throttleData),y.create("throttled",{time:R(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,o}initialize(e){this._app=e,this._heartbeatServiceProvider=Object(c._getProvider)(e,"heartbeat"),ae(e,this._siteKey).catch((()=>{}))}isEqual(e){return e instanceof le&&this._siteKey===e._siteKey}}class ue{constructor(e){this._customProviderOptions=e}async getToken(){const e=await this._customProviderOptions.getToken(),t=Object(h.N)(e.token),r=null!==t&&t<Date.now()&&t>0?1e3*t:Date.now();return Object.assign(Object.assign({},e),{issuedAtTimeMillis:r})}initialize(e){this._app=e}isEqual(e){return e instanceof ue&&this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString()}}function de(e,t){if(404===e||403===e)return{backoffCount:1,allowRequestsAfter:Date.now()+864e5,httpStatus:e};{const r=t?t.backoffCount:0,n=Object(h.l)(r,1e3,2);return{backoffCount:r+1,allowRequestsAfter:Date.now()+n,httpStatus:e}}}function fe(e){if(e&&Date.now()-e.allowRequestsAfter<=0)throw y.create("throttled",{time:R(e.allowRequestsAfter-Date.now()),httpStatus:e.httpStatus})}function ge(e=Object(c.getApp)(),t){e=Object(h.z)(e);const r=Object(c._getProvider)(e,"app-check");if(v().initialized||function(){const e=Object(h.y)(),t=v();if(t.initialized=!0,"string"!=typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN&&!0!==e.FIREBASE_APPCHECK_DEBUG_TOKEN)return;t.enabled=!0;const r=new h.a;t.token=r,"string"==typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(W())}(),U()&&X().then((e=>console.log(`App Check debug token: ${e}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`))),r.isInitialized()){const n=r.getImmediate(),o=r.getOptions();if(o.isTokenAutoRefreshEnabled===t.isTokenAutoRefreshEnabled&&o.provider.isEqual(t.provider))return n;throw y.create("already-initialized",{appName:e.name})}const n=r.initialize({options:t});return function(e,t,r){const n=function(e,t){return d.set(e,t),d.get(e)}(e,Object.assign({},f));n.activated=!0,n.provider=t,n.cachedTokenPromise=H(e).then((t=>(t&&ee(t)&&(n.token=t,Z(e,{token:t.token})),t))),n.isTokenAutoRefreshEnabled=void 0===r?e.automaticDataCollectionEnabled:r,n.provider.initialize(e)}(e,t.provider,t.isTokenAutoRefreshEnabled),w(e).isTokenAutoRefreshEnabled&&J(n,"INTERNAL",(()=>{})),n}const ke="app-check-internal";Object(c._registerComponent)(new o.a("app-check",(e=>function(e,t){return new re(e,t)}(e.getProvider("app").getImmediate(),e.getProvider("heartbeat"))),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,r)=>{e.getProvider(ke).initialize()}))),Object(c._registerComponent)(new o.a(ke,(e=>function(e){return{getToken:t=>V(e,t),addTokenListener:t=>J(e,"INTERNAL",t),removeTokenListener:t=>Y(e.app,t)}}(e.getProvider("app-check").getImmediate())),"PUBLIC").setInstantiationMode("EXPLICIT")),Object(c.registerVersion)("@firebase/app-check","0.7.0");const we={"use-before-activation":"App Check is being used before activate() is called for FirebaseApp {$appName}. Call activate() before instantiating other Firebase services."},ve=new h.b("appCheck","AppCheck",we);class me{constructor(e){this.app=e}activate(e,t){let r;r="string"==typeof e?new pe(e):e instanceof le||e instanceof pe||e instanceof ue?e:new ue({getToken:e.getToken}),this._delegate=ge(this.app,{provider:r,isTokenAutoRefreshEnabled:t})}setTokenAutoRefreshEnabled(e){if(!this._delegate)throw ve.create("use-before-activation",{appName:this.app.name});!function(e,t){const r=w(e.app);r.tokenRefresher&&(!0===t?r.tokenRefresher.start():r.tokenRefresher.stop()),r.isTokenAutoRefreshEnabled=t}(this._delegate,e)}getToken(e){if(!this._delegate)throw ve.create("use-before-activation",{appName:this.app.name});return async function(e,t){const r=await V(e,t);if(r.error)throw r.error;return{token:r.token}}(this._delegate,e)}onTokenChanged(e,t,r){if(!this._delegate)throw ve.create("use-before-activation",{appName:this.app.name});return function(e,t,r,n){let o=()=>{},c=()=>{};return o=null!=t.next?t.next.bind(t):t,null!=t.error?c=t.error.bind(t):r&&(c=r),J(e,"EXTERNAL",o,c),()=>Y(e.app,o)}(this._delegate,e,t)}}const be=e=>{const t=e.getProvider("app-compat").getImmediate();return new me(t)};n.a.INTERNAL.registerComponent(new o.a("appCheck-compat",be,"PUBLIC").setServiceProps({ReCaptchaEnterpriseProvider:le,ReCaptchaV3Provider:pe,CustomProvider:ue})),n.a.registerVersion("@firebase/app-check-compat","0.3.6")}}]);