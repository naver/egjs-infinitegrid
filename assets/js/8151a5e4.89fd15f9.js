"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8711],{3905:function(t,e,n){n.d(e,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),m=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},c=function(t){var e=m(t.components);return a.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},k=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,p=t.parentName,c=i(t,["components","mdxType","originalType","parentName"]),k=m(n),d=r,u=k["".concat(p,".").concat(d)]||k[d]||s[d]||o;return n?a.createElement(u,l(l({ref:e},c),{},{components:n})):a.createElement(u,l({ref:e},c))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,l=new Array(o);l[0]=k;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i.mdxType="string"==typeof t?t:r,l[1]=i;for(var m=2;m<o;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7804:function(t,e,n){n.r(e),n.d(e,{assets:function(){return c},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return i},metadata:function(){return m},toc:function(){return s}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=["components"],i={custom_edit_url:null},p=void 0,m={unversionedId:"api/Component",id:"version-4.0.0/api/Component",title:"Component",description:"A class used to manage events in a component",source:"@site/versioned_docs/version-4.0.0/api/Component.mdx",sourceDirName:"api",slug:"/api/Component",permalink:"/egjs-infinitegrid/docs/4.0.0/api/Component",draft:!1,editUrl:null,tags:[],version:"4.0.0",frontMatter:{custom_edit_url:null},sidebar:"version-4.0.0/api",previous:{title:"Grid",permalink:"/egjs-infinitegrid/docs/4.0.0/api/Grid"},next:{title:"withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/4.0.0/api/withInfiniteGridMethods"}},c={},s=[{value:"Properties",id:"properties",level:2},{value:"VERSION",id:"VERSION",level:3},{value:"Methods",id:"methods",level:2},{value:"trigger",id:"trigger",level:3},{value:"once",id:"once",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"on",id:"on",level:3},{value:"off",id:"off",level:3}],k={toc:s};function d(t){var e=t.components,n=(0,r.Z)(t,l);return(0,o.kt)("wrapper",(0,a.Z)({},k,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class Component\n")),(0,o.kt)("p",null,"A class used to manage events in a component"),(0,o.kt)("div",{className:"container"},(0,o.kt)("div",{className:"row mb-2"},(0,o.kt)("div",{className:"col col--6"},(0,o.kt)("strong",null,"Properties")),(0,o.kt)("div",{className:"col col--6"},(0,o.kt)("strong",null,"Methods"))),(0,o.kt)("div",{className:"row"},(0,o.kt)("div",{className:"col col--6"},(0,o.kt)("a",{href:"#VERSION"},"VERSION"),(0,o.kt)("span",{className:"bulma-tag is-info ml-2"},"static")),(0,o.kt)("div",{className:"col col--6"},(0,o.kt)("a",{href:"#trigger"},"trigger"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#once"},"once"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#hasOn"},"hasOn"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#on"},"on"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#off"},"off")))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"VERSION"},"VERSION"),(0,o.kt)("div",{className:"bulma-tags"},(0,o.kt)("span",{className:"bulma-tag is-info"},"static")),(0,o.kt)("p",null,"Version info string"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type"),": string"),(0,o.kt)("p",null,"Component.VERSION;  // ex) 3.0.0"),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("h3",{id:"trigger"},"trigger"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Trigger a custom event."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": this"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",null,"An instance of the component itself"))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"event"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string ","|"," ComponentEvent"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The name of the custom event to be triggered or an instance of the ComponentEvent"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"params"),(0,o.kt)("td",{parentName:"tr",align:"center"},"Array","<","any",">"," ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"Event data to be sent when triggering a custom event "))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  beforeHi: ComponentEvent<{ foo: number; bar: string }>;\n  hi: { foo: { a: number; b: boolean } };\n  someEvent: (foo: number, bar: string) => void;\n  someOtherEvent: void; // When there\'s no event argument\n}> {\n  some(){\n    if(this.trigger("beforeHi")){ // When event call to stop return false.\n      this.trigger("hi");// fire hi event.\n    }\n  }\n}\n\nconst some = new Some();\nsome.on("beforeHi", e => {\n  if(condition){\n    e.stop(); // When event call to stop, `hi` event not call.\n  }\n  // `currentTarget` is component instance.\n  console.log(some === e.currentTarget); // true\n\n  typeof e.foo; // number\n  typeof e.bar; // string\n});\nsome.on("hi", e => {\n  typeof e.foo.b; // boolean\n});\n// If you want to more know event design. You can see article.\n// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F\n')),(0,o.kt)("h3",{id:"once"},"once"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Executed event just one time."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": this"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",null,"An instance of the component itself"))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"eventName"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,o.kt)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The handler function of the event to be attached "))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: ComponentEvent;\n}> {\n  hi() {\n    alert("hi");\n  }\n  thing() {\n    this.once("hi", this.hi);\n  }\n}\n\nvar some = new Some();\nsome.thing();\nsome.trigger(new ComponentEvent("hi"));\n// fire alert("hi");\nsome.trigger(new ComponentEvent("hi"));\n// Nothing happens\n')),(0,o.kt)("h3",{id:"hasOn"},"hasOn"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Checks whether an event has been attached to a component."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": boolean"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",null,"Indicates whether the event is attached. "))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"eventName"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The name of the event to be attached "))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import Component from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  some() {\n    this.hasOn("hi");// check hi event.\n  }\n}\n')),(0,o.kt)("h3",{id:"on"},"on"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Attaches an event to a component."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": this"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",null,"An instance of a component itself"))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"eventName"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,o.kt)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The handler function of the event to be attached "))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.on("hi",this.hi); //attach event\n  }\n}\n')),(0,o.kt)("h3",{id:"off"},"off"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Detaches an event from the component.",(0,o.kt)("br",null),"If the ",(0,o.kt)("code",null,"eventName")," is not given this will detach all event handlers attached.",(0,o.kt)("br",null),"If the ",(0,o.kt)("code",null,"handlerToDetach")," is not given, this will detach all event handlers for ",(0,o.kt)("code",null,"eventName"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": this"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",null,"An instance of a component itself "))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"eventName"),(0,o.kt)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The name of the event to be detached "))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"handlerToDetach"),(0,o.kt)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,o.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("p",null,"The handler function of the event to be detached "))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.off("hi",this.hi); //detach event\n  }\n}\n')))}d.isMDXComponent=!0}}]);