"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7544],{63217:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294),a=n(6277);const i={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(i.tabItem,o),hidden:n},t)}},42187:(e,t,n)=>{n.d(t,{Z:()=>I});var r=n(7896),a=n(67294),i=n(6277),o=n(81347),s=n(16550),l=n(11026),u=n(63171),p=n(71647);function c(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function m(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??c(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l._X)(i),(0,a.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function y(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,i=m(e),[o,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:i}))),[l,u]=g({queryString:n,groupId:r}),[c,y]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,i]=(0,p.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:r}),f=(()=>{const e=l??c;return d({value:e,tabValues:i})?e:null})();(0,a.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),y(e)}),[u,y,i]),tabValues:i}}var f=n(8864);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:s,selectValue:l,tabValues:u}=e;const p=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),m=e=>{const t=e.currentTarget,n=p.indexOf(t),r=u[n].value;r!==s&&(c(t),l(r))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>p.push(e),onKeyDown:d,onClick:m},o,{className:(0,i.Z)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":s===t})}),n??t)})))}function h(e){let{lazy:t,children:n,selectedValue:r}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function b(e){const t=y(e);return a.createElement("div",{className:(0,i.Z)("tabs-container",v.tabList)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(h,(0,r.Z)({},e,t)))}function I(e){const t=(0,f.Z)();return a.createElement(b,(0,r.Z)({key:String(t)},e))}},22479:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>g,frontMatter:()=>s,metadata:()=>u,toc:()=>c});var r=n(7896),a=(n(67294),n(3905)),i=n(42187),o=n(63217);const s={title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},l=void 0,u={unversionedId:"quick-start",id:"version-4.3.1/quick-start",title:"Quick Start",description:"If you don't want to use Infinite's features, use @egjs/grid.",source:"@site/versioned_docs/version-4.3.1/quick-start.mdx",sourceDirName:".",slug:"/quick-start",permalink:"/egjs-infinitegrid/ko/docs/4.3.1/quick-start",draft:!1,editUrl:null,tags:[],version:"4.3.1",frontMatter:{title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},sidebar:"started",previous:{title:"Installation",permalink:"/egjs-infinitegrid/ko/docs/4.3.1/"},next:{title:"Using the Methods",permalink:"/egjs-infinitegrid/ko/docs/4.3.1/using-the-methods"}},p={},c=[],m={toc:c},d="wrapper";function g(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"If you don't want to use Infinite's features, use ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-grid"},(0,a.kt)("inlineCode",{parentName:"a"},"@egjs/grid")),"."),(0,a.kt)(i.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,a.kt)("p",null,"Add the script/CSS to the page."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')),(0,a.kt)("p",null,"Or, you can rather import them if you're using a bundler like ",(0,a.kt)("a",{parentName:"p",href:"https://webpack.js.org/"},"webpack")," or ",(0,a.kt)("a",{parentName:"p",href:"https://rollupjs.org/guide/en/"},"rollup"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n')),(0,a.kt)("p",null,"Then, add some basic HTML layout of InfiniteGrid to your page."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<div class="wrapper">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>\n')),(0,a.kt)("p",null,"Then initialize InfiniteGrid instance with JavaScript after."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".wrapper", {\n  align: "center",\n  gap: 5,\n});\n\nig.on("requestAppend", e => {\n  const nextGroupKey = (e.groupKey || 0) + 1;\n  const length = items.length;\n\n  ig.append([\n    `<div class="item">${length}</div>`,\n    `<div class="item">${length + 1}</div>`,\n    `<div class="item">${length + 2}</div>`,\n  ], nextGroupKey);\n});\nig.renderItems();\n'))),(0,a.kt)(o.Z,{value:"react",mdxType:"TabItem"},(0,a.kt)("p",null,"You can import & use InfiniteGrid as a React Component."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="SomeComponent.jsx"',title:'"SomeComponent.jsx"'},'import * as React from "react";\nimport { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\nexport default () => {\n  const [items, setItems] = React.useState([]);\n\n  return <MasonryInfiniteGrid\n    align="center"\n    gap={5}\n    onRequestAppend={e => {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = items.length;\n\n      setItems([\n        ...items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ]);\n    }}>\n    {items.map((item) => {\n      return <div className="item" data-grid-groupkey={item.groupKey} key={item.key}>{item.key}</div>\n    })}\n  </MasonryInfiniteGrid>;\n}\n'))),(0,a.kt)(o.Z,{value:"vue",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,a.kt)(o.Z,{value:"vue3",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,a.kt)(o.Z,{value:"angular",mdxType:"TabItem"},(0,a.kt)("p",null,"You can add ",(0,a.kt)("inlineCode",{parentName:"p"},"NgxInfiniteGridModule")," at ",(0,a.kt)("inlineCode",{parentName:"p"},"imports")," of your app module to use InfiniteGrid."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="app.module.ts"',title:'"app.module.ts"'},"import { NgxInfiniteGridModule } from '@egjs/ngx-infinitegrid';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    NgxInfiniteGridModule /* Add in imports */\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { } /* Your app */\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="app.component.html"',title:'"app.component.html"'},'<div NgxMasonryInfiniteGrid\n  [items]="items"\n  [trackBy]="trackBy"\n  [groupBy]="groupBy"\n  [gap]="5"\n  (requestAppend)="onRequestAppend($event)"\n  #ig\n  >\n  <div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">\n    {{item.data.key}}\n  </div>\n</div>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="app.component.ts"',title:'"app.component.ts"'},"import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n})\nexport class AppComponent {\n  items = [];\n  groupBy(_: any, item: any) {\n    return item.groupKey;\n  }\n  trackBy(_: any, item: any) {\n    return item.key;\n  }\n  onRequestAppend(e) {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = this.items.length;\n\n    this.items = [\n      ...this.items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }\n}\n"))),(0,a.kt)(o.Z,{value:"svelte",mdxType:"TabItem"},(0,a.kt)("p",null,"You can import ",(0,a.kt)("inlineCode",{parentName:"p"},"InfiniteGrid"),' from the "@egjs/svelte-infinitegrid" package.'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="App.svelte"',title:'"App.svelte"'},'<script lang="ts">\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n\n  let items = [];\n<\/script>\n<MasonryInfiniteGrid\n  class="container"\n  gap={5}\n  {items}\n  on:requestAppend={({ detail: e }) => {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = items.length;\n\n    items = [\n      ...items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }}\n  let:visibleItems\n>\n   {#each visibleItems as item (item.key)}\n    <div class="item">\n     {item.data.key}\n    </div>\n  {/each}\n</MasonryInfiniteGrid>\n')))))}g.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,g=c["".concat(l,".").concat(d)]||c[d]||m[d]||i;return n?r.createElement(g,o(o({ref:t},p),{},{components:n})):r.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);