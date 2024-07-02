"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5510],{58032:(e,a,n)=>{n.d(a,{A:()=>i});var t=n(96540),r=n(9546);const l={tabItem:"tabItem_Ymn6"};function i(e){let{children:a,hidden:n,className:i}=e;return t.createElement("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,i),hidden:n},a)}},13488:(e,a,n)=>{n.d(a,{A:()=>j});var t=n(89575),r=n(96540),l=n(9546),i=n(61009),s=n(56347),u=n(77754),o=n(63651),c=n(21873);function d(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:a}=e;return!!a&&"object"==typeof a&&"value"in a}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:a,label:n,attributes:t,default:r}}=e;return{value:a,label:n,attributes:t,default:r}}))}function p(e){const{values:a,children:n}=e;return(0,r.useMemo)((()=>{const e=a??d(n);return function(e){const a=(0,o.X)(e,((e,a)=>e.value===a.value));if(a.length>0)throw new Error(`Docusaurus error: Duplicate values "${a.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[a,n])}function g(e){let{value:a,tabValues:n}=e;return n.some((e=>e.value===a))}function m(e){let{queryString:a=!1,groupId:n}=e;const t=(0,s.W6)(),l=function(e){let{queryString:a=!1,groupId:n}=e;if("string"==typeof a)return a;if(!1===a)return null;if(!0===a&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:a,groupId:n});return[(0,u.aZ)(l),(0,r.useCallback)((e=>{if(!l)return;const a=new URLSearchParams(t.location.search);a.set(l,e),t.replace({...t.location,search:a.toString()})}),[l,t])]}function y(e){const{defaultValue:a,queryString:n=!1,groupId:t}=e,l=p(e),[i,s]=(0,r.useState)((()=>function(e){let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!g({value:a,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${a}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return a}const t=n.find((e=>e.default))??n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:a,tabValues:l}))),[u,o]=m({queryString:n,groupId:t}),[d,y]=function(e){let{groupId:a}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(a),[t,l]=(0,c.Dv)(n);return[t,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:t}),f=(()=>{const e=u??d;return g({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!g({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),o(e),y(e)}),[o,y,l]),tabValues:l}}var f=n(6642);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:a,block:n,selectedValue:s,selectValue:u,tabValues:o}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,i.a_)(),p=e=>{const a=e.currentTarget,n=c.indexOf(a),t=o[n].value;t!==s&&(d(a),u(t))},g=e=>{let a=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;a=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;a=c[n]??c[c.length-1];break}}a?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":n},a)},o.map((e=>{let{value:a,label:n,attributes:i}=e;return r.createElement("li",(0,t.A)({role:"tab",tabIndex:s===a?0:-1,"aria-selected":s===a,key:a,ref:e=>c.push(e),onKeyDown:g,onClick:p},i,{className:(0,l.A)("tabs__item",v.tabItem,i?.className,{"tabs__item--active":s===a})}),n??a)})))}function h(e){let{lazy:a,children:n,selectedValue:t}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(a){const e=l.find((e=>e.props.value===t));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,a)=>(0,r.cloneElement)(e,{key:a,hidden:e.props.value!==t}))))}function T(e){const a=y(e);return r.createElement("div",{className:(0,l.A)("tabs-container",v.tabList)},r.createElement(b,(0,t.A)({},e,a)),r.createElement(h,(0,t.A)({},e,a)))}function j(e){const a=(0,f.A)();return r.createElement(T,(0,t.A)({key:String(a)},e))}},87460:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>u,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var t=n(89575),r=(n(96540),n(15680)),l=n(13488),i=n(58032);const s={title:"Installation",id:"installation",slug:"/",custom_edit_url:null},u=void 0,o={unversionedId:"installation",id:"version-4.5.0/installation",title:"Installation",description:"Using the package managers (recommended)",source:"@site/versioned_docs/version-4.5.0/installation.mdx",sourceDirName:".",slug:"/",permalink:"/egjs-infinitegrid/ko/docs/4.5.0/",draft:!1,editUrl:null,tags:[],version:"4.5.0",frontMatter:{title:"Installation",id:"installation",slug:"/",custom_edit_url:null},sidebar:"started",next:{title:"Quick Start",permalink:"/egjs-infinitegrid/ko/docs/4.5.0/quick-start"}},c={},d=[{value:"Using the package managers (recommended)",id:"using-the-package-managers-recommended",level:2},{value:"npm",id:"npm",level:3},{value:"yarn",id:"yarn",level:3},{value:"CDN Links",id:"cdn-links",level:2},{value:"packaged(with dependencies)",id:"packagedwith-dependencies",level:3}],p={toc:d},g="wrapper";function m(e){let{components:a,...n}=e;return(0,r.yg)(g,(0,t.A)({},p,n,{components:a,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"using-the-package-managers-recommended"},"Using the package managers (recommended)"),(0,r.yg)("p",null,"You can easily install InfiniteGrid with package managers like ",(0,r.yg)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm")," or ",(0,r.yg)("a",{parentName:"p",href:"https://classic.yarnpkg.com/en/"},"yarn")),(0,r.yg)("h3",{id:"npm"},"npm"),(0,r.yg)(l.A,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.yg)(i.A,{value:"js",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/infinitegrid\n"))),(0,r.yg)(i.A,{value:"react",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/react-infinitegrid\n"))),(0,r.yg)(i.A,{value:"vue",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue-infinitegrid\n"))),(0,r.yg)(i.A,{value:"vue3",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue3-infinitegrid\n"))),(0,r.yg)(i.A,{value:"angular",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/ngx-infinitegrid\n"))),(0,r.yg)(i.A,{value:"svelte",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/svelte-infinitegrid\n")))),(0,r.yg)("h3",{id:"yarn"},"yarn"),(0,r.yg)(l.A,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.yg)(i.A,{value:"js",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/infinitegrid\n"))),(0,r.yg)(i.A,{value:"react",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/react-infinitegrid\n"))),(0,r.yg)(i.A,{value:"vue",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue-infinitegrid\n"))),(0,r.yg)(i.A,{value:"vue3",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue3-infinitegrid\n"))),(0,r.yg)(i.A,{value:"angular",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/ngx-infinitegrid\n"))),(0,r.yg)(i.A,{value:"svelte",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/svelte-infinitegrid\n")))),(0,r.yg)("h2",{id:"cdn-links"},"CDN Links"),(0,r.yg)("h3",{id:"packagedwith-dependencies"},"packaged(with dependencies)"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html"},'\x3c!-- github --\x3e\n<script src="https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- unpkg --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- cdnjs --\x3e\n<script src="https://cdnjs.cloudflare.com/ajax/libs/egjs-infinitegrid/4.x.x/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')))}m.isMDXComponent=!0},15680:(e,a,n)=>{n.d(a,{xA:()=>c,yg:()=>m});var t=n(96540);function r(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function l(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function i(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?l(Object(n),!0).forEach((function(a){r(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function s(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=t.createContext({}),o=function(e){var a=t.useContext(u),n=a;return e&&(n="function"==typeof e?e(a):i(i({},a),e)),n},c=function(e){var a=o(e.components);return t.createElement(u.Provider,{value:a},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},g=t.forwardRef((function(e,a){var n=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=o(n),g=r,m=d["".concat(u,".").concat(g)]||d[g]||p[g]||l;return n?t.createElement(m,i(i({ref:a},c),{},{components:n})):t.createElement(m,i({ref:a},c))}));function m(e,a){var n=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=g;var s={};for(var u in a)hasOwnProperty.call(a,u)&&(s[u]=a[u]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var o=2;o<l;o++)i[o]=n[o];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}g.displayName="MDXCreateElement"}}]);