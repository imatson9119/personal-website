if(!self.define){let e,t={};const i=(i,n)=>(i=new URL(i+".js",n).href,t[i]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=t,document.head.appendChild(e)}else e=i,importScripts(i),t()})).then((()=>{let e=t[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let s={};const c=e=>i(e,r),l={module:{uri:r},exports:s,require:c};t[r]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(o(...e),s)))}}define(["./workbox-36c6ae8a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"D1VWTl8P.js",revision:"dd89cb648177ec6ec7da11218b72394a"},{url:"index.html",revision:"899ce5e16cd862a6f8b87973dc09940e"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
