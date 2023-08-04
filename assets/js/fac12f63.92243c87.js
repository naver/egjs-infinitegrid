"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3566],{22187:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>d});var n=r(7896),a=(r(67294),r(3905));const i={custom_edit_url:null},o=void 0,p={unversionedId:"api/OnRenderComplete",id:"version-4.1.1/api/OnRenderComplete",title:"OnRenderComplete",description:"OnRenderComplete",source:"@site/versioned_docs/version-4.1.1/api/OnRenderComplete.mdx",sourceDirName:"api",slug:"/api/OnRenderComplete",permalink:"/egjs-infinitegrid/docs/4.1.1/api/OnRenderComplete",draft:!1,editUrl:null,tags:[],version:"4.1.1",frontMatter:{custom_edit_url:null},sidebar:"version-4.1.1/api",previous:{title:"OnRequestPrepend",permalink:"/egjs-infinitegrid/docs/4.1.1/api/OnRequestPrepend"},next:{title:"OnContentError",permalink:"/egjs-infinitegrid/docs/4.1.1/api/OnContentError"}},l={},d=[{value:"OnRenderComplete",id:"OnRenderComplete",level:3}],c={toc:d},m="wrapper";function s(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"OnRenderComplete"},"OnRenderComplete"),(0,a.kt)("div",{className:"bulma-tags"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"currentTarget"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("a",{parentName:"td",href:"InfiniteGrid"},"InfiniteGrid")),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"An InfiniteGrid instance that triggered this event. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"mounted"),(0,a.kt)("td",{parentName:"tr",align:"center"},"InfiniteGridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The items rendered for the first time. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"updated"),(0,a.kt)("td",{parentName:"tr",align:"center"},"InfiniteGridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The items updated in size. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"direction"),(0,a.kt)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end"'),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The direction InfiniteGrid was rendered. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"isResize"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether rendering was done using the resize event or the useResize option. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"startCursor"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The key of the first group that has been rendered. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"endCursor"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The key of the last group that has been rendered. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"items"),(0,a.kt)("td",{parentName:"tr",align:"center"},"InfiniteGridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Items that have been rendered. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"groups"),(0,a.kt)("td",{parentName:"tr",align:"center"},"InfiniteGridGroup[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Groups that have been rendered. "))))))}s.isMDXComponent=!0},3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),d=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=d(r),u=a,k=m["".concat(l,".").concat(u)]||m[u]||s[u]||i;return r?n.createElement(k,o(o({ref:t},c),{},{components:r})):n.createElement(k,o({ref:t},c))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:a,o[1]=p;for(var d=2;d<i;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);