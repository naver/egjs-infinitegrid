"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2961],{3217:(e,a,t)=>{t.d(a,{Z:()=>i});var n=t(7294),l=t(6277);const r="tabItem_Ymn6";function i(e){let{children:a,hidden:t,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,l.Z)(r,i),hidden:t},a)}},3873:(e,a,t)=>{t.d(a,{Z:()=>m});var n=t(7896),l=t(7294),r=t(6277),i=t(8864),s=t(3171),u=t(9e3),o=t(1347);const c="tabList__CuJ",p="tabItem_LNqP";function d(e){var a;const{lazy:t,block:i,defaultValue:d,values:m,groupId:g,className:v}=e,f=l.Children.map(e.children,(e=>{if((0,l.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=m??f.map((e=>{let{props:{value:a,label:t,attributes:n}}=e;return{value:a,label:t,attributes:n}})),k=(0,s.l)(b,((e,a)=>e.value===a.value));if(k.length>0)throw new Error(`Docusaurus error: Duplicate values "${k.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===d?d:d??(null==(a=f.find((e=>e.props.default)))?void 0:a.props.value)??f[0].props.value;if(null!==h&&!b.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:j}=(0,u.U)(),[T,N]=(0,l.useState)(h),x=[],{blockElementScrollPositionUntilNextRender:w}=(0,o.o5)();if(null!=g){const e=y[g];null!=e&&e!==T&&b.some((a=>a.value===e))&&N(e)}const O=e=>{const a=e.currentTarget,t=x.indexOf(a),n=b[t].value;n!==T&&(w(a),N(n),null!=g&&j(g,String(n)))},I=e=>{var a;let t=null;switch(e.key){case"Enter":O(e);break;case"ArrowRight":{const a=x.indexOf(e.currentTarget)+1;t=x[a]??x[0];break}case"ArrowLeft":{const a=x.indexOf(e.currentTarget)-1;t=x[a]??x[x.length-1];break}}null==(a=t)||a.focus()};return l.createElement("div",{className:(0,r.Z)("tabs-container",c)},l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":i},v)},b.map((e=>{let{value:a,label:t,attributes:i}=e;return l.createElement("li",(0,n.Z)({role:"tab",tabIndex:T===a?0:-1,"aria-selected":T===a,key:a,ref:e=>x.push(e),onKeyDown:I,onClick:O},i,{className:(0,r.Z)("tabs__item",p,null==i?void 0:i.className,{"tabs__item--active":T===a})}),t??a)}))),t?(0,l.cloneElement)(f.filter((e=>e.props.value===T))[0],{className:"margin-top--md"}):l.createElement("div",{className:"margin-top--md"},f.map(((e,a)=>(0,l.cloneElement)(e,{key:a,hidden:e.props.value!==T})))))}function m(e){const a=(0,i.Z)();return l.createElement(d,(0,n.Z)({key:String(a)},e))}},9204:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>c,contentTitle:()=>u,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var n=t(7896),l=(t(7294),t(3905)),r=t(3873),i=t(3217);const s={title:"Installation",id:"installation",slug:"/",custom_edit_url:null},u=void 0,o={unversionedId:"installation",id:"version-4.3.1/installation",title:"Installation",description:"Using the package managers (recommended)",source:"@site/versioned_docs/version-4.3.1/installation.mdx",sourceDirName:".",slug:"/",permalink:"/egjs-infinitegrid/docs/4.3.1/",draft:!1,editUrl:null,tags:[],version:"4.3.1",frontMatter:{title:"Installation",id:"installation",slug:"/",custom_edit_url:null},sidebar:"started",next:{title:"Quick Start",permalink:"/egjs-infinitegrid/docs/4.3.1/quick-start"}},c={},p=[{value:"Using the package managers (recommended)",id:"using-the-package-managers-recommended",level:2},{value:"npm",id:"npm",level:3},{value:"yarn",id:"yarn",level:3},{value:"CDN Links",id:"cdn-links",level:2},{value:"packaged(with dependencies)",id:"packagedwith-dependencies",level:3}],d={toc:p};function m(e){let{components:a,...t}=e;return(0,l.kt)("wrapper",(0,n.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"using-the-package-managers-recommended"},"Using the package managers (recommended)"),(0,l.kt)("p",null,"You can easily install InfiniteGrid with package managers like ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm")," or ",(0,l.kt)("a",{parentName:"p",href:"https://classic.yarnpkg.com/en/"},"yarn")),(0,l.kt)("h3",{id:"npm"},"npm"),(0,l.kt)(r.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/infinitegrid\n"))),(0,l.kt)(i.Z,{value:"react",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/react-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"vue3",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue3-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"angular",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/ngx-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"svelte",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/svelte-infinitegrid\n")))),(0,l.kt)("h3",{id:"yarn"},"yarn"),(0,l.kt)(r.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/infinitegrid\n"))),(0,l.kt)(i.Z,{value:"react",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/react-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"vue3",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue3-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"angular",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/ngx-infinitegrid\n"))),(0,l.kt)(i.Z,{value:"svelte",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/svelte-infinitegrid\n")))),(0,l.kt)("h2",{id:"cdn-links"},"CDN Links"),(0,l.kt)("h3",{id:"packagedwith-dependencies"},"packaged(with dependencies)"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- github --\x3e\n<script src="https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- unpkg --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- cdnjs --\x3e\n<script src="https://cdnjs.cloudflare.com/ajax/libs/egjs-infinitegrid/4.x.x/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')))}m.isMDXComponent=!0},3905:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>m});var n=t(7294);function l(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){l(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,l=function(e,a){if(null==e)return{};var t,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(l[t]=e[t]);return l}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var u=n.createContext({}),o=function(e){var a=n.useContext(u),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},c=function(e){var a=o(e.components);return n.createElement(u.Provider,{value:a},e.children)},p={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var t=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=o(t),m=l,g=d["".concat(u,".").concat(m)]||d[m]||p[m]||r;return t?n.createElement(g,i(i({ref:a},c),{},{components:t})):n.createElement(g,i({ref:a},c))}));function m(e,a){var t=arguments,l=a&&a.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=d;var s={};for(var u in a)hasOwnProperty.call(a,u)&&(s[u]=a[u]);s.originalType=e,s.mdxType="string"==typeof e?e:l,i[1]=s;for(var o=2;o<r;o++)i[o]=t[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);