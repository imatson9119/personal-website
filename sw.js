if(!self.define){let e,i={};const t=(t,n)=>(t=new URL(t+".js",n).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const c=e=>t(e,r),l={module:{uri:r},exports:s,require:c};i[r]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(o(...e),s)))}}define(["./workbox-36c6ae8a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"Dfd4rpEi.js",revision:"48b114471692a7f5fc5048ecfc8d7017"},{url:"index.html",revision:"1161649e50e8a1986e5dcf1c59ee0b0c"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
