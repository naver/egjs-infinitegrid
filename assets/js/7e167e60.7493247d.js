"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1813],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=c(r),m=a,f=s["".concat(l,".").concat(m)]||s[m]||d[m]||i;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=s;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},4556:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return p},metadata:function(){return c},toc:function(){return d}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],p={custom_edit_url:null},l=void 0,c={unversionedId:"api/OnRequestPrepend",id:"version-4.6.0/api/OnRequestPrepend",title:"OnRequestPrepend",description:"Type: TSInterface",source:"@site/versioned_docs/version-4.6.0/api/OnRequestPrepend.mdx",sourceDirName:"api",slug:"/api/OnRequestPrepend",permalink:"/egjs-infinitegrid/docs/api/OnRequestPrepend",draft:!1,editUrl:null,tags:[],version:"4.6.0",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"OnRequestAppend",permalink:"/egjs-infinitegrid/docs/api/OnRequestAppend"},next:{title:"OnRenderComplete",permalink:"/egjs-infinitegrid/docs/api/OnRenderComplete"}},u={},d=[],s={toc:d};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("div",null),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"currentTarget"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"InfiniteGrid"},"InfiniteGrid")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"An InfiniteGrid instance that triggered this event. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"groupKey"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string ","|"," number ","|"," undefined"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"First group key. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"nextGroupKey"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string ","|"," number ","|"," undefined"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The key of the next group that should replace Virtual Item(placeholder)s. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"nextGroupKeys"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Array","<","string ","|"," number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Array of the following group keys that need to be replaced with Virtual Item(placeholder)s. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isVirtual"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to request virtual groups corresponding to Virtual Item(placeholder)s. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"wait"),(0,i.kt)("td",{parentName:"tr",align:"center"},"() =",">"," void"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Set to standby to request data. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"ready"),(0,i.kt)("td",{parentName:"tr",align:"center"},"() =",">"," void"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"When the data request is complete, it is set to ready state. "))))))}m.isMDXComponent=!0}}]);