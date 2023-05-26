"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1469],{66277:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(7896),a=(r(67294),r(3905));const o={custom_edit_url:null},i=void 0,l={unversionedId:"api/OnContentError",id:"version-4.6.0/api/OnContentError",title:"OnContentError",description:"Type: TSInterface",source:"@site/versioned_docs/version-4.6.0/api/OnContentError.mdx",sourceDirName:"api",slug:"/api/OnContentError",permalink:"/egjs-infinitegrid/docs/4.6.0/api/OnContentError",draft:!1,editUrl:null,tags:[],version:"4.6.0",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"OnRenderComplete",permalink:"/egjs-infinitegrid/docs/4.6.0/api/OnRenderComplete"},next:{title:"OnChangeScroll",permalink:"/egjs-infinitegrid/docs/4.6.0/api/OnChangeScroll"}},p={},c=[],m={toc:c},d="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("div",null),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"currentTarget"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("a",{parentName:"td",href:"InfiniteGrid"},"InfiniteGrid")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"An InfiniteGrid instance that triggered this event. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"element"),(0,a.kt)("td",{parentName:"tr",align:"center"},"HTMLElement"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The item's element."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"target"),(0,a.kt)("td",{parentName:"tr",align:"center"},"HTMLElement"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The content element with error."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"item"),(0,a.kt)("td",{parentName:"tr",align:"center"},"InfiniteGridItem"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The item with error content."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"update"),(0,a.kt)("td",{parentName:"tr",align:"center"},"() =",">"," void"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"If you have fixed the error and want to recheck it, call update(). If you remove an element, call the syncElements() method."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"remove"),(0,a.kt)("td",{parentName:"tr",align:"center"},"() =",">"," void"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"If you want to remove the item corresponding to the error, call remove(). "))))))}u.isMDXComponent=!0},3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=c(r),s=a,f=d["".concat(p,".").concat(s)]||d[s]||u[s]||o;return r?n.createElement(f,i(i({ref:t},m),{},{components:r})):n.createElement(f,i({ref:t},m))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"}}]);