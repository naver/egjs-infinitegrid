"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8199],{47137:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>y,contentTitle:()=>l,default:()=>m,frontMatter:()=>g,metadata:()=>i,toc:()=>o});var r=n(89575),a=(n(96540),n(15680));const g={custom_edit_url:null},l=void 0,i={unversionedId:"api/Grid",id:"version-4.12.0/api/Grid",title:"Grid",description:"PropertiesMethodsEvents",source:"@site/versioned_docs/version-4.12.0/api/Grid.mdx",sourceDirName:"api",slug:"/api/Grid",permalink:"/egjs-infinitegrid/docs/api/Grid",draft:!1,editUrl:null,tags:[],version:"4.12.0",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"PackingInfiniteGrid",permalink:"/egjs-infinitegrid/docs/api/PackingInfiniteGrid"},next:{title:"Component",permalink:"/egjs-infinitegrid/docs/api/Component"}},y={},o=[{value:"constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"gap",id:"gap",level:3},{value:"defaultDirection",id:"defaultDirection",level:3},{value:"useFit",id:"useFit",level:3},{value:"preserveUIOnDestroy",id:"preserveUIOnDestroy",level:3},{value:"outlineLength",id:"outlineLength",level:3},{value:"outlineSize",id:"outlineSize",level:3},{value:"Methods",id:"methods",level:2},{value:"applyGrid",id:"applyGrid",level:3},{value:"getContainerElement",id:"getContainerElement",level:3},{value:"getItems",id:"getItems",level:3},{value:"getChildren",id:"getChildren",level:3},{value:"setItems",id:"setItems",level:3},{value:"getContainerInlineSize",id:"getContainerInlineSize",level:3},{value:"getOutlines",id:"getOutlines",level:3},{value:"setOutlines",id:"setOutlines",level:3},{value:"syncElements",id:"syncElements",level:3},{value:"updateItems",id:"updateItems",level:3},{value:"renderItems",id:"renderItems",level:3},{value:"getStatus",id:"getStatus",level:3},{value:"setStatus",id:"setStatus",level:3},{value:"getComputedOutlineSize",id:"getComputedOutlineSize",level:3},{value:"getComputedOutlineLength",id:"getComputedOutlineLength",level:3},{value:"destroy",id:"destroy",level:3},{value:"trigger",id:"trigger",level:3},{value:"once",id:"once",level:3},{value:"hasOn",id:"hasOn",level:3},{value:"on",id:"on",level:3},{value:"off",id:"off",level:3},{value:"Events",id:"events",level:2},{value:"contentError",id:"event-contentError",level:3},{value:"renderComplete",id:"event-renderComplete",level:3}],p={toc:o},d="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(d,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class Grid\n")),(0,a.yg)("div",null),(0,a.yg)("div",{className:"container"},(0,a.yg)("div",{className:"row mb-2"},(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("strong",null,"Properties")),(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("strong",null,"Methods")),(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("strong",null,"Events"))),(0,a.yg)("div",{className:"row"},(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("a",{href:"#gap"},"gap"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#defaultDirection"},"defaultDirection"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#useFit"},"useFit"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#preserveUIOnDestroy"},"preserveUIOnDestroy"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#outlineLength"},"outlineLength"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#outlineSize"},"outlineSize")),(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("a",{href:"#applyGrid"},"applyGrid"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getContainerElement"},"getContainerElement"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getItems"},"getItems"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getChildren"},"getChildren"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#setItems"},"setItems"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getContainerInlineSize"},"getContainerInlineSize"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getOutlines"},"getOutlines"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#setOutlines"},"setOutlines"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#syncElements"},"syncElements"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#updateItems"},"updateItems"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#renderItems"},"renderItems"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getStatus"},"getStatus"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#setStatus"},"setStatus"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getComputedOutlineSize"},"getComputedOutlineSize"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#getComputedOutlineLength"},"getComputedOutlineLength"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#destroy"},"destroy"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#trigger"},"trigger"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#once"},"once"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#hasOn"},"hasOn"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#on"},"on"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#off"},"off")),(0,a.yg)("div",{className:"col col--4"},(0,a.yg)("a",{href:"#event-contentError"},"contentError"),(0,a.yg)("br",null),(0,a.yg)("a",{href:"#event-renderComplete"},"renderComplete")))),(0,a.yg)("h2",{id:"constructor"},"constructor"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"new Grid(containerElement, options)\n")),(0,a.yg)("div",null),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"containerElement"),(0,a.yg)("td",{parentName:"tr",align:"center"},"HTMLElement ","|"," string"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"A base element for a module "))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"options"),(0,a.yg)("td",{parentName:"tr",align:"center"},"Partial","<","Options",">"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"{}"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The option object of the Grid module "))))),(0,a.yg)("h2",{id:"properties"},"Properties"),(0,a.yg)("h3",{id:"gap"},"gap"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Gap used to create space around items."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["gap"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),": 0"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  gap: 0,\n});\n\ngrid.gap = 5;\n')),(0,a.yg)("h3",{id:"defaultDirection"},"defaultDirection"),(0,a.yg)("div",null),(0,a.yg)("p",null,"The default direction value when direction is not set in the render option."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["defaultDirection"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),': "end"'),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  defaultDirection: "end",\n});\n\ngrid.defaultDirection = "start";\n')),(0,a.yg)("h3",{id:"useFit"},"useFit"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Whether to move the outline to 0 when the top is empty when rendering. However, if it overflows above the top, the outline is forced to 0. (default: true)"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["useFit"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),": true"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  useFit: true,\n});\n\ngrid.useFit = false;\n')),(0,a.yg)("h3",{id:"preserveUIOnDestroy"},"preserveUIOnDestroy"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Whether to preserve the UI of the existing container or item when destroying."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["preserveUIOnDestroy"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),": false"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  preserveUIOnDestroy: false,\n});\n\ngrid.preserveUIOnDestroy = true;\n')),(0,a.yg)("h3",{id:"outlineLength"},"outlineLength"),(0,a.yg)("div",null),(0,a.yg)("p",null,"The number of outlines. If the number of outlines is 0, it is calculated according to the type of grid."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["outlineLength"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),": 0"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  outlineLength: 0,\n  outlineSize: 0,\n});\n\ngrid.outlineLength = 3;\n')),(0,a.yg)("h3",{id:"outlineSize"},"outlineSize"),(0,a.yg)("div",null),(0,a.yg)("p",null,"The size of the outline. If the outline size is 0, it is calculated according to the grid type."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["outlineSize"]'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Default"),": 0"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  outlineLength: 0,\n  outlineSize: 0,\n});\n\ngrid.outlineSize = 300;\n')),(0,a.yg)("h2",{id:"methods"},"Methods"),(0,a.yg)("h3",{id:"applyGrid"},"applyGrid"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Apply the CSS rect of items to fit the Grid and calculate the outline."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"direcion"),(0,a.yg)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end"'),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The direction to apply the Grid. (",'"',"end",'"',": start to end, ",'"',"start",'"',": end to start) "))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"outline"),(0,a.yg)("td",{parentName:"tr",align:"center"},"Array","<","number",">"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The start outline to apply the Grid. "))))),(0,a.yg)("h3",{id:"getContainerElement"},"getContainerElement"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Return Container Element."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": HTMLElement"),(0,a.yg)("h3",{id:"getItems"},"getItems"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Return items."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": GridItem[]"),(0,a.yg)("h3",{id:"getChildren"},"getChildren"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Returns the children of the container element."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": HTMLElement[]"),(0,a.yg)("h3",{id:"setItems"},"setItems"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Set items."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"items"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The items to set. "))))),(0,a.yg)("h3",{id:"getContainerInlineSize"},"getContainerInlineSize"),(0,a.yg)("div",null),(0,a.yg)("p",null,'Gets the container\'s inline size. ("width" if horizontal is false, otherwise "height")'),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": number"),(0,a.yg)("h3",{id:"getOutlines"},"getOutlines"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Returns the outlines of the start and end of the Grid."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": GridOutlines"),(0,a.yg)("h3",{id:"setOutlines"},"setOutlines"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Set outlines."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"outlines"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridOutlines"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The outlines to set. "))))),(0,a.yg)("h3",{id:"syncElements"},"syncElements"),(0,a.yg)("div",null),(0,a.yg)("p",null,"When elements change, it synchronizes and renders items."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"options"),(0,a.yg)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"{}"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Options for rendering. "))))),(0,a.yg)("h3",{id:"updateItems"},"updateItems"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Update the size of the items and render them."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"items"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Items to be updated. "))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"options"),(0,a.yg)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"{}"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Options for rendering. "))))),(0,a.yg)("h3",{id:"renderItems"},"renderItems"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Rearrange items to fit the grid and render them. When rearrange is complete, the ",(0,a.yg)("code",null,"renderComplete")," event is fired."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"options"),(0,a.yg)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"{}"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Options for rendering. "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\nconst grid = new MasonryGrid();\n\ngrid.on("renderComplete", e => {\n  console.log(e);\n});\ngrid.renderItems();\n')),(0,a.yg)("h3",{id:"getStatus"},"getStatus"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Returns current status such as item's position, size. The returned status can be restored with the setStatus() method."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": GridStatus"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"minimize"),(0,a.yg)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Whether to minimize the status of the item. (default: false) "))))),(0,a.yg)("h3",{id:"setStatus"},"setStatus"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Set status of the Grid module with the status returned through a call to the getStatus() method."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"status"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridStatus"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"})))),(0,a.yg)("h3",{id:"getComputedOutlineSize"},"getComputedOutlineSize"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Get the inline size corresponding to outline."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"items"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Items to get outline size. "))))),(0,a.yg)("h3",{id:"getComputedOutlineLength"},"getComputedOutlineLength"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Get the length corresponding to outline."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": number"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"items"),(0,a.yg)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Items to get outline length. "))))),(0,a.yg)("h3",{id:"destroy"},"destroy"),(0,a.yg)("div",null),(0,a.yg)("p",null,"Releases the instnace and events and returns the CSS of the container and elements."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"Options"),(0,a.yg)("td",{parentName:"tr",align:"center"},"DestroyOptions"),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"},"{}"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"for destroy. "))))),(0,a.yg)("h3",{id:"trigger"},"trigger"),(0,a.yg)("div",null,(0,a.yg)("span",{className:"badge badge--danger"},"inherited")),(0,a.yg)("p",null,"Trigger a custom event."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",null,"An instance of the component itself"))),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"event"),(0,a.yg)("td",{parentName:"tr",align:"center"},"string ","|"," ComponentEvent"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The name of the custom event to be triggered or an instance of the ComponentEvent"))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"params"),(0,a.yg)("td",{parentName:"tr",align:"center"},"Array","<","any",">"," ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"Event data to be sent when triggering a custom event "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  beforeHi: ComponentEvent<{ foo: number; bar: string }>;\n  hi: { foo: { a: number; b: boolean } };\n  someEvent: (foo: number, bar: string) => void;\n  someOtherEvent: void; // When there\'s no event argument\n}> {\n  some(){\n    if(this.trigger("beforeHi")){ // When event call to stop return false.\n      this.trigger("hi");// fire hi event.\n    }\n  }\n}\n\nconst some = new Some();\nsome.on("beforeHi", e => {\n  if(condition){\n    e.stop(); // When event call to stop, `hi` event not call.\n  }\n  // `currentTarget` is component instance.\n  console.log(some === e.currentTarget); // true\n\n  typeof e.foo; // number\n  typeof e.bar; // string\n});\nsome.on("hi", e => {\n  typeof e.foo.b; // boolean\n});\n// If you want to more know event design. You can see article.\n// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F\n')),(0,a.yg)("h3",{id:"once"},"once"),(0,a.yg)("div",null,(0,a.yg)("span",{className:"badge badge--danger"},"inherited")),(0,a.yg)("p",null,"Executed event just one time."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",null,"An instance of the component itself"))),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,a.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,a.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The handler function of the event to be attached "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: ComponentEvent;\n}> {\n  hi() {\n    alert("hi");\n  }\n  thing() {\n    this.once("hi", this.hi);\n  }\n}\n\nvar some = new Some();\nsome.thing();\nsome.trigger(new ComponentEvent("hi"));\n// fire alert("hi");\nsome.trigger(new ComponentEvent("hi"));\n// Nothing happens\n')),(0,a.yg)("h3",{id:"hasOn"},"hasOn"),(0,a.yg)("div",null,(0,a.yg)("span",{className:"badge badge--danger"},"inherited")),(0,a.yg)("p",null,"Checks whether an event has been attached to a component."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": boolean"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",null,"Indicates whether the event is attached. "))),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,a.yg)("td",{parentName:"tr",align:"center"},"string"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The name of the event to be attached "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import Component from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  some() {\n    this.hasOn("hi");// check hi event.\n  }\n}\n')),(0,a.yg)("h3",{id:"on"},"on"),(0,a.yg)("div",null,(0,a.yg)("span",{className:"badge badge--danger"},"inherited")),(0,a.yg)("p",null,"Attaches an event to a component."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",null,"An instance of a component itself"))),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,a.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The name of the event to be attached or an event name - event handler mapped object."))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"handlerToAttach"),(0,a.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The handler function of the event to be attached "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.on("hi",this.hi); //attach event\n  }\n}\n')),(0,a.yg)("h3",{id:"off"},"off"),(0,a.yg)("div",null,(0,a.yg)("span",{className:"badge badge--danger"},"inherited")),(0,a.yg)("p",null,"Detaches an event from the component.",(0,a.yg)("br",null),"If the ",(0,a.yg)("code",null,"eventName")," is not given this will detach all event handlers attached.",(0,a.yg)("br",null),"If the ",(0,a.yg)("code",null,"handlerToDetach")," is not given, this will detach all event handlers for ",(0,a.yg)("code",null,"eventName"),"."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Returns"),": this"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",null,"An instance of a component itself "))),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"eventName"),(0,a.yg)("td",{parentName:"tr",align:"center"},"string ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The name of the event to be detached "))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"handlerToDetach"),(0,a.yg)("td",{parentName:"tr",align:"center"},"function ","|"," $ts:..."),(0,a.yg)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The handler function of the event to be detached "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import Component, { ComponentEvent } from "@egjs/component";\n\nclass Some extends Component<{\n  hi: void;\n}> {\n  hi() {\n    console.log("hi");\n  }\n  some() {\n    this.off("hi",this.hi); //detach event\n  }\n}\n')),(0,a.yg)("h2",{id:"events"},"Events"),(0,a.yg)("h3",{id:"event-contentError"},"contentError"),(0,a.yg)("div",null),(0,a.yg)("p",null,"This event is fired when an error occurs in the content."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"e"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("a",{parentName:"td",href:"Grid:OnContentError"},"Grid.OnContentError")),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The object of data to be sent to an event "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'grid.on("contentError", e => {\n  e.update();\n});\n')),(0,a.yg)("h3",{id:"event-renderComplete"},"renderComplete"),(0,a.yg)("div",null),(0,a.yg)("p",null,"This event is fired when the Grid has completed rendering."),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.yg)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.yg)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.yg)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"center"},"e"),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("a",{parentName:"td",href:"Grid:OnRenderComplete"},"Grid.OnRenderComplete")),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"}),(0,a.yg)("td",{parentName:"tr",align:"center"},(0,a.yg)("p",null,"The object of data to be sent to an event "))))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},'grid.on("renderComplete", e => {\n  console.log(e.mounted, e.updated, e.useResize);\n});\n')))}m.isMDXComponent=!0},15680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>c});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},g=Object.keys(e);for(r=0;r<g.length;r++)n=g[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(e);for(r=0;r<g.length;r++)n=g[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var y=r.createContext({}),o=function(e){var t=r.useContext(y),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=o(e.components);return r.createElement(y.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,g=e.originalType,y=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=o(n),s=a,c=d["".concat(y,".").concat(s)]||d[s]||m[s]||g;return n?r.createElement(c,l(l({ref:t},p),{},{components:n})):r.createElement(c,l({ref:t},p))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var g=n.length,l=new Array(g);l[0]=s;var i={};for(var y in t)hasOwnProperty.call(t,y)&&(i[y]=t[y]);i.originalType=e,i[d]="string"==typeof e?e:a,l[1]=i;for(var o=2;o<g;o++)l[o]=n[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);