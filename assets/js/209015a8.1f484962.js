"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7338],{62342:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var r=n(7896),a=(n(67294),n(3905));const i={custom_edit_url:null},l=void 0,o={unversionedId:"api/InfiniteGridOptions",id:"version-4.1.1/api/InfiniteGridOptions",title:"InfiniteGridOptions",description:"InfiniteGridOptions",source:"@site/versioned_docs/version-4.1.1/api/InfiniteGridOptions.mdx",sourceDirName:"api",slug:"/api/InfiniteGridOptions",permalink:"/egjs-infinitegrid/docs/4.1.1/api/InfiniteGridOptions",draft:!1,editUrl:null,tags:[],version:"4.1.1",frontMatter:{custom_edit_url:null},sidebar:"version-4.1.1/api",previous:{title:"InfiniteGridItemInfo",permalink:"/egjs-infinitegrid/docs/4.1.1/api/InfiniteGridItemInfo"},next:{title:"InsertedPlaceholdersResult",permalink:"/egjs-infinitegrid/docs/4.1.1/api/InsertedPlaceholdersResult"}},p={},d=[{value:"InfiniteGridOptions",id:"InfiniteGridOptions",level:3}],c={toc:d},s="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"InfiniteGridOptions"},"InfiniteGridOptions"),(0,a.kt)("div",{className:"bulma-tags"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"horizontal"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Direction of the scroll movement. (true: horizontal, false: vertical) If horizontal is false, ",(0,a.kt)("code",null,"inlinePos")," is left, ",(0,a.kt)("code",null,"inlineSize")," is width, ",(0,a.kt)("code",null,"contentPos")," is top, and ",(0,a.kt)("code",null,"contentSize")," is height. If horizontal is true, ",(0,a.kt)("code",null,"inlinePos")," is top, ",(0,a.kt)("code",null,"inlineSize")," is height, ",(0,a.kt)("code",null,"contentPos")," is left, and ",(0,a.kt)("code",null,"contentSize")," is width.  (default: false)",(0,a.kt)("br",null)))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"percentage"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Array","<",'"position" ',"|",' "size"',">"," ","|"," boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to set the css size and position of the item to %. (default: false)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"isEqualSize"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to ",'"',"true",'"',", the performance of layout arrangement can be improved. (default: false)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"isConstantSize"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved. (default: false)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"gap"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Gap used to create space around items. (default: 5)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"attributePrefix"),(0,a.kt)("td",{parentName:"tr",align:"center"},"string"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The prefix to use element's data attribute. (default: ",'"',"data-grid-",'"',")"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"resizeDebounce"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Debounce time to set in the resize event. (default: 100)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"maxResizeDebounce"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Maximum time to debounce the resize event(0 is not set). (default: 0)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"autoResize"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to move the outline to 0 when the top is empty when rendering. However, if it overflows above the top, the outline is forced to 0. (default: true) "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"useFit"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether the resize method should be called automatically after a window resize event. (default: true)"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"useTransform"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to use transform property instead of using left and top css properties. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"renderOnPropertyChange"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to automatically render through property change. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"preserveUIOnDestroy"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to preserve the UI of the existing container or item when destroying. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"defaultDirection"),(0,a.kt)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end"'),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The default direction value when direction is not set in the render option. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"externalItemRenderer"),(0,a.kt)("td",{parentName:"tr",align:"center"},"ItemRenderer ","|"," null"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"You can set the ItemRenderer directly externally. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"externalContainerManager"),(0,a.kt)("td",{parentName:"tr",align:"center"},"ContainerManager ","|"," null"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"You can set the ContainerManager\ub97c directly externally. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"container"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean ","|"," string ","|"," HTMLElement"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The target to which the container is applied. If false, create itself, if true, create container. A string or HTMLElement specifies the target directly. (default: false) "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"containerTag"),(0,a.kt)("td",{parentName:"tr",align:"center"},"string"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"If you create a container, you can set the container's tag. (default: ",'"',"div",'"',") "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"threshold"),(0,a.kt)("td",{parentName:"tr",align:"center"},"number"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The size of the scrollable area for adding the next group of items. (default: 100) "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"useRecycle"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to show only the DOM of the visible area. (default: true) "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"gridConstructor"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridFunction"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Grid class to apply Infinite function. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"renderer"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Renderer ","|"," null"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"class that renders the DOM. "))))))}m.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),d=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=d(n),u=a,k=s["".concat(p,".").concat(u)]||s[u]||m[u]||i;return n?r.createElement(k,l(l({ref:t},c),{},{components:n})):r.createElement(k,l({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[s]="string"==typeof e?e:a,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);