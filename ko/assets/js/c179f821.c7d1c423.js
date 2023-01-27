"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3699],{3217:(e,n,t)=>{t.d(n,{Z:()=>o});var r=t(7294),i=t(6277);const a="tabItem_Ymn6";function o(e){let{children:n,hidden:t,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,i.Z)(a,o),hidden:t},n)}},3873:(e,n,t)=>{t.d(n,{Z:()=>d});var r=t(7896),i=t(7294),a=t(6277),o=t(8864),s=t(3171),l=t(9e3),p=t(1347);const u="tabList__CuJ",m="tabItem_LNqP";function c(e){var n;const{lazy:t,block:o,defaultValue:c,values:d,groupId:g,className:y}=e,f=i.Children.map(e.children,(e=>{if((0,i.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=d??f.map((e=>{let{props:{value:n,label:t,attributes:r}}=e;return{value:n,label:t,attributes:r}})),k=(0,s.l)(v,((e,n)=>e.value===n.value));if(k.length>0)throw new Error(`Docusaurus error: Duplicate values "${k.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===c?c:c??(null==(n=f.find((e=>e.props.default)))?void 0:n.props.value)??f[0].props.value;if(null!==h&&!v.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:x}=(0,l.U)(),[N,I]=(0,i.useState)(h),j=[],{blockElementScrollPositionUntilNextRender:G}=(0,p.o5)();if(null!=g){const e=b[g];null!=e&&e!==N&&v.some((n=>n.value===e))&&I(e)}const K=e=>{const n=e.currentTarget,t=j.indexOf(n),r=v[t].value;r!==N&&(G(n),I(r),null!=g&&x(g,String(r)))},w=e=>{var n;let t=null;switch(e.key){case"Enter":K(e);break;case"ArrowRight":{const n=j.indexOf(e.currentTarget)+1;t=j[n]??j[0];break}case"ArrowLeft":{const n=j.indexOf(e.currentTarget)-1;t=j[n]??j[j.length-1];break}}null==(n=t)||n.focus()};return i.createElement("div",{className:(0,a.Z)("tabs-container",u)},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":o},y)},v.map((e=>{let{value:n,label:t,attributes:o}=e;return i.createElement("li",(0,r.Z)({role:"tab",tabIndex:N===n?0:-1,"aria-selected":N===n,key:n,ref:e=>j.push(e),onKeyDown:w,onClick:K},o,{className:(0,a.Z)("tabs__item",m,null==o?void 0:o.className,{"tabs__item--active":N===n})}),t??n)}))),t?(0,i.cloneElement)(f.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):i.createElement("div",{className:"margin-top--md"},f.map(((e,n)=>(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==N})))))}function d(e){const n=(0,o.Z)();return i.createElement(c,(0,r.Z)({key:String(n)},e))}},8194:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>p,toc:()=>m});var r=t(7896),i=(t(7294),t(3905)),a=t(3873),o=t(3217);const s={title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},l=void 0,p={unversionedId:"quick-start",id:"quick-start",title:"Quick Start",description:"If you don't want to use Infinite's features, use @egjs/grid.",source:"@site/docs/quick-start.mdx",sourceDirName:".",slug:"/quick-start",permalink:"/egjs-infinitegrid/ko/docs/next/quick-start",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{title:"Quick Start",id:"quick-start",slug:"/quick-start",custom_edit_url:null},sidebar:"started",previous:{title:"Installation",permalink:"/egjs-infinitegrid/ko/docs/next/"},next:{title:"Using the Methods",permalink:"/egjs-infinitegrid/ko/docs/next/using-the-methods"}},u={},m=[],c={toc:m};function d(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"If you don't want to use Infinite's features, use ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/naver/egjs-grid"},(0,i.kt)("inlineCode",{parentName:"a"},"@egjs/grid")),"."),(0,i.kt)(a.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,i.kt)("p",null,"Add the script/CSS to the page."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')),(0,i.kt)("p",null,"Or, you can rather import them if you're using a bundler like ",(0,i.kt)("a",{parentName:"p",href:"https://webpack.js.org/"},"webpack")," or ",(0,i.kt)("a",{parentName:"p",href:"https://rollupjs.org/guide/en/"},"rollup"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n')),(0,i.kt)("p",null,"Then, add some basic HTML layout of InfiniteGrid to your page."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<div class="wrapper">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>\n')),(0,i.kt)("p",null,"Then initialize InfiniteGrid instance with JavaScript after."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".wrapper", {\n  align: "center",\n  gap: 5,\n});\n\nig.on("requestAppend", e => {\n  const nextGroupKey = (e.groupKey || 0) + 1;\n  const length = items.length;\n\n  ig.append([\n    `<div class="item">${length}</div>`,\n    `<div class="item">${length + 1}</div>`,\n    `<div class="item">${length + 2}</div>`,\n  ], nextGroupKey);\n});\nig.renderItems();\n'))),(0,i.kt)(o.Z,{value:"react",mdxType:"TabItem"},(0,i.kt)("p",null,"You can import & use InfiniteGrid as a React Component."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="SomeComponent.jsx"',title:'"SomeComponent.jsx"'},'import * as React from "react";\nimport { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\nexport default () => {\n  const [items, setItems] = React.useState([]);\n\n  return <MasonryInfiniteGrid\n    align="center"\n    gap={5}\n    onRequestAppend={e => {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = items.length;\n\n      setItems([\n        ...items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ]);\n    }}>\n    {items.map((item) => {\n      return <div className="item" data-grid-groupkey={item.groupKey} key={item.key}>{item.key}</div>\n    })}\n  </MasonryInfiniteGrid>;\n}\n'))),(0,i.kt)(o.Z,{value:"vue",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,i.kt)(o.Z,{value:"vue3",mdxType:"TabItem"},"You can import & use InfiniteGrid as a Vue Component.",(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="<template>"',title:'"<template>"'},'<masonry-infinite-grid\n  class="container"\n  v-bind:gap="5"\n  v-on:requestAppend="onRequestAppend"\n>\n  <div\n    class="item"\n    v-for="item in items"\n    :key="item.key"\n    :data-grid-groupkey="item.groupKey"\n  >{{ item.key }}</div>\n</masonry-infinite-grid>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="<script>"',title:'"<script>"'},'import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n\nexport default {\n  components: {\n    MasonryInfiniteGrid,\n  },\n  data() {\n    return {\n      items: [],\n    };\n  },\n  methods: {\n    onRequestAppend(e) {\n      const nextGroupKey = (e.groupKey || 0) + 1;\n      const length = this.items.length;\n\n      this.items = [\n        ...this.items,\n        { groupKey: nextGroupKey, key: length },\n        { groupKey: nextGroupKey, key: length + 1 },\n        { groupKey: nextGroupKey, key: length + 2 },\n      ];\n    },\n  },\n};\n\n'))),(0,i.kt)(o.Z,{value:"angular",mdxType:"TabItem"},(0,i.kt)("p",null,"You can add ",(0,i.kt)("inlineCode",{parentName:"p"},"NgxInfiniteGridModule")," at ",(0,i.kt)("inlineCode",{parentName:"p"},"imports")," of your app module to use InfiniteGrid."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="app.module.ts"',title:'"app.module.ts"'},"import { NgxInfiniteGridModule } from '@egjs/ngx-infinitegrid';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    NgxInfiniteGridModule /* Add in imports */\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { } /* Your app */\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="app.component.html"',title:'"app.component.html"'},'<div NgxMasonryInfiniteGrid\n  [items]="items"\n  [trackBy]="trackBy"\n  [groupBy]="groupBy"\n  [gap]="5"\n  (requestAppend)="onRequestAppend($event)"\n  #ig\n  >\n  <div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">\n    {{item.data.key}}\n  </div>\n</div>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="app.component.ts"',title:'"app.component.ts"'},"import { Component, Input } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n})\nexport class AppComponent {\n  items = [];\n  groupBy(_: any, item: any) {\n    return item.groupKey;\n  }\n  trackBy(_: any, item: any) {\n    return item.key;\n  }\n  onRequestAppend(e) {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = this.items.length;\n\n    this.items = [\n      ...this.items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }\n}\n"))),(0,i.kt)(o.Z,{value:"svelte",mdxType:"TabItem"},(0,i.kt)("p",null,"You can import ",(0,i.kt)("inlineCode",{parentName:"p"},"InfiniteGrid"),' from the "@egjs/svelte-infinitegrid" package.'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="App.svelte"',title:'"App.svelte"'},'<script lang="ts">\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n\n  let items = [];\n<\/script>\n<MasonryInfiniteGrid\n  class="container"\n  gap={5}\n  {items}\n  on:requestAppend={({ detail: e }) => {\n    const nextGroupKey = (e.groupKey || 0) + 1;\n    const length = items.length;\n\n    items = [\n      ...items,\n      { groupKey: nextGroupKey, key: length },\n      { groupKey: nextGroupKey, key: length + 1 },\n      { groupKey: nextGroupKey, key: length + 2 },\n    ];\n  }}\n  let:visibleItems\n>\n   {#each visibleItems as item (item.key)}\n    <div class="item">\n     {item.data.key}\n    </div>\n  {/each}\n</MasonryInfiniteGrid>\n')))))}d.isMDXComponent=!0},3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(t),d=i,g=c["".concat(l,".").concat(d)]||c[d]||m[d]||a;return t?r.createElement(g,o(o({ref:n},u),{},{components:t})):r.createElement(g,o({ref:n},u))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=c;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"}}]);