"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1854],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),p=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,k=u["".concat(d,".").concat(m)]||u[m]||s[m]||i;return n?r.createElement(k,l(l({ref:t},c),{},{components:n})):r.createElement(k,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9322:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return c},default:function(){return u}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),l=["components"],o={custom_edit_url:null},d=void 0,p={unversionedId:"api/InfiniteGridOptions",id:"version-4.2.1/api/InfiniteGridOptions",isDocsHomePage:!1,title:"InfiniteGridOptions",description:"Type: TSInterface",source:"@site/versioned_docs/version-4.2.1/api/InfiniteGridOptions.mdx",sourceDirName:"api",slug:"/api/InfiniteGridOptions",permalink:"/egjs-infinitegrid/docs/api/InfiniteGridOptions",editUrl:null,tags:[],version:"4.2.1",frontMatter:{custom_edit_url:null},sidebar:"version-4.2.1/api",previous:{title:"InfiniteGridItemInfo",permalink:"/egjs-infinitegrid/docs/api/InfiniteGridItemInfo"},next:{title:"InsertedPlaceholdersResult",permalink:"/egjs-infinitegrid/docs/api/InsertedPlaceholdersResult"}},c=[],s={toc:c};function u(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("div",null),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": TSInterface"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"horizontal"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Direction of the scroll movement. (true: horizontal, false: vertical) If horizontal is false, ",(0,i.kt)("code",null,"inlinePos")," is left, ",(0,i.kt)("code",null,"inlineSize")," is width, ",(0,i.kt)("code",null,"contentPos")," is top, and ",(0,i.kt)("code",null,"contentSize")," is height. If horizontal is true, ",(0,i.kt)("code",null,"inlinePos")," is top, ",(0,i.kt)("code",null,"inlineSize")," is height, ",(0,i.kt)("code",null,"contentPos")," is left, and ",(0,i.kt)("code",null,"contentSize")," is width.  (default: false)",(0,i.kt)("br",null)))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"percentage"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Array","<",'"position" ',"|",' "size"',">"," ","|"," boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to set the css size and position of the item to %. (default: false)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isEqualSize"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to ",'"',"true",'"',", the performance of layout arrangement can be improved. (default: false)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isConstantSize"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved. (default: false)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"gap"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Gap used to create space around items. (default: 5)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"attributePrefix"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The prefix to use element's data attribute. (default: ",'"',"data-grid-",'"',")"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"resizeDebounce"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Debounce time to set in the resize event. (default: 100)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"maxResizeDebounce"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Maximum time to debounce the resize event(0 is not set). (default: 0)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"autoResize"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to move the outline to 0 when the top is empty when rendering. However, if it overflows above the top, the outline is forced to 0. (default: true) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"useFit"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether the resize method should be called automatically after a window resize event. (default: true)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"useTransform"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to use transform property instead of using left and top css properties. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"renderOnPropertyChange"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to automatically render through property change. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"preserveUIOnDestroy"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to preserve the UI of the existing container or item when destroying. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"defaultDirection"),(0,i.kt)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end"'),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The number of outlines. If the number of outlines is 0, it is calculated according to the type of grid. (default: 0) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"outlineLength"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The size of the outline. If the outline size is 0, it is calculated according to the grid type. (default: 0) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"outlineSize"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The default direction value when direction is not set in the render option. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"useRoundedSize"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to get the size as rounded size(offsetWidth, offsetHeight). Set to true if transform is applied to the container. If false, get the size through getBoundingClientRect. (default: true)",(0,i.kt)("br",null)))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"useResizeObserver"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to use ResizeObserver event to detect container size change when ",(0,i.kt)("code",null,"autoResize")," option is used. (default: false)"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"externalItemRenderer"),(0,i.kt)("td",{parentName:"tr",align:"center"},"ItemRenderer ","|"," null"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"You can set the ItemRenderer directly externally. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"externalContainerManager"),(0,i.kt)("td",{parentName:"tr",align:"center"},"ContainerManager ","|"," null"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"You can set the ContainerManager directly externally. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"container"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean ","|"," string ","|"," HTMLElement"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The target to which the container is applied. If false, create itself, if true, create container. A string or HTMLElement specifies the target directly. (default: false) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"containerTag"),(0,i.kt)("td",{parentName:"tr",align:"center"},"string"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"If you create a container, you can set the container's tag. (default: ",'"',"div",'"',") "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"threshold"),(0,i.kt)("td",{parentName:"tr",align:"center"},"number"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"The size of the scrollable area for adding the next group of items. (default: 100) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"useRecycle"),(0,i.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Whether to show only the DOM of the visible area. (default: true) "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"gridConstructor"),(0,i.kt)("td",{parentName:"tr",align:"center"},"GridFunction"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"Grid class to apply Infinite function. "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"renderer"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Renderer ","|"," null"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("p",null,"class that renders the DOM. "))))))}u.isMDXComponent=!0}}]);