"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3664],{58032:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(96540),a=n(9546);const i={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(i.tabItem,o),hidden:n},t)}},13488:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(89575),a=n(96540),i=n(9546),o=n(61009),l=n(56347),s=n(77754),u=n(63651),c=n(21873);function p(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function m(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function g(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function d(e){let{queryString:t=!1,groupId:n}=e;const r=(0,l.W6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s.aZ)(i),(0,a.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,i=m(e),[o,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!g({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:i}))),[s,u]=d({queryString:n,groupId:r}),[p,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,i]=(0,c.Dv)(n);return[r,(0,a.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:r}),y=(()=>{const e=s??p;return g({value:e,tabValues:i})?e:null})();(0,a.useLayoutEffect)((()=>{y&&l(y)}),[y]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!g({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),f(e)}),[u,f,i]),tabValues:i}}var y=n(6642);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.a_)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),r=u[n].value;r!==l&&(p(t),s(r))},g=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>c.push(e),onKeyDown:g,onClick:m},o,{className:(0,i.A)("tabs__item",h.tabItem,o?.className,{"tabs__item--active":l===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function I(e){const t=f(e);return a.createElement("div",{className:(0,i.A)("tabs-container",h.tabList)},a.createElement(b,(0,r.A)({},e,t)),a.createElement(v,(0,r.A)({},e,t)))}function w(e){const t=(0,y.A)();return a.createElement(I,(0,r.A)({key:String(t)},e))}},33753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>c,default:()=>y,frontMatter:()=>u,metadata:()=>p,toc:()=>g});var r=n(89575),a=(n(96540),n(15680)),i=n(80406),o=n(36096),l=n(13488),s=n(58032);const u={title:"Using the Methods",id:"using-the-methods",slug:"/using-the-methods",custom_edit_url:null},c=void 0,p={unversionedId:"using-the-methods",id:"version-4.11.1/using-the-methods",title:"Using the Methods",description:"<Tabs",source:"@site/versioned_docs/version-4.11.1/using-the-methods.mdx",sourceDirName:".",slug:"/using-the-methods",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/using-the-methods",draft:!1,editUrl:null,tags:[],version:"4.11.1",frontMatter:{title:"Using the Methods",id:"using-the-methods",slug:"/using-the-methods",custom_edit_url:null},sidebar:"started",previous:{title:"Quick Start",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/quick-start"},next:{title:"Listening to Events",permalink:"/egjs-infinitegrid/ko/docs/4.11.1/listening-to-events"}},m={},g=[],d={toc:g},f="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(f,(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(l.A,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,a.yg)(s.A,{value:"js",mdxType:"TabItem"},(0,a.yg)("p",null,"You can call methods directly from the InfiniteGrid instance."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'const ig = new MasonryInfiniteGrid("#el", options);\n\nig.getItems();\n'))),(0,a.yg)(s.A,{value:"react",mdxType:"TabItem"},(0,a.yg)("p",null,"You can call methods of InfiniteGrid by getting a ",(0,a.yg)("inlineCode",{parentName:"p"},"ref")," of InfiniteGrid"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-jsx"},'import * as React from "react";\nimport { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\nexport default () => {\n  const igRef = React.useRef();\n\n  React.useEffect(() => {\n    console.log(igRef.current.getItems());\n  }, []);\n  return <MasonryInfiniteGrid ref={igRef}>\n  </MasonryInfiniteGrid>\n};\n')),(0,a.yg)("p",null,"See ",(0,a.yg)("a",{parentName:"p",href:"https://reactjs.org/docs/refs-and-the-dom.html"},"React Refs and the DOM")," for more info.")),(0,a.yg)(s.A,{value:"vue",mdxType:"TabItem"},(0,a.yg)("p",null,"You can access instance of InfiniteGrid component with the ",(0,a.yg)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements"},"ref")," property."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'<masonry-infinite-grid ref="igRef"></masonry-infinite-grid>\n')),(0,a.yg)("p",null,"Then call methods of it like"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},"this.$refs.igRef.getItems();\n"))),(0,a.yg)(s.A,{value:"vue3",mdxType:"TabItem"},(0,a.yg)("p",null,"You can access instance of InfiniteGrid component with the ",(0,a.yg)("a",{parentName:"p",href:"https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements"},"ref")," property."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'<masonry-infinite-grid ref="igRef"></masonry-infinite-grid>\n')),(0,a.yg)("p",null,"Then call methods of it like"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},"this.$refs.igRef.getItems();\n"))),(0,a.yg)(s.A,{value:"angular",mdxType:"TabItem"},(0,a.yg)("p",null,"There're few ways to interact with child component in Angular.",(0,a.yg)("br",{parentName:"p"}),"\n","See ",(0,a.yg)("a",{parentName:"p",href:"https://angular.io/guide/component-interaction#parent-interacts-with-child-via-local-variable"},"Component Interaction")," page from Angular official document, and use that to interact with InfiniteGrid."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-html",metastring:'title="app.component.html"',title:'"app.component.html"'},"<div NgxMasonryInfiniteGrid\n  #ig\n  >\n</div>\n")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="app.component.ts"',title:'"app.component.ts"'},"import { Component, Input, AfterViewInit } from '@angular/core';\n\nimport { NgxInfiniteGridComponent } from '@egjs/ngx-infinitegrid';\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n})\nexport class AppComponent implements AfterViewInit {\n  @ViewChild(\"ig\") ig!: NgxInfiniteGridComponent;\n  ngAfterViewInit() {\n    console.log(this.ig.getItems());\n  }\n}\n}\n"))),(0,a.yg)(s.A,{value:"svelte",mdxType:"TabItem"},(0,a.yg)("p",null,"You can use ",(0,a.yg)("a",{parentName:"p",href:"https://svelte.dev/tutorial/bind-this"},"bind:this")," syntax of svelte to get the reference of InfiniteGrid."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-jsx"},'<script lang="ts">\n  import { onMount } from "svelte";\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n\n  let ig;\n\n  onMount(() => {\n    console.log(ig.getItems());\n  });\n<\/script>\n<MasonryInfiniteGrid\n  bind:this={ig}\n>\n</MasonryInfiniteGrid>\n')))),(0,a.yg)("p",null,"See all available methods at our ",(0,a.yg)(i.A,{to:(0,o.A)("docs/api/InfiniteGrid#methods"),mdxType:"Link"},"API")," page."))}y.isMDXComponent=!0},15680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),g=a,d=p["".concat(s,".").concat(g)]||p[g]||m[g]||i;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"}}]);