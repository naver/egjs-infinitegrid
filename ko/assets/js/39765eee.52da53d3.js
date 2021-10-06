"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6698],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return p}});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=i.createContext({}),d=function(e){var n=i.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=d(e.components);return i.createElement(u.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=d(t),p=r,f=c["".concat(u,".").concat(p)]||c[p]||m[p]||a;return t?i.createElement(f,l(l({ref:n},s),{},{components:t})):i.createElement(f,l({ref:n},s))}));function p(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,l=new Array(a);l[0]=c;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var d=2;d<a;d++)l[d]=t[d];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}c.displayName="MDXCreateElement"},6742:function(e,n,t){t.d(n,{Z:function(){return p}});var i=t(3366),r=t(7294),a=t(3727),l=t(2263),o=t(3919),u=t(412),d=(0,r.createContext)({collectLink:function(){}}),s=t(4996),m=t(8780),c=["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"];var p=function(e){var n,t,p=e.isNavLink,f=e.to,v=e.href,g=e.activeClassName,k=e.isActive,h=e["data-noBrokenLinkCheck"],N=e.autoAddBaseUrl,b=void 0===N||N,y=(0,i.Z)(e,c),C=(0,l.Z)().siteConfig,I=C.trailingSlash,T=C.baseUrl,w=(0,s.C)().withBaseUrl,O=(0,r.useContext)(d),M=f||v,S=(0,o.Z)(M),x=null==M?void 0:M.replace("pathname://",""),E=void 0!==x?(t=x,b&&function(e){return e.startsWith("/")}(t)?w(t):t):void 0;E&&S&&(E=(0,m.applyTrailingSlash)(E,{trailingSlash:I,baseUrl:T}));var j,P=(0,r.useRef)(!1),G=p?a.OL:a.rU,_=u.Z.canUseIntersectionObserver;(0,r.useEffect)((function(){return!_&&S&&null!=E&&window.docusaurus.prefetch(E),function(){_&&j&&j.disconnect()}}),[E,_,S]);var Z=null!==(n=null==E?void 0:E.startsWith("#"))&&void 0!==n&&n,L=!E||!S||Z;return E&&S&&!Z&&!h&&O.collectLink(E),L?r.createElement("a",Object.assign({href:E},M&&!S&&{target:"_blank",rel:"noopener noreferrer"},y)):r.createElement(G,Object.assign({},y,{onMouseEnter:function(){P.current||null==E||(window.docusaurus.preload(E),P.current=!0)},innerRef:function(e){var n,t;_&&e&&S&&(n=e,t=function(){null!=E&&window.docusaurus.prefetch(E)},(j=new window.IntersectionObserver((function(e){e.forEach((function(e){n===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(j.unobserve(n),j.disconnect(),t())}))}))).observe(n))},to:E||""},p&&{isActive:k,activeClassName:g}))}},3919:function(e,n,t){function i(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!i(e)}t.d(n,{b:function(){return i},Z:function(){return r}})},4996:function(e,n,t){t.d(n,{C:function(){return a},Z:function(){return l}});var i=t(2263),r=t(3919);function a(){var e=(0,i.Z)().siteConfig,n=(e=void 0===e?{}:e).baseUrl,t=void 0===n?"/":n,a=e.url;return{withBaseUrl:function(e,n){return function(e,n,t,i){var a=void 0===i?{}:i,l=a.forcePrependBaseUrl,o=void 0!==l&&l,u=a.absolute,d=void 0!==u&&u;if(!t)return t;if(t.startsWith("#"))return t;if((0,r.b)(t))return t;if(o)return n+t;var s=t.startsWith(n)?t:n+t.replace(/^\//,"");return d?e+s:s}(a,t,e,n)}}}function l(e,n){return void 0===n&&(n={}),(0,a().withBaseUrl)(e,n)}},8215:function(e,n,t){var i=t(7294);n.Z=function(e){var n=e.children,t=e.hidden,r=e.className;return i.createElement("div",{role:"tabpanel",hidden:t,className:r},n)}},5064:function(e,n,t){t.d(n,{Z:function(){return d}});var i=t(7294),r=t(9443);var a=function(){var e=(0,i.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},l=t(6010),o="tabItem_1uMI",u="tabItemActive_2DSg";var d=function(e){var n,t=e.lazy,r=e.block,d=e.defaultValue,s=e.values,m=e.groupId,c=e.className,p=i.Children.toArray(e.children),f=null!=s?s:p.map((function(e){return{value:e.props.value,label:e.props.label}})),v=null!=d?d:null==(n=p.find((function(e){return e.props.default})))?void 0:n.props.value,g=a(),k=g.tabGroupChoices,h=g.setTabGroupChoices,N=(0,i.useState)(v),b=N[0],y=N[1],C=[];if(null!=m){var I=k[m];null!=I&&I!==b&&f.some((function(e){return e.value===I}))&&y(I)}var T=function(e){var n=e.currentTarget,t=C.indexOf(n),i=f[t].value;y(i),null!=m&&(h(m,i),setTimeout((function(){var e,t,i,r,a,l,o,d;(e=n.getBoundingClientRect(),t=e.top,i=e.left,r=e.bottom,a=e.right,l=window,o=l.innerHeight,d=l.innerWidth,t>=0&&a<=d&&r<=o&&i>=0)||(n.scrollIntoView({block:"center",behavior:"smooth"}),n.classList.add(u),setTimeout((function(){return n.classList.remove(u)}),2e3))}),150))},w=function(e){var n,t=null;switch(e.key){case"ArrowRight":var i=C.indexOf(e.target)+1;t=C[i]||C[0];break;case"ArrowLeft":var r=C.indexOf(e.target)-1;t=C[r]||C[C.length-1]}null==(n=t)||n.focus()};return i.createElement("div",{className:"tabs-container"},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":r},c)},f.map((function(e){var n=e.value,t=e.label;return i.createElement("li",{role:"tab",tabIndex:b===n?0:-1,"aria-selected":b===n,className:(0,l.Z)("tabs__item",o,{"tabs__item--active":b===n}),key:n,ref:function(e){return C.push(e)},onKeyDown:w,onFocus:T,onClick:T},null!=t?t:n)}))),t?(0,i.cloneElement)(p.filter((function(e){return e.props.value===b}))[0],{className:"margin-vert--md"}):i.createElement("div",{className:"margin-vert--md"},p.map((function(e,n){return(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==b})}))))}},9443:function(e,n,t){var i=(0,t(7294).createContext)(void 0);n.Z=i},8802:function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,n){var t=n.trailingSlash,i=n.baseUrl;if(e.startsWith("#"))return e;if(void 0===t)return e;var r,a=e.split(/[#?]/)[0],l="/"===a||a===i?a:(r=a,t?function(e){return e.endsWith("/")?e:e+"/"}(r):function(e){return e.endsWith("/")?e.slice(0,-1):e}(r));return e.replace(a,l)}},8780:function(e,n,t){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.uniq=n.applyTrailingSlash=void 0;var r=t(8802);Object.defineProperty(n,"applyTrailingSlash",{enumerable:!0,get:function(){return i(r).default}});var a=t(9964);Object.defineProperty(n,"uniq",{enumerable:!0,get:function(){return i(a).default}})},9964:function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return Array.from(new Set(e))}},3132:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return m},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return f},default:function(){return g}});var i=t(7462),r=t(3366),a=(t(7294),t(3905)),l=t(5064),o=t(8215),u=t(6742),d=t(4996),s=["components"],m={title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},c=void 0,p={unversionedId:"migration-from-v3",id:"migration-from-v3",isDocsHomePage:!1,title:"Migration Guide from v3 to v4",description:"Changed Usage",source:"@site/docs/migration-from-v3.mdx",sourceDirName:".",slug:"/migration-from-v3",permalink:"/egjs-infinitegrid/ko/docs/next/migration-from-v3",editUrl:null,tags:[],version:"current",frontMatter:{title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},sidebar:"started",previous:{title:"Listening to Events",permalink:"/egjs-infinitegrid/ko/docs/next/listening-to-events"}},f=[{value:"Changed Usage",id:"changed-usage",children:[]},{value:"HTML structure",id:"html-structure",children:[]},{value:"Changes when using umd modules",id:"changes-when-using-umd-modules",children:[]},{value:"Changed module names",id:"changed-module-names",children:[]},{value:"Changed Options",id:"changed-options",children:[]},{value:"Changed Events",id:"changed-events",children:[]},{value:"Changed Methods",id:"changed-methods",children:[]},{value:"Removed Options",id:"removed-options",children:[]},{value:"Removed Methods",id:"removed-methods",children:[]}],v={toc:f};function g(e){var n=e.components,t=(0,r.Z)(e,s);return(0,a.kt)("wrapper",(0,i.Z)({},v,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"changed-usage"},"Changed Usage"),(0,a.kt)("p",null,"Double options are combined into one option."),(0,a.kt)(l.Z,{groupId:"modules",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".container", {\n  attributePrefix: "data-grid-",\n  column: 5,\n});\n\nig.renderItems();\n'))),(0,a.kt)(o.Z,{value:"react",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\n<MasonryInfiniteGrid\n  attributePrefix={"data-grid-"}\n  column={5}\n  >\n  ...\n</MasonryInfiniteGrid>\n'))),(0,a.kt)(o.Z,{value:"vue",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,a.kt)(o.Z,{value:"vue3",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,a.kt)(o.Z,{value:"angular",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<div NgxMasonryInfiniteGrid\n  [gap]="5"\n  attributePrefix="data-grid-"\n  >\n  ...\n</div>\n'))),(0,a.kt)(o.Z,{value:"svelte",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n<MasonryInfiniteGrid\n  gap={5}\n  attributePrefix={"data-grid-"}\n>\n  ...\n</MasonryInfiniteGrid>\n')))),(0,a.kt)("h2",{id:"html-structure"},"HTML structure"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The option called ",(0,a.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"container"),"."),(0,a.kt)("li",{parentName:"ul"},"If you set the ",(0,a.kt)("inlineCode",{parentName:"li"},"container")," option to true, a container is created inside the wrapper.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"The class name of container has been changed from ",(0,a.kt)("inlineCode",{parentName:"li"},"_eg-infinitegrid-container_")," to ",(0,a.kt)("inlineCode",{parentName:"li"},"infinitegrid-container"))))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html",metastring:"{3}","{3}":!0},'<body>\n  <div class="wrapper">\n    <div class="infinitegrid-container">\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </div>\n  </div>\n</body>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const ig = new InfiniteGrid(".container", {\n  container: true,\n});\n')),(0,a.kt)("h2",{id:"changes-when-using-umd-modules"},"Changes when using umd modules"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"We've removed ",(0,a.kt)("inlineCode",{parentName:"li"},"eg")," namespace on umd modules.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"eg.InfiniteGrid")," is now just ",(0,a.kt)("inlineCode",{parentName:"li"},"InfiniteGrid"))))),(0,a.kt)("h2",{id:"changed-module-names"},"Changed module names"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"From"),(0,a.kt)("th",{parentName:"tr",align:null},"To"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"GridLayout"),(0,a.kt)("td",{parentName:"tr",align:null},"MasonryInfiniteGrid")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"JustifiedLayout"),(0,a.kt)("td",{parentName:"tr",align:null},"JustifiedInfiniteGrid")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"FrameLayout"),(0,a.kt)("td",{parentName:"tr",align:null},"FrameInfiniteGrid")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"SquareLayout"),(0,a.kt)("td",{parentName:"tr",align:null},"Integration into MasonryInfiniteGrid")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"PackingLayout"),(0,a.kt)("td",{parentName:"tr",align:null},"PackingInfiniteGrid")))),(0,a.kt)("h2",{id:"changed-options"},"Changed Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Default value of ",(0,a.kt)("strong",{parentName:"li"},"attributePrefix")," is now ",(0,a.kt)("inlineCode",{parentName:"li"},"data-grid-")," (was ",(0,a.kt)("inlineCode",{parentName:"li"},"data-"),")"),(0,a.kt)("li",{parentName:"ul"},"The option called ",(0,a.kt)("inlineCode",{parentName:"li"},"margin")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"gap"),"."),(0,a.kt)("li",{parentName:"ul"},"The option called ",(0,a.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"container"),".")),(0,a.kt)("h2",{id:"changed-events"},"Changed Events"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The event called ",(0,a.kt)("inlineCode",{parentName:"li"},"append")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"requestAppend"),"."),(0,a.kt)("li",{parentName:"ul"},"The event called ",(0,a.kt)("inlineCode",{parentName:"li"},"prepend")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"requestPrepend"),"."),(0,a.kt)("li",{parentName:"ul"},"The event called ",(0,a.kt)("inlineCode",{parentName:"li"},"layoutComplete")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"renderComplete"),"."),(0,a.kt)("li",{parentName:"ul"},"The event called ",(0,a.kt)("inlineCode",{parentName:"li"},"change")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"changeScroll"),"."),(0,a.kt)("li",{parentName:"ul"},"The event called ",(0,a.kt)("inlineCode",{parentName:"li"},"imageError")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"contentError"),".")),(0,a.kt)("h2",{id:"changed-methods"},"Changed Methods"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The method called ",(0,a.kt)("inlineCode",{parentName:"li"},"layout")," is renamed ",(0,a.kt)("inlineCode",{parentName:"li"},"renderItems"),"."),(0,a.kt)("li",{parentName:"ul"},"The method ",(0,a.kt)("inlineCode",{parentName:"li"},"getItems(true)")," can be used as ",(0,a.kt)("inlineCode",{parentName:"li"},"getItems()"),"."),(0,a.kt)("li",{parentName:"ul"},"The method ",(0,a.kt)("inlineCode",{parentName:"li"},"getItems(false)")," can be used as ",(0,a.kt)("inlineCode",{parentName:"li"},"getVisibleItems()"),"."),(0,a.kt)("li",{parentName:"ul"},"The usage of the ",(0,a.kt)("inlineCode",{parentName:"li"},"getStatus")," method has changed.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.NOT_REMOVE)"),"(default) gets all infos"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS)")," gets visible infos"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_ITEMS)")," gets visible infos. However, the information is simplified for invisible items."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_GROUPS)")," gets visible infos. However, invisible items are removed and only the outline remains.")))),(0,a.kt)("h2",{id:"removed-options"},"Removed Options"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The option called ",(0,a.kt)("inlineCode",{parentName:"li"},"transitionDuration")," is removed.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Use CSS. See ",(0,a.kt)(u.Z,{to:(0,d.Z)("Guides#use-transition"),mdxType:"Link"},"Guides"))))),(0,a.kt)("h2",{id:"removed-methods"},"Removed Methods"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The method called ",(0,a.kt)("inlineCode",{parentName:"li"},"startLoading")," is removed.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Use a method called ",(0,a.kt)("inlineCode",{parentName:"li"},"wait")," instead."))),(0,a.kt)("li",{parentName:"ul"},"The method called ",(0,a.kt)("inlineCode",{parentName:"li"},"endLoading")," is removed.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Automatically check whether loading is ended."))),(0,a.kt)("li",{parentName:"ul"},"The method called ",(0,a.kt)("inlineCode",{parentName:"li"},"isLoading")," is removed.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Use a method called ",(0,a.kt)("inlineCode",{parentName:"li"},"isWait")," instead."))),(0,a.kt)("li",{parentName:"ul"},"The method called ",(0,a.kt)("inlineCode",{parentName:"li"},"isProcessing")," is removed.")))}g.isMDXComponent=!0},6010:function(e,n,t){function i(e){var n,t,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=i(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function r(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=i(e))&&(r&&(r+=" "),r+=n);return r}t.d(n,{Z:function(){return r}})}}]);