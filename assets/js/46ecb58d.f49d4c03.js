"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3143],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=a.createContext({}),o=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=o(e.components);return a.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=o(t),m=r,g=d["".concat(u,".").concat(m)]||d[m]||p[m]||l;return t?a.createElement(g,i(i({ref:n},c),{},{components:t})):a.createElement(g,i({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=d;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var o=2;o<l;o++)i[o]=t[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8215:function(e,n,t){var a=t(7294);n.Z=function(e){var n=e.children,t=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:t,className:r},n)}},5064:function(e,n,t){t.d(n,{Z:function(){return o}});var a=t(7294),r=t(9443);var l=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=t(6010),s="tabItem_1uMI",u="tabItemActive_2DSg";var o=function(e){var n,t=e.lazy,r=e.block,o=e.defaultValue,c=e.values,p=e.groupId,d=e.className,m=a.Children.toArray(e.children),g=null!=c?c:m.map((function(e){return{value:e.props.value,label:e.props.label}})),f=null!=o?o:null==(n=m.find((function(e){return e.props.default})))?void 0:n.props.value,v=l(),k=v.tabGroupChoices,b=v.setTabGroupChoices,y=(0,a.useState)(f),h=y[0],j=y[1],x=[];if(null!=p){var N=k[p];null!=N&&N!==h&&g.some((function(e){return e.value===N}))&&j(N)}var T=function(e){var n=e.currentTarget,t=x.indexOf(n),a=g[t].value;j(a),null!=p&&(b(p,a),setTimeout((function(){var e,t,a,r,l,i,s,o;(e=n.getBoundingClientRect(),t=e.top,a=e.left,r=e.bottom,l=e.right,i=window,s=i.innerHeight,o=i.innerWidth,t>=0&&l<=o&&r<=s&&a>=0)||(n.scrollIntoView({block:"center",behavior:"smooth"}),n.classList.add(u),setTimeout((function(){return n.classList.remove(u)}),2e3))}),150))},w=function(e){var n,t=null;switch(e.key){case"ArrowRight":var a=x.indexOf(e.target)+1;t=x[a]||x[0];break;case"ArrowLeft":var r=x.indexOf(e.target)-1;t=x[r]||x[x.length-1]}null==(n=t)||n.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":r},d)},g.map((function(e){var n=e.value,t=e.label;return a.createElement("li",{role:"tab",tabIndex:h===n?0:-1,"aria-selected":h===n,className:(0,i.Z)("tabs__item",s,{"tabs__item--active":h===n}),key:n,ref:function(e){return x.push(e)},onKeyDown:w,onFocus:T,onClick:T},null!=t?t:n)}))),t?(0,a.cloneElement)(m.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},m.map((function(e,n){return(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==h})}))))}},9443:function(e,n,t){var a=(0,t(7294).createContext)(void 0);n.Z=a},3051:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return d},default:function(){return g}});var a=t(7462),r=t(3366),l=(t(7294),t(3905)),i=t(5064),s=t(8215),u=["components"],o={title:"Installation",id:"installation",slug:"/",custom_edit_url:null},c=void 0,p={unversionedId:"installation",id:"version-4.2.0/installation",isDocsHomePage:!1,title:"Installation",description:"Using the package managers (recommended)",source:"@site/versioned_docs/version-4.2.0/installation.mdx",sourceDirName:".",slug:"/",permalink:"/egjs-infinitegrid/docs/",editUrl:null,tags:[],version:"4.2.0",frontMatter:{title:"Installation",id:"installation",slug:"/",custom_edit_url:null},sidebar:"version-4.2.0/started",next:{title:"Quick Start",permalink:"/egjs-infinitegrid/docs/quick-start"}},d=[{value:"Using the package managers (recommended)",id:"using-the-package-managers-recommended",children:[{value:"npm",id:"npm",children:[]},{value:"yarn",id:"yarn",children:[]}]},{value:"CDN Links",id:"cdn-links",children:[{value:"packaged(with dependencies)",id:"packagedwith-dependencies",children:[]}]}],m={toc:d};function g(e){var n=e.components,t=(0,r.Z)(e,u);return(0,l.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"using-the-package-managers-recommended"},"Using the package managers (recommended)"),(0,l.kt)("p",null,"You can easily install InfiniteGrid with package managers like ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm")," or ",(0,l.kt)("a",{parentName:"p",href:"https://classic.yarnpkg.com/en/"},"yarn")),(0,l.kt)("h3",{id:"npm"},"npm"),(0,l.kt)(i.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/infinitegrid\n"))),(0,l.kt)(s.Z,{value:"react",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/react-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"vue3",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/vue3-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"angular",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/ngx-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"svelte",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @egjs/svelte-infinitegrid\n")))),(0,l.kt)("h3",{id:"yarn"},"yarn"),(0,l.kt)(i.Z,{groupId:"cfc",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/infinitegrid\n"))),(0,l.kt)(s.Z,{value:"react",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/react-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"vue3",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/vue3-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"angular",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/ngx-infinitegrid\n"))),(0,l.kt)(s.Z,{value:"svelte",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @egjs/svelte-infinitegrid\n")))),(0,l.kt)("h2",{id:"cdn-links"},"CDN Links"),(0,l.kt)("h3",{id:"packagedwith-dependencies"},"packaged(with dependencies)"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- github --\x3e\n<script src="https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- unpkg --\x3e\n<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n\x3c!-- cdnjs --\x3e\n<script src="https://cdnjs.cloudflare.com/ajax/libs/egjs-infinitegrid/4.x.x/infinitegrid.min.js" crossorigin="anonymous"><\/script>\n')))}g.isMDXComponent=!0},6010:function(e,n,t){function a(e){var n,t,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=a(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function r(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=a(e))&&(r&&(r+=" "),r+=n);return r}t.d(n,{Z:function(){return r}})}}]);