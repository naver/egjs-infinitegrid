"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4270],{3722:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7896),i=(r(67294),r(3905));const o={custom_edit_url:null},a=void 0,c={unversionedId:"api/withInfiniteGridMethods",id:"version-4.10.1/api/withInfiniteGridMethods",title:"withInfiniteGridMethods",description:"Decorator that makes the method of InfiniteGrid available in the framework.",source:"@site/versioned_docs/version-4.10.1/api/withInfiniteGridMethods.mdx",sourceDirName:"api",slug:"/api/withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/4.10.1/api/withInfiniteGridMethods",draft:!1,editUrl:null,tags:[],version:"4.10.1",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Grid",permalink:"/egjs-infinitegrid/docs/4.10.1/api/Grid"},next:{title:"FrameInfiniteGridOptions",permalink:"/egjs-infinitegrid/docs/4.10.1/api/FrameInfiniteGridOptions"}},l={},s=[],p={toc:s},d="wrapper";function f(e){let{components:t,...r}=e;return(0,i.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const withInfiniteGridMethods\n")),(0,i.kt)("div",null),(0,i.kt)("p",null,"Decorator that makes the method of InfiniteGrid available in the framework."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { withInfiniteGridMethods } from "@egjs/infinitegrid";\n\nclass Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {\n  &#64;withInfiniteGridMethods\n  private grid: NativeGrid;\n}\n')))}f.isMDXComponent=!0},3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(r),u=i,m=d["".concat(l,".").concat(u)]||d[u]||f[u]||o;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);