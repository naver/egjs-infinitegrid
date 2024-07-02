"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2401],{58032:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(96540),a=t(9546);const l={tabItem:"tabItem_Ymn6"};function i(e){let{children:n,hidden:t,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(l.tabItem,i),hidden:t},n)}},13488:(e,n,t)=>{t.d(n,{A:()=>A});var r=t(89575),a=t(96540),l=t(9546),i=t(61009),o=t(56347),s=t(77754),u=t(63651),c=t(21873);function p(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}function d(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??p(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function g(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,o.W6)(),l=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,s.aZ)(l),(0,a.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(r.location.search);n.set(l,e),r.replace({...r.location,search:n.toString()})}),[l,r])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,l=d(e),[i,o]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:l}))),[s,u]=m({queryString:t,groupId:r}),[p,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,l]=(0,c.Dv)(t);return[r,(0,a.useCallback)((e=>{t&&l.set(e)}),[t,l])]}({groupId:r}),v=(()=>{const e=s??p;return g({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{v&&o(v)}),[v]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!g({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),f(e)}),[u,f,l]),tabValues:l}}var v=t(6642);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:n,block:t,selectedValue:o,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,i.a_)(),d=e=>{const n=e.currentTarget,t=c.indexOf(n),r=u[t].value;r!==o&&(p(n),s(r))},g=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}n?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n)},u.map((e=>{let{value:n,label:t,attributes:i}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,key:n,ref:e=>c.push(e),onKeyDown:g,onClick:d},i,{className:(0,l.A)("tabs__item",y.tabItem,i?.className,{"tabs__item--active":o===n})}),t??n)})))}function h(e){let{lazy:n,children:t,selectedValue:r}=e;const l=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==r}))))}function I(e){const n=f(e);return a.createElement("div",{className:(0,l.A)("tabs-container",y.tabList)},a.createElement(b,(0,r.A)({},e,n)),a.createElement(h,(0,r.A)({},e,n)))}function A(e){const n=(0,v.A)();return a.createElement(I,(0,r.A)({key:String(n)},e))}},59071:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>v,frontMatter:()=>u,metadata:()=>p,toc:()=>g});var r=t(89575),a=(t(96540),t(15680)),l=t(80406),i=t(36096),o=t(13488),s=t(58032);const u={title:"Listening to Events",id:"listening-to-events",slug:"/listening-to-events",custom_edit_url:null},c=void 0,p={unversionedId:"listening-to-events",id:"version-4.12.0/listening-to-events",title:"Listening to Events",description:"<Tabs",source:"@site/versioned_docs/version-4.12.0/listening-to-events.mdx",sourceDirName:".",slug:"/listening-to-events",permalink:"/egjs-infinitegrid/docs/listening-to-events",draft:!1,editUrl:null,tags:[],version:"4.12.0",frontMatter:{title:"Listening to Events",id:"listening-to-events",slug:"/listening-to-events",custom_edit_url:null},sidebar:"started",previous:{title:"Using the Methods",permalink:"/egjs-infinitegrid/docs/using-the-methods"},next:{title:"Migration Guide from v3 to v4",permalink:"/egjs-infinitegrid/docs/migration-from-v3"}},d={},g=[],m={toc:g},f="wrapper";function v(e){let{components:n,...t}=e;return(0,a.yg)(f,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)(o.A,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,a.yg)(s.A,{value:"js",mdxType:"TabItem"},(0,a.yg)("p",null,"You can listen to InfiniteGrid's events with ",(0,a.yg)("a",{parentName:"p",href:"api/InfiniteGrid#on"},"InfiniteGrid#on")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'// If you\'re using a package manager\n\nig.on("requestAppend", evt => {\n  console.log(evt);\n});\n'))),(0,a.yg)(s.A,{value:"react",mdxType:"TabItem"},(0,a.yg)("p",null,"All events are prefixed with ",(0,a.yg)("inlineCode",{parentName:"p"},"on-"),", and ",(0,a.yg)("inlineCode",{parentName:"p"},"camelCase"),"d."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\nimport { OnRequestAppend } from "@egjs/infinitegrid";\n\n<MasonryInfiniteGrid\n  onRequestAppend={(e: OnRequestAppend) => {\n    console.log(e);\n  }}\n>\n  {...}\n</MasonryInfiniteGrid>\n'))),(0,a.yg)(s.A,{value:"vue",mdxType:"TabItem"},(0,a.yg)("p",null,"All event names are renamed to ",(0,a.yg)("inlineCode",{parentName:"p"},"kebab-case"),", following the ",(0,a.yg)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-custom-events.html#Event-Names"},"Vue event naming convention"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'<MasonryInfiniteGrid\n  @request-append="onRequestAppend"\n>\n</MasonryInfiniteGrid>\n'))),(0,a.yg)(s.A,{value:"vue3",mdxType:"TabItem"},(0,a.yg)("p",null,"All event names are renamed to ",(0,a.yg)("inlineCode",{parentName:"p"},"kebab-case"),", following the ",(0,a.yg)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-custom-events.html#Event-Names"},"Vue 2 event naming convention"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'<MasonryInfiniteGrid\n  @request-append="onRequestAppend"\n>\n</MasonryInfiniteGrid>\n'))),(0,a.yg)(s.A,{value:"angular",mdxType:"TabItem"},(0,a.yg)("p",null,"You can listen events of the ",(0,a.yg)("inlineCode",{parentName:"p"},"ngx-infinitegrid")," using Angular's ",(0,a.yg)("a",{parentName:"p",href:"https://angular.io/guide/event-binding"},"event binding"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'<ngx-masonry-infinite-grid\n  (requestAppend)="onRequestAppend($event)">\n  {{ ... }}\n</ngx-masonry-infinite-grid>\n'))),(0,a.yg)(s.A,{value:"svelte",mdxType:"TabItem"},(0,a.yg)("p",null,"You can use ",(0,a.yg)("inlineCode",{parentName:"p"},"on:eventName")," syntax to listen InfiniteGrid events.",(0,a.yg)("br",{parentName:"p"}),"\n","All event properties are available in the event's ",(0,a.yg)("inlineCode",{parentName:"p"},"detail")," property."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-jsx"},'<script lang="ts">\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n\n<MasonryInfiniteGrid\n  on:requestAppend={({ detail: e }) => {\n  console.log(e);\n  }}>\n</MasonryInfiniteGrid>\n')))),(0,a.yg)("p",null,"See all available events at ",(0,a.yg)(l.A,{to:(0,i.A)("docs/api/InfiniteGrid#events"),mdxType:"Link"},"InfiniteGrid#events"),"."))}v.isMDXComponent=!0},15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>m});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(t),g=a,m=p["".concat(s,".").concat(g)]||p[g]||d[g]||l;return t?r.createElement(m,i(i({ref:n},c),{},{components:t})):r.createElement(m,i({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=g;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[p]="string"==typeof e?e:a,i[1]=o;for(var u=2;u<l;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"}}]);