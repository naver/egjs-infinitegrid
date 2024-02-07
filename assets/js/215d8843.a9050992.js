"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8690],{41110:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=n(7896),i=(n(67294),n(3905));const o={custom_edit_url:null},a=void 0,c={unversionedId:"api/withInfiniteGridMethods",id:"version-4.11.1/api/withInfiniteGridMethods",title:"withInfiniteGridMethods",description:"Decorator that makes the method of InfiniteGrid available in the framework.",source:"@site/versioned_docs/version-4.11.1/api/withInfiniteGridMethods.mdx",sourceDirName:"api",slug:"/api/withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/api/withInfiniteGridMethods",draft:!1,editUrl:null,tags:[],version:"4.11.1",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Component",permalink:"/egjs-infinitegrid/docs/api/Component"},next:{title:"FrameInfiniteGridOptions",permalink:"/egjs-infinitegrid/docs/api/FrameInfiniteGridOptions"}},l={},s=[],p={toc:s},d="wrapper";function f(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const withInfiniteGridMethods\n")),(0,i.kt)("div",null),(0,i.kt)("p",null,"Decorator that makes the method of InfiniteGrid available in the framework."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { withInfiniteGridMethods } from "@egjs/infinitegrid";\n\nclass Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {\n  &#64;withInfiniteGridMethods\n  private grid: NativeGrid;\n}\n')))}f.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(n),u=i,m=d["".concat(l,".").concat(u)]||d[u]||f[u]||o;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);