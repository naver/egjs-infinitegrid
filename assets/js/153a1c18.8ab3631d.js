"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7990],{71745:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(7896),i=(n(67294),n(3905));const o={custom_edit_url:null},a=void 0,s={unversionedId:"api/withInfiniteGridMethods",id:"version-4.1.1/api/withInfiniteGridMethods",title:"withInfiniteGridMethods",description:"withInfiniteGridMethods",source:"@site/versioned_docs/version-4.1.1/api/withInfiniteGridMethods.mdx",sourceDirName:"api",slug:"/api/withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/4.1.1/api/withInfiniteGridMethods",draft:!1,editUrl:null,tags:[],version:"4.1.1",frontMatter:{custom_edit_url:null},sidebar:"version-4.1.1/api",previous:{title:"Component",permalink:"/egjs-infinitegrid/docs/4.1.1/api/Component"},next:{title:"FrameInfiniteGridOptions",permalink:"/egjs-infinitegrid/docs/4.1.1/api/FrameInfiniteGridOptions"}},c={},l=[{value:"withInfiniteGridMethods",id:"withInfiniteGridMethods",level:3}],d={toc:l},p="wrapper";function f(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const withInfiniteGridMethods\n")),(0,i.kt)("h3",{id:"withInfiniteGridMethods"},"withInfiniteGridMethods"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Decorator that makes the method of InfiniteGrid available in the framework."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { withInfiniteGridMethods } from "@egjs/infinitegrid";\n\nclass Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {\n  &#64;withInfiniteGridMethods\n  private grid: NativeGrid;\n}\n')))}f.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),u=i,m=p["".concat(c,".").concat(u)]||p[u]||f[u]||o;return n?r.createElement(m,a(a({ref:t},d),{},{components:n})):r.createElement(m,a({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);