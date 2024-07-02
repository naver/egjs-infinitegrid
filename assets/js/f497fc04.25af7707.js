"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3716],{47616:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>y,frontMatter:()=>o,metadata:()=>g,toc:()=>p});var a=t(89575),r=(t(96540),t(15680));const o={custom_edit_url:null},l=void 0,g={unversionedId:"api/Component",id:"version-4.12.0/api/Component",title:"Component",description:"A class used to manage events in a component",source:"@site/versioned_docs/version-4.12.0/api/Component.mdx",sourceDirName:"api",slug:"/api/Component",permalink:"/egjs-infinitegrid/docs/api/Component",draft:!1,editUrl:null,tags:[],version:"4.12.0",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Grid",permalink:"/egjs-infinitegrid/docs/api/Grid"},next:{title:"withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/api/withInfiniteGridMethods"}},i={},p=[{value:"Properties",id:"properties",level:2},{value:"VERSION",id:"VERSION",level:3},{value:"Methods",id:"methods",level:2},{value:"trigger",id:"trigger",level:3},{value:"once",id:"once",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"on",id:"on",level:3},{value:"off",id:"off",level:3}],m={toc:p},c="wrapper";function y(e){let{components:n,...t}=e;return(0,r.yg)(c,(0,a.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"class Component\n")),(0,r.yg)("div",null),(0,r.yg)("p",null,"A class used to manage events in a component"),(0,r.yg)("div",{className:"container"},(0,r.yg)("div",{className:"row mb-2"},(0,r.yg)("div",{className:"col col--6"},(0,r.yg)("strong",null,"Properties")),(0,r.yg)("div",{className:"col col--6"},(0,r.yg)("strong",null,"Methods"))),(0,r.yg)("div",{className:"row"},(0,r.yg)("div",{className:"col col--6"},(0,r.yg)("a",{href:"#VERSION"},"VERSION"),(0,r.yg)("span",{className:"badge badge--info margin-left--sm"},"static")),(0,r.yg)("div",{className:"col col--6"},(0,r.yg)("a",{href:"#trigger"},"trigger"),(0,r.yg)("br",null),(0,r.yg)("a",{href:"#once"},"once"),(0,r.yg)("br",null),(0,r.yg)("a",{href:"#hasOn"},"hasOn"),(0,r.yg)("br",null),(0,r.yg)("a",{href:"#on"},"on"),(0,r.yg)("br",null),(0,r.yg)("a",{href:"#off"},"off")))),(0,r.yg)("h2",{id:"properties"},"Properties"),(0,r.yg)("h3",{id:"VERSION"},"VERSION"),(0,r.yg)("div",null,(0,r.yg)("span",{className:"badge badge--info"},"static")),(0,r.yg)("p",null,"Version info string"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Type"),": string"),(0,r.yg)("p",null,"Component.VERSION;  // ex) 3.0.0"),(0,r.yg)("h2",{id:"methods"},"Methods"),(0,r.yg)("h3",{id:"trigger"},"trigger"),(0,r.yg)("div",null),(0,r.yg)("p",null,"Trigger a custom event."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",null,"An instance of the component itself"))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"event"),(0,r.yg)("td",{parentName:"tr",align:"center"},"string ","|"," ComponentEvent"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The name of the custom event to be triggered or an instance of the ComponentEvent"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"params"),(0,r.yg)("td",{parentName:"tr",align:"center"},"Array","<","any",">"," ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"Event data to be sent when triggering a custom event "))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  beforeHi: ComponentEvent<{ foo: number; bar: string }>;\n  hi: { foo: { a: number; b: boolean } };\n  someEvent: (foo: number, bar: string) => void;\n  someOtherEvent: void; // When there\'s no event argument\n}> {\n  some(){\n    if(this.trigger("beforeHi")){ // When event call to stop return false.\n      this.trigger("hi");// fire hi event.\n    }\n  }\n}\n\nconst some = new Some();\nsome.on("beforeHi", e => {\n  if(condition){\n    e.stop(); // When event call to stop, `hi` event not call.\n  }\n  // `currentTarget` is component instance.\n  console.log(some === e.currentTarget); // true\n\n  typeof e.foo; // number\n  typeof e.bar; // string\n});\nsome.on("hi", e => {\n  typeof e.foo.b; // boolean\n});\n// If you want to more know event design. You can see article.\n// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F\n')),(0,r.yg)("h3",{id:"once"},"once"),(0,r.yg)("div",null),(0,r.yg)("p",null,"Executed event just one time."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",null,"An instance of the component itself"))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,r.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,r.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The handler function of the event to be attached "))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: ComponentEvent;\n}> {\n  hi() {\n    alert("hi");\n  }\n  thing() {\n    this.once("hi", this.hi);\n  }\n}\n\nvar some = new Some();\nsome.thing();\nsome.trigger(new ComponentEvent("hi"));\n// fire alert("hi");\nsome.trigger(new ComponentEvent("hi"));\n// Nothing happens\n')),(0,r.yg)("h3",{id:"hasOn"},"hasOn"),(0,r.yg)("div",null),(0,r.yg)("p",null,"Checks whether an event has been attached to a component."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Returns"),": boolean"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",null,"Indicates whether the event is attached. "))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,r.yg)("td",{parentName:"tr",align:"center"},"string"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The name of the event to be attached "))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import Component from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  some() {\n    this.hasOn("hi");// check hi event.\n  }\n}\n')),(0,r.yg)("h3",{id:"on"},"on"),(0,r.yg)("div",null),(0,r.yg)("p",null,"Attaches an event to a component."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",null,"An instance of a component itself"))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,r.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,r.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The handler function of the event to be attached "))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.on("hi",this.hi); //attach event\n  }\n}\n')),(0,r.yg)("h3",{id:"off"},"off"),(0,r.yg)("div",null),(0,r.yg)("p",null,"Detaches an event from the component.",(0,r.yg)("br",null),"If the ",(0,r.yg)("code",null,"eventName")," is not given this will detach all event handlers attached.",(0,r.yg)("br",null),"If the ",(0,r.yg)("code",null,"handlerToDetach")," is not given, this will detach all event handlers for ",(0,r.yg)("code",null,"eventName"),"."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",null,"An instance of a component itself "))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,r.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The name of the event to be detached "))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},"handlerToDetach"),(0,r.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,r.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.yg)("td",{parentName:"tr",align:"center"}),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("p",null,"The handler function of the event to be detached "))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.off("hi",this.hi); //detach event\n  }\n}\n')))}y.isMDXComponent=!0},15680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>d});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function g(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},m=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},s=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,m=g(e,["components","mdxType","originalType","parentName"]),c=p(t),s=r,d=c["".concat(i,".").concat(s)]||c[s]||y[s]||o;return t?a.createElement(d,l(l({ref:n},m),{},{components:t})):a.createElement(d,l({ref:n},m))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=s;var g={};for(var i in n)hasOwnProperty.call(n,i)&&(g[i]=n[i]);g.originalType=e,g[c]="string"==typeof e?e:r,l[1]=g;for(var p=2;p<o;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}s.displayName="MDXCreateElement"}}]);