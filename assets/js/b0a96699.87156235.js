"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6531],{3217:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(7294),r=t(6277);const i="tabItem_Ymn6";function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i,l),hidden:t},n)}},3873:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(7896),r=t(7294),i=t(6277),l=t(8864),o=t(3171),s=t(9e3),u=t(1347);const p="tabList__CuJ",c="tabItem_LNqP";function d(e){var n;const{lazy:t,block:l,defaultValue:d,values:m,groupId:v,className:f}=e,g=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=m??g.map((e=>{let{props:{value:n,label:t,attributes:a}}=e;return{value:n,label:t,attributes:a}})),y=(0,o.l)(b,((e,n)=>e.value===n.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===d?d:d??(null==(n=g.find((e=>e.props.default)))?void 0:n.props.value)??g[0].props.value;if(null!==h&&!b.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:N}=(0,s.U)(),[T,I]=(0,r.useState)(h),O=[],{blockElementScrollPositionUntilNextRender:j}=(0,u.o5)();if(null!=v){const e=k[v];null!=e&&e!==T&&b.some((n=>n.value===e))&&I(e)}const w=e=>{const n=e.currentTarget,t=O.indexOf(n),a=b[t].value;a!==T&&(j(n),I(a),null!=v&&N(v,String(a)))},x=e=>{var n;let t=null;switch(e.key){case"ArrowRight":{const n=O.indexOf(e.currentTarget)+1;t=O[n]??O[0];break}case"ArrowLeft":{const n=O.indexOf(e.currentTarget)-1;t=O[n]??O[O.length-1];break}}null==(n=t)||n.focus()};return r.createElement("div",{className:(0,i.Z)("tabs-container",p)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":l},f)},b.map((e=>{let{value:n,label:t,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:T===n?0:-1,"aria-selected":T===n,key:n,ref:e=>O.push(e),onKeyDown:x,onFocus:w,onClick:w},l,{className:(0,i.Z)("tabs__item",c,null==l?void 0:l.className,{"tabs__item--active":T===n})}),t??n)}))),t?(0,r.cloneElement)(g.filter((e=>e.props.value===T))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==T})))))}function m(e){const n=(0,l.Z)();return r.createElement(d,(0,a.Z)({key:String(n)},e))}},3618:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>p,default:()=>f,frontMatter:()=>u,metadata:()=>c,toc:()=>m});var a=t(7896),r=(t(7294),t(3905)),i=t(3095),l=t(756),o=t(3873),s=t(3217);const u={title:"Listening to Events",id:"listening-to-events",slug:"/listening-to-events",custom_edit_url:null},p=void 0,c={unversionedId:"listening-to-events",id:"version-4.2.1/listening-to-events",title:"Listening to Events",description:"<Tabs",source:"@site/versioned_docs/version-4.2.1/listening-to-events.mdx",sourceDirName:".",slug:"/listening-to-events",permalink:"/egjs-infinitegrid/docs/4.2.1/listening-to-events",draft:!1,editUrl:null,tags:[],version:"4.2.1",frontMatter:{title:"Listening to Events",id:"listening-to-events",slug:"/listening-to-events",custom_edit_url:null},sidebar:"started",previous:{title:"Using the Methods",permalink:"/egjs-infinitegrid/docs/4.2.1/using-the-methods"},next:{title:"Migration Guide from v3 to v4",permalink:"/egjs-infinitegrid/docs/4.2.1/migration-from-v3"}},d={},m=[],v={toc:m};function f(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},v,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)(o.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"js",mdxType:"TabItem"},(0,r.kt)("p",null,"You can listen to InfiniteGrid's events with ",(0,r.kt)("a",{parentName:"p",href:"api/InfiniteGrid#on"},"InfiniteGrid#on")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// If you\'re using a package manager\n\nig.on("requestAppend", evt => {\n  console.log(evt);\n});\n'))),(0,r.kt)(s.Z,{value:"react",mdxType:"TabItem"},(0,r.kt)("p",null,"All events are prefixed with ",(0,r.kt)("inlineCode",{parentName:"p"},"on-"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"camelCase"),"d."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\nimport { OnRequestAppend } from "@egjs/infinitegrid";\n\n<MasonryInfiniteGrid\n  onRequestAppend={(e: OnRequestAppend) => {\n    console.log(e);\n  }}\n>\n  {...}\n</MasonryInfiniteGrid>\n'))),(0,r.kt)(s.Z,{value:"vue",mdxType:"TabItem"},(0,r.kt)("p",null,"All event names are renamed to ",(0,r.kt)("inlineCode",{parentName:"p"},"kebab-case"),", following the ",(0,r.kt)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-custom-events.html#Event-Names"},"Vue event naming convention"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<MasonryInfiniteGrid\n  @request-append="onRequestAppend"\n>\n</MasonryInfiniteGrid>\n'))),(0,r.kt)(s.Z,{value:"vue3",mdxType:"TabItem"},(0,r.kt)("p",null,"All event names are renamed to ",(0,r.kt)("inlineCode",{parentName:"p"},"kebab-case"),", following the ",(0,r.kt)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-custom-events.html#Event-Names"},"Vue 2 event naming convention"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<MasonryInfiniteGrid\n  @request-append="onRequestAppend"\n>\n</MasonryInfiniteGrid>\n'))),(0,r.kt)(s.Z,{value:"angular",mdxType:"TabItem"},(0,r.kt)("p",null,"You can listen events of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ngx-infinitegrid")," using Angular's ",(0,r.kt)("a",{parentName:"p",href:"https://angular.io/guide/event-binding"},"event binding"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<ngx-masonry-infinite-grid\n  (requestAppend)="onRequestAppend($event)">\n  {{ ... }}\n</ngx-masonry-infinite-grid>\n'))),(0,r.kt)(s.Z,{value:"svelte",mdxType:"TabItem"},(0,r.kt)("p",null,"You can use ",(0,r.kt)("inlineCode",{parentName:"p"},"on:eventName")," syntax to listen InfiniteGrid events.",(0,r.kt)("br",{parentName:"p"}),"\n","All event properties are available in the event's ",(0,r.kt)("inlineCode",{parentName:"p"},"detail")," property."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<script lang="ts">\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n\n<MasonryInfiniteGrid\n  on:requestAppend={({ detail: e }) => {\n  console.log(e);\n  }}>\n</MasonryInfiniteGrid>\n')))),(0,r.kt)("p",null,"See all available events at ",(0,r.kt)(i.Z,{to:(0,l.Z)("docs/api/InfiniteGrid#events"),mdxType:"Link"},"InfiniteGrid#events"),"."))}f.isMDXComponent=!0},3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(t),m=r,v=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return t?a.createElement(v,l(l({ref:n},p),{},{components:t})):a.createElement(v,l({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=d;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);