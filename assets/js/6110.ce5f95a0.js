/*! For license information please see 6110.ce5f95a0.js.LICENSE.txt */
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6110],{2302:(e,n,t)=>{t.d(n,{Z:()=>s});var r=t(7896),o=t(67294),a=t(6277),i=t(9489),l=t(62581),c=t(63095);const u={anchorWithStickyNavbar:"anchorWithStickyNavbar_LWe7",anchorWithHideOnScrollNavbar:"anchorWithHideOnScrollNavbar_WYt5"};function s(e){let{as:n,id:t,...s}=e;const{navbar:{hideOnScroll:f}}=(0,l.L)();if("h1"===n||!t)return o.createElement(n,(0,r.Z)({},s,{id:void 0}));const m=(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to {heading}",description:"Title for link to heading"},{heading:"string"==typeof s.children?s.children:t});return o.createElement(n,(0,r.Z)({},s,{className:(0,a.Z)("anchor",f?u.anchorWithHideOnScrollNavbar:u.anchorWithStickyNavbar,s.className),id:t}),s.children,o.createElement(c.Z,{className:"hash-link",to:`#${t}`,"aria-label":m,title:m},"\u200b"))}},58592:(e,n,t)=>{t.d(n,{Z:()=>A});var r=t(67294),o=t(3905),a=t(7896),i=t(36506);var l=t(22901);var c=t(63095);var u=t(6277),s=t(8864),f=t(63151);const m={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function p(e,n){return!!e&&(e===n||p(e.parentElement,n))}function h(e){let{summary:n,children:t,...o}=e;const i=(0,s.Z)(),l=(0,r.useRef)(null),{collapsed:c,setCollapsed:h}=(0,f.u)({initialState:!o.open}),[v,y]=(0,r.useState)(o.open),g=r.isValidElement(n)?n:r.createElement("summary",null,n??"Details");return r.createElement("details",(0,a.Z)({},o,{ref:l,open:v,"data-collapsed":c,className:(0,u.Z)(m.details,i&&m.isBrowser,o.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&p(n,l.current)&&(e.preventDefault(),c?(h(!1),y(!0)):h(!0))}}),g,r.createElement(f.z,{lazy:!1,collapsed:c,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{h(e),y(!e)}},r.createElement("div",{className:m.collapsibleContent},t)))}const v={details:"details_b_Ee"},y="alert alert--info";function g(e){let{...n}=e;return r.createElement(h,(0,a.Z)({},n,{className:(0,u.Z)(y,v.details,n.className)}))}var E=t(2302);function b(e){return r.createElement(E.Z,e)}const C={containsTaskList:"containsTaskList_mC6p"};function k(e){if(void 0!==e)return(0,u.Z)(e,e?.includes("contains-task-list")&&C.containsTaskList)}const N={img:"img_ev3q"};var _=t(90737),L=t(9489);const S="admonition_LlT9",x="admonitionHeading_tbUL",Z="admonitionIcon_kALy",w="admonitionContent_S0QG";const H={note:{infimaClassName:"secondary",iconComponent:function(){return r.createElement("svg",{viewBox:"0 0 14 16"},r.createElement("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))},label:r.createElement(L.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)"},"note")},tip:{infimaClassName:"success",iconComponent:function(){return r.createElement("svg",{viewBox:"0 0 12 16"},r.createElement("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))},label:r.createElement(L.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)"},"tip")},danger:{infimaClassName:"danger",iconComponent:function(){return r.createElement("svg",{viewBox:"0 0 12 16"},r.createElement("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))},label:r.createElement(L.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)"},"danger")},info:{infimaClassName:"info",iconComponent:function(){return r.createElement("svg",{viewBox:"0 0 14 16"},r.createElement("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))},label:r.createElement(L.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)"},"info")},caution:{infimaClassName:"warning",iconComponent:function(){return r.createElement("svg",{viewBox:"0 0 16 16"},r.createElement("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))},label:r.createElement(L.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)"},"caution")}},T={secondary:"note",important:"info",success:"tip",warning:"danger"};function R(e){const{mdxAdmonitionTitle:n,rest:t}=function(e){const n=r.Children.toArray(e),t=n.find((e=>r.isValidElement(e)&&"mdxAdmonitionTitle"===e.props?.mdxType)),o=r.createElement(r.Fragment,null,n.filter((e=>e!==t)));return{mdxAdmonitionTitle:t,rest:o}}(e.children);return{...e,title:e.title??n,children:t}}const $={head:function(e){const n=r.Children.map(e.children,(e=>r.isValidElement(e)?function(e){if(e.props?.mdxType&&e.props.originalType){const{mdxType:n,originalType:t,...o}=e.props;return r.createElement(e.props.originalType,o)}return e}(e):e));return r.createElement(i.Z,e,n)},code:function(e){const n=["a","abbr","b","br","button","cite","code","del","dfn","em","i","img","input","ins","kbd","label","object","output","q","ruby","s","small","span","strong","sub","sup","time","u","var","wbr"];return r.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")||(0,r.isValidElement)(e)&&n.includes(e.props?.mdxType)))?r.createElement("code",e):r.createElement(l.Z,e)},a:function(e){return r.createElement(c.Z,e)},pre:function(e){return r.createElement(l.Z,(0,r.isValidElement)(e.children)&&"code"===e.children.props?.originalType?e.children.props:{...e})},details:function(e){const n=r.Children.toArray(e.children),t=n.find((e=>r.isValidElement(e)&&"summary"===e.props?.mdxType)),o=r.createElement(r.Fragment,null,n.filter((e=>e!==t)));return r.createElement(g,(0,a.Z)({},e,{summary:t}),o)},ul:function(e){return r.createElement("ul",(0,a.Z)({},e,{className:k(e.className)}))},img:function(e){return r.createElement("img",(0,a.Z)({loading:"lazy"},e,{className:(n=e.className,(0,u.Z)(n,N.img))}));var n},h1:e=>r.createElement(b,(0,a.Z)({as:"h1"},e)),h2:e=>r.createElement(b,(0,a.Z)({as:"h2"},e)),h3:e=>r.createElement(b,(0,a.Z)({as:"h3"},e)),h4:e=>r.createElement(b,(0,a.Z)({as:"h4"},e)),h5:e=>r.createElement(b,(0,a.Z)({as:"h5"},e)),h6:e=>r.createElement(b,(0,a.Z)({as:"h6"},e)),admonition:function(e){const{children:n,type:t,title:o,icon:a}=R(e),i=function(e){const n=T[e]??e,t=H[n];return t||(console.warn(`No admonition config found for admonition type "${n}". Using Info as fallback.`),H.info)}(t),l=o??i.label,{iconComponent:c}=i,s=a??r.createElement(c,null);return r.createElement("div",{className:(0,u.Z)(_.k.common.admonition,_.k.common.admonitionType(e.type),"alert",`alert--${i.infimaClassName}`,S)},r.createElement("div",{className:x},r.createElement("span",{className:Z},s),l),r.createElement("div",{className:w},n))},mermaid:t(8624).Z};function A(e){let{children:n}=e;return r.createElement(o.Zo,{components:$},n)}},92425:(e,n,t)=>{t.d(n,{Z:()=>s});var r=t(7896),o=t(67294),a=t(6277),i=t(77633);const l={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},c="table-of-contents__link toc-highlight",u="table-of-contents__link--active";function s(e){let{className:n,...t}=e;return o.createElement("div",{className:(0,a.Z)(l.tableOfContents,"thin-scrollbar",n)},o.createElement(i.Z,(0,r.Z)({},t,{linkClassName:c,linkActiveClassName:u})))}},77633:(e,n,t)=>{t.d(n,{Z:()=>p});var r=t(7896),o=t(67294),a=t(62581);function i(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const r=t.slice(2,e.level);e.parentIndex=Math.max(...r),t[e.level]=n}));const r=[];return n.forEach((e=>{const{parentIndex:t,...o}=e;t>=0?n[t].children.push(o):r.push(o)})),r}function l(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:r}=e;return n.flatMap((e=>{const n=l({toc:e.children,minHeadingLevel:t,maxHeadingLevel:r});return function(e){return e.level>=t&&e.level<=r}(e)?[{...e,children:n}]:n}))}function c(e){const n=e.getBoundingClientRect();return n.top===n.bottom?c(e.parentNode):n}function u(e,n){let{anchorTopOffset:t}=n;const r=e.find((e=>c(e).top>=t));if(r){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(c(r))?r:e[e.indexOf(r)-1]??null}return e[e.length-1]??null}function s(){const e=(0,o.useRef)(0),{navbar:{hideOnScroll:n}}=(0,a.L)();return(0,o.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function f(e){const n=(0,o.useRef)(void 0),t=s();(0,o.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:r,linkActiveClassName:o,minHeadingLevel:a,maxHeadingLevel:i}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(r),l=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const r=[];for(let o=n;o<=t;o+=1)r.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(r.join()))}({minHeadingLevel:a,maxHeadingLevel:i}),c=u(l,{anchorTopOffset:t.current}),s=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(o),e.classList.add(o),n.current=e):e.classList.remove(o)}(e,e===s)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,t])}function m(e){let{toc:n,className:t,linkClassName:r,isChild:a}=e;return n.length?o.createElement("ul",{className:a?void 0:t},n.map((e=>o.createElement("li",{key:e.id},o.createElement("a",{href:`#${e.id}`,className:r??void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(m,{isChild:!0,toc:e.children,className:t,linkClassName:r}))))):null}const d=o.memo(m);function p(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:c="table-of-contents__link",linkActiveClassName:u,minHeadingLevel:s,maxHeadingLevel:m,...p}=e;const h=(0,a.L)(),v=s??h.tableOfContents.minHeadingLevel,y=m??h.tableOfContents.maxHeadingLevel,g=function(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:r}=e;return(0,o.useMemo)((()=>l({toc:i(n),minHeadingLevel:t,maxHeadingLevel:r})),[n,t,r])}({toc:n,minHeadingLevel:v,maxHeadingLevel:y});return f((0,o.useMemo)((()=>{if(c&&u)return{linkClassName:c,linkActiveClassName:u,minHeadingLevel:v,maxHeadingLevel:y}}),[c,u,v,y])),o.createElement(d,(0,r.Z)({toc:g,className:t,linkClassName:c},p))}},83426:(e,n,t)=>{var r=t(37320),o="function"==typeof Symbol&&Symbol.for,a=o?Symbol.for("react.element"):60103,i=o?Symbol.for("react.portal"):60106,l=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,u=o?Symbol.for("react.profiler"):60114,s=o?Symbol.for("react.provider"):60109,f=o?Symbol.for("react.context"):60110,m=o?Symbol.for("react.forward_ref"):60112,d=o?Symbol.for("react.suspense"):60113,p=o?Symbol.for("react.memo"):60115,h=o?Symbol.for("react.lazy"):60116,v="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function b(e,n,t){this.props=e,this.context=n,this.refs=E,this.updater=t||g}function C(){}function k(e,n,t){this.props=e,this.context=n,this.refs=E,this.updater=t||g}b.prototype.isReactComponent={},b.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,n,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},C.prototype=b.prototype;var N=k.prototype=new C;N.constructor=k,r(N,b.prototype),N.isPureReactComponent=!0;var _={current:null},L=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function x(e,n,t){var r,o={},i=null,l=null;if(null!=n)for(r in void 0!==n.ref&&(l=n.ref),void 0!==n.key&&(i=""+n.key),n)L.call(n,r)&&!S.hasOwnProperty(r)&&(o[r]=n[r]);var c=arguments.length-2;if(1===c)o.children=t;else if(1<c){for(var u=Array(c),s=0;s<c;s++)u[s]=arguments[s+2];o.children=u}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===o[r]&&(o[r]=c[r]);return{$$typeof:a,type:e,key:i,ref:l,props:o,_owner:_.current}}function Z(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var w=/\/+/g,H=[];function T(e,n,t,r){if(H.length){var o=H.pop();return o.result=e,o.keyPrefix=n,o.func=t,o.context=r,o.count=0,o}return{result:e,keyPrefix:n,func:t,context:r,count:0}}function R(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>H.length&&H.push(e)}function $(e,n,t,r){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var l=!1;if(null===e)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case a:case i:l=!0}}if(l)return t(r,e,""===n?"."+O(e,0):n),1;if(l=0,n=""===n?".":n+":",Array.isArray(e))for(var c=0;c<e.length;c++){var u=n+O(o=e[c],c);l+=$(o,u,t,r)}else if(null===e||"object"!=typeof e?u=null:u="function"==typeof(u=v&&e[v]||e["@@iterator"])?u:null,"function"==typeof u)for(e=u.call(e),c=0;!(o=e.next()).done;)l+=$(o=o.value,u=n+O(o,c++),t,r);else if("object"===o)throw t=""+e,Error(y(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t,""));return l}function A(e,n,t){return null==e?0:$(e,"",n,t)}function O(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return n[e]}))}(e.key):n.toString(36)}function M(e,n){e.func.call(e.context,n,e.count++)}function z(e,n,t){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,n,e.count++),Array.isArray(e)?I(e,r,t,(function(e){return e})):null!=e&&(Z(e)&&(e=function(e,n){return{$$typeof:a,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||n&&n.key===e.key?"":(""+e.key).replace(w,"$&/")+"/")+t)),r.push(e))}function I(e,n,t,r,o){var a="";null!=t&&(a=(""+t).replace(w,"$&/")+"/"),A(e,z,n=T(n,a,r,o)),R(n)}var P={current:null};function j(){var e=P.current;if(null===e)throw Error(y(321));return e}var B={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:_,IsSomeRendererActing:{current:!1},assign:r};n.Children={map:function(e,n,t){if(null==e)return e;var r=[];return I(e,r,null,n,t),r},forEach:function(e,n,t){if(null==e)return e;A(e,M,n=T(null,null,n,t)),R(n)},count:function(e){return A(e,(function(){return null}),null)},toArray:function(e){var n=[];return I(e,n,null,(function(e){return e})),n},only:function(e){if(!Z(e))throw Error(y(143));return e}},n.Component=b,n.Fragment=l,n.Profiler=u,n.PureComponent=k,n.StrictMode=c,n.Suspense=d,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=B,n.cloneElement=function(e,n,t){if(null==e)throw Error(y(267,e));var o=r({},e.props),i=e.key,l=e.ref,c=e._owner;if(null!=n){if(void 0!==n.ref&&(l=n.ref,c=_.current),void 0!==n.key&&(i=""+n.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in n)L.call(n,s)&&!S.hasOwnProperty(s)&&(o[s]=void 0===n[s]&&void 0!==u?u[s]:n[s])}var s=arguments.length-2;if(1===s)o.children=t;else if(1<s){u=Array(s);for(var f=0;f<s;f++)u[f]=arguments[f+2];o.children=u}return{$$typeof:a,type:e.type,key:i,ref:l,props:o,_owner:c}},n.createContext=function(e,n){return void 0===n&&(n=null),(e={$$typeof:f,_calculateChangedBits:n,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},n.createElement=x,n.createFactory=function(e){var n=x.bind(null,e);return n.type=e,n},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:m,render:e}},n.isValidElement=Z,n.lazy=function(e){return{$$typeof:h,_ctor:e,_status:-1,_result:null}},n.memo=function(e,n){return{$$typeof:p,type:e,compare:void 0===n?null:n}},n.useCallback=function(e,n){return j().useCallback(e,n)},n.useContext=function(e,n){return j().useContext(e,n)},n.useDebugValue=function(){},n.useEffect=function(e,n){return j().useEffect(e,n)},n.useImperativeHandle=function(e,n,t){return j().useImperativeHandle(e,n,t)},n.useLayoutEffect=function(e,n){return j().useLayoutEffect(e,n)},n.useMemo=function(e,n){return j().useMemo(e,n)},n.useReducer=function(e,n,t){return j().useReducer(e,n,t)},n.useRef=function(e){return j().useRef(e)},n.useState=function(e){return j().useState(e)},n.version="16.14.0"},2784:(e,n,t)=>{e.exports=t(83426)}}]);