if(!self.define){let e,n={};const t=(t,i)=>(t=new URL(t+".js",i).href,n[t]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=n,document.head.appendChild(e)}else e=t,importScripts(t),n()})).then((()=>{let e=n[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let s={};const l=e=>t(e,r),c={module:{uri:r},exports:s,require:l};n[r]=Promise.all(i.map((e=>c[e]||l(e)))).then((e=>(o(...e),s)))}}define(["./workbox-36c6ae8a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"CLCdennG.js",revision:"ad826fa48478f8670a155e969c2e1494"},{url:"index.html",revision:"9272a1c1a92338b84359e2e62baaee4a"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
