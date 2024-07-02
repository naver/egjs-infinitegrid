"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9783],{58032:(e,n,t)=>{t.d(n,{A:()=>o});var r=t(96540),a=t(9546);const i={tabItem:"tabItem_Ymn6"};function o(e){let{children:n,hidden:t,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(i.tabItem,o),hidden:t},n)}},13488:(e,n,t)=>{t.d(n,{A:()=>x});var r=t(89575),a=t(96540),i=t(9546),o=t(61009),s=t(56347),l=t(77754),u=t(63651),p=t(21873);function c(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}function m(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??c(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function g(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function d(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(i),(0,a.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(r.location.search);n.set(i,e),r.replace({...r.location,search:n.toString()})}),[i,r])]}function y(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,i=m(e),[o,s]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:i}))),[l,u]=d({queryString:t,groupId:r}),[c,y]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,p.Dv)(t);return[r,(0,a.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:r}),f=(()=>{const e=l??c;return g({value:e,tabValues:i})?e:null})();(0,a.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!g({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),y(e)}),[u,y,i]),tabValues:i}}var f=t(6642);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:n,block:t,selectedValue:s,selectValue:l,tabValues:u}=e;const p=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.a_)(),m=e=>{const n=e.currentTarget,t=p.indexOf(n),r=u[t].value;r!==s&&(c(n),l(r))},g=e=>{let n=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=p.indexOf(e.currentTarget)+1;n=p[t]??p[0];break}case"ArrowLeft":{const t=p.indexOf(e.currentTarget)-1;n=p[t]??p[p.length-1];break}}n?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n)},u.map((e=>{let{value:n,label:t,attributes:o}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,key:n,ref:e=>p.push(e),onKeyDown:g,onClick:m},o,{className:(0,i.A)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":s===n})}),t??n)})))}function b(e){let{lazy:n,children:t,selectedValue:r}=e;const i=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},i.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==r}))))}function k(e){const n=y(e);return a.createElement("div",{className:(0,i.A)("tabs-container",v.tabList)},a.createElement(h,(0,r.A)({},e,n)),a.createElement(b,(0,r.A)({},e,n)))}function x(e){const n=(0,f.A)();return a.createElement(k,(0,r.A)({key:String(n)},e))}},47635:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>u,toc:()=>c});var r=t(89575),a=(t(96540),t(15680)),i=t(13488),o=t(58032);const s={title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},l=void 0,u={unversionedId:"quick-start",id:"version-4.7.1/quick-start",title:"Quick Start",description:"If you don't want to use Infinite's features, use @egjs/grid.",source:"@site/versioned_docs/version-4.7.1/quick-start.mdx",sourceDirName:".",slug:"/quick-start",permalink:"/egjs-infinitegrid/docs/4.7.1/quick-start",draft:!1,editUrl:null,tags:[],version:"4.7.1",frontMatter:{title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},sidebar:"started",previous:{title:"Installation",permalink:"/egjs-infinitegrid/docs/4.7.1/"},next:{title:"Using the Methods",permalink:"/egjs-infinitegrid/docs/4.7.1/using-the-methods"}},p={},c=[],m={toc:c},g="wrapper";function d(e){let{components:n,...t}=e;return(0,a.yg)(g,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"If you don't want to use Infinite's features, use ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/naver/egjs-grid"},(0,a.yg)("inlineCode",{parentName:"a"},"@egjs/grid")),"."),(0,a.yg)(i.A,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,a.yg)(o.A,{value:"js",mdxType:"TabItem"},(0,a.yg)("p",null,"Add the script/CSS to the page."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'\x3c!-- https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')),(0,a.yg)("p",null,"Or, you can rather import them if you're using a bundler like ",(0,a.yg)("a",{parentName:"p",href:"https://webpack.js.org/"},"webpack")," or ",(0,a.yg)("a",{parentName:"p",href:"https://rollupjs.org/guide/en/"},"rollup"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n')),(0,a.yg)("p",null,"Then, add some basic HTML layout of InfiniteGrid to your page."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html"},'<div class="wrapper">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>\n')),(0,a.yg)("p",null,"Then initialize InfiniteGrid instance with JavaScript after."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".wrapper", {\n  align: "center",\n  gap: 5,\n});\n\nig.on("requestAppend", e => {\n  const nextGroupKey = (e.groupKey || 0) + 1;\n  const length = items.length;\n\n  ig.append([\n    `<div class="item">${length}</div>`,\n    `<div class="item">${length + 1}</div>`,\n    `<div class="item">${length + 2}</div>`,\n  ], nextGroupKey);\n});\nig.renderItems();\n'))),(0,a.yg)(o.A,{value:"react",mdxType:"TabItem"},(0,a.yg)("p",null,"You can import & use InfiniteGrid as a React Component."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-jsx",metastring:'title="SomeComponent.jsx"',title:'"SomeComponent.jsx"'},'import * as React from "react";\nimport { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\nexport default () => {\n  const [items, setItems] = React.useState([]);\n\n  return <MasonryInfiniteGrid\n    align="center"\n    gap={5}\n    onRequestAppend={e => {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = items.length;\n\n      setItems([\n        ...items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ]);\n    }}>\n    {items.map((item) => {\n      return <div className="item" data-grid-groupkey={item.groupKey} key={item.key}>{item.key}</div>\n    })}\n  </MasonryInfiniteGrid>;\n}\n'))),(0,a.yg)(o.A,{value:"vue",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,a.yg)(o.A,{value:"vue3",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,a.yg)(o.A,{value:"angular",mdxType:"TabItem"},(0,a.yg)("p",null,"You can add ",(0,a.yg)("inlineCode",{parentName:"p"},"NgxInfiniteGridModule")," at ",(0,a.yg)("inlineCode",{parentName:"p"},"imports")," of your app module to use InfiniteGrid."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="app.module.ts"',title:'"app.module.ts"'},"import { NgxInfiniteGridModule } from '@egjs/ngx-infinitegrid';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    NgxInfiniteGridModule /* Add in imports */\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { } /* Your app */\n")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html",metastring:'title="app.component.html"',title:'"app.component.html"'},'<div NgxMasonryInfiniteGrid\n  [items]="items"\n  [trackBy]="trackBy"\n  [groupBy]="groupBy"\n  [gap]="5"\n  (requestAppend)="onRequestAppend($event)"\n  #ig\n  >\n  <div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">\n    {{item.data.key}}\n  </div>\n</div>\n')),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="app.component.ts"',title:'"app.component.ts"'},"import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n})\nexport class AppComponent {\n  items = [];\n  groupBy(_: any, item: any) {\n    return item.groupKey;\n  }\n  trackBy(_: any, item: any) {\n    return item.key;\n  }\n  onRequestAppend(e) {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = this.items.length;\n\n    this.items = [\n      ...this.items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }\n}\n"))),(0,a.yg)(o.A,{value:"svelte",mdxType:"TabItem"},(0,a.yg)("p",null,"You can import ",(0,a.yg)("inlineCode",{parentName:"p"},"InfiniteGrid"),' from the "@egjs/svelte-infinitegrid" package.'),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-jsx",metastring:'title="App.svelte"',title:'"App.svelte"'},'<script lang="ts">\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n\n  let items = [];\n<\/script>\n<MasonryInfiniteGrid\n  class="container"\n  gap={5}\n  {items}\n  on:requestAppend={({ detail: e }) => {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = items.length;\n\n    items = [\n      ...items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }}\n  let:visibleItems\n>\n   {#each visibleItems as item (item.key)}\n    <div class="item">\n     {item.data.key}\n    </div>\n  {/each}\n</MasonryInfiniteGrid>\n')))))}d.isMDXComponent=!0},15680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>d});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(t),g=a,d=c["".concat(l,".").concat(g)]||c[g]||m[g]||i;return t?r.createElement(d,o(o({ref:n},p),{},{components:t})):r.createElement(d,o({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=g;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"}}]);