"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8515],{40276:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=n(7896),i=(n(67294),n(3905));const o={custom_edit_url:null},a=void 0,c={unversionedId:"api/withInfiniteGridMethods",id:"version-4.11.1/api/withInfiniteGridMethods",title:"withInfiniteGridMethods",description:"\ud504\ub808\uc784\uc6cc\ud06c\uc5d0\uc11c InfiniteGrid\uc758 \uba54\uc18c\ub4dc\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uac8c \ud558\ub294 \ub370\ucf54\ub808\uc774\ud130.",source:"@site/i18n/ko/docusaurus-plugin-content-docs/version-4.11.1/api/withInfiniteGridMethods.mdx",sourceDirName:"api",slug:"/api/withInfiniteGridMethods",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/api/withInfiniteGridMethods",draft:!1,editUrl:null,tags:[],version:"4.11.1",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Component",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/api/Component"},next:{title:"FrameInfiniteGridOptions",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/api/FrameInfiniteGridOptions"}},p={},s=[],l={toc:s},d="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const withInfiniteGridMethods\n")),(0,i.kt)("div",null),(0,i.kt)("p",null,"\ud504\ub808\uc784\uc6cc\ud06c\uc5d0\uc11c InfiniteGrid\uc758 \uba54\uc18c\ub4dc\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uac8c \ud558\ub294 \ub370\ucf54\ub808\uc774\ud130."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { withInfiniteGridMethods } from "@egjs/infinitegrid";\n\nclass Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {\n  &#64;withInfiniteGridMethods\n  private grid: NativeGrid;\n}\n')))}u.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(n),f=i,m=d["".concat(p,".").concat(f)]||d[f]||u[f]||o;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[d]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);