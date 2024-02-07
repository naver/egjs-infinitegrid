"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[42],{70684:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var r=n(7896),a=(n(67294),n(3905));const l={custom_edit_url:null},i=void 0,p={unversionedId:"api/Grid",id:"version-4.10.1/api/Grid",title:"Grid",description:"PropertiesMethodsEvents",source:"@site/versioned_docs/version-4.10.1/api/Grid.mdx",sourceDirName:"api",slug:"/api/Grid",permalink:"/egjs-infinitegrid/docs/4.10.1/api/Grid",draft:!1,editUrl:null,tags:[],version:"4.10.1",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"PackingInfiniteGrid",permalink:"/egjs-infinitegrid/docs/4.10.1/api/PackingInfiniteGrid"},next:{title:"withInfiniteGridMethods",permalink:"/egjs-infinitegrid/docs/4.10.1/api/withInfiniteGridMethods"}},d={},o=[{value:"constructor",id:"constructor",level:2},{value:"Properties",id:"properties",level:2},{value:"gap",id:"gap",level:3},{value:"defaultDirection",id:"defaultDirection",level:3},{value:"useFit",id:"useFit",level:3},{value:"preserveUIOnDestroy",id:"preserveUIOnDestroy",level:3},{value:"outlineLength",id:"outlineLength",level:3},{value:"outlineSize",id:"outlineSize",level:3},{value:"Methods",id:"methods",level:2},{value:"applyGrid",id:"applyGrid",level:3},{value:"getContainerElement",id:"getContainerElement",level:3},{value:"getItems",id:"getItems",level:3},{value:"getChildren",id:"getChildren",level:3},{value:"setItems",id:"setItems",level:3},{value:"getContainerInlineSize",id:"getContainerInlineSize",level:3},{value:"getOutlines",id:"getOutlines",level:3},{value:"setOutlines",id:"setOutlines",level:3},{value:"syncElements",id:"syncElements",level:3},{value:"updateItems",id:"updateItems",level:3},{value:"renderItems",id:"renderItems",level:3},{value:"getStatus",id:"getStatus",level:3},{value:"setStatus",id:"setStatus",level:3},{value:"getComputedOutlineSize",id:"getComputedOutlineSize",level:3},{value:"getComputedOutlineLength",id:"getComputedOutlineLength",level:3},{value:"destroy",id:"destroy",level:3},{value:"Events",id:"events",level:2},{value:"contentError",id:"event-contentError",level:3},{value:"renderComplete",id:"event-renderComplete",level:3}],s={toc:o},k="wrapper";function m(t){let{components:e,...n}=t;return(0,a.kt)(k,(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"class Grid\n")),(0,a.kt)("div",null),(0,a.kt)("div",{className:"container"},(0,a.kt)("div",{className:"row mb-2"},(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("strong",null,"Properties")),(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("strong",null,"Methods")),(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("strong",null,"Events"))),(0,a.kt)("div",{className:"row"},(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("a",{href:"#gap"},"gap"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#defaultDirection"},"defaultDirection"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#useFit"},"useFit"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#preserveUIOnDestroy"},"preserveUIOnDestroy"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#outlineLength"},"outlineLength"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#outlineSize"},"outlineSize")),(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("a",{href:"#applyGrid"},"applyGrid"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getContainerElement"},"getContainerElement"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getItems"},"getItems"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getChildren"},"getChildren"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#setItems"},"setItems"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getContainerInlineSize"},"getContainerInlineSize"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getOutlines"},"getOutlines"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#setOutlines"},"setOutlines"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#syncElements"},"syncElements"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#updateItems"},"updateItems"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#renderItems"},"renderItems"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getStatus"},"getStatus"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#setStatus"},"setStatus"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getComputedOutlineSize"},"getComputedOutlineSize"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#getComputedOutlineLength"},"getComputedOutlineLength"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#destroy"},"destroy")),(0,a.kt)("div",{className:"col col--4"},(0,a.kt)("a",{href:"#event-contentError"},"contentError"),(0,a.kt)("br",null),(0,a.kt)("a",{href:"#event-renderComplete"},"renderComplete")))),(0,a.kt)("h2",{id:"constructor"},"constructor"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"new Grid(containerElement, options)\n")),(0,a.kt)("div",null),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"containerElement"),(0,a.kt)("td",{parentName:"tr",align:"center"},"HTMLElement ","|"," string"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"A base element for a module "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"options"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Partial","<","Options",">"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The option object of the Grid module "))))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"gap"},"gap"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Gap used to create space around items."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["gap"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),": 0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  gap: 0,\n});\n\ngrid.gap = 5;\n')),(0,a.kt)("h3",{id:"defaultDirection"},"defaultDirection"),(0,a.kt)("div",null),(0,a.kt)("p",null,"The default direction value when direction is not set in the render option."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["defaultDirection"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),': "end"'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  defaultDirection: "end",\n});\n\ngrid.defaultDirection = "start";\n')),(0,a.kt)("h3",{id:"useFit"},"useFit"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Whether to move the outline to 0 when the top is empty when rendering. However, if it overflows above the top, the outline is forced to 0. (default: true)"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["useFit"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),": true"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  useFit: true,\n});\n\ngrid.useFit = false;\n')),(0,a.kt)("h3",{id:"preserveUIOnDestroy"},"preserveUIOnDestroy"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Whether to preserve the UI of the existing container or item when destroying."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["preserveUIOnDestroy"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),": false"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  preserveUIOnDestroy: false,\n});\n\ngrid.preserveUIOnDestroy = true;\n')),(0,a.kt)("h3",{id:"outlineLength"},"outlineLength"),(0,a.kt)("div",null),(0,a.kt)("p",null,"The number of outlines. If the number of outlines is 0, it is calculated according to the type of grid."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["outlineLength"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),": 0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  outlineLength: 0,\n  outlineSize: 0,\n});\n\ngrid.outlineLength = 3;\n')),(0,a.kt)("h3",{id:"outlineSize"},"outlineSize"),(0,a.kt)("div",null),(0,a.kt)("p",null,"The size of the outline. If the outline size is 0, it is calculated according to the grid type."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type"),": $ts:Grid.GridOptions",'["outlineSize"]'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Default"),": 0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\n\nconst grid = new MasonryGrid(container, {\n  outlineLength: 0,\n  outlineSize: 0,\n});\n\ngrid.outlineSize = 300;\n')),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"applyGrid"},"applyGrid"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Apply the CSS rect of items to fit the Grid and calculate the outline."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"direcion"),(0,a.kt)("td",{parentName:"tr",align:"center"},'"start" ',"|",' "end"'),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The direction to apply the Grid. (",'"',"end",'"',": start to end, ",'"',"start",'"',": end to start) "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"outline"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Array","<","number",">"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The start outline to apply the Grid. "))))),(0,a.kt)("h3",{id:"getContainerElement"},"getContainerElement"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Return Container Element."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": HTMLElement"),(0,a.kt)("h3",{id:"getItems"},"getItems"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Return items."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": GridItem[]"),(0,a.kt)("h3",{id:"getChildren"},"getChildren"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Returns the children of the container element."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": HTMLElement[]"),(0,a.kt)("h3",{id:"setItems"},"setItems"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Set items."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": this"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"items"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The items to set. "))))),(0,a.kt)("h3",{id:"getContainerInlineSize"},"getContainerInlineSize"),(0,a.kt)("div",null),(0,a.kt)("p",null,'Gets the container\'s inline size. ("width" if horizontal is false, otherwise "height")'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": number"),(0,a.kt)("h3",{id:"getOutlines"},"getOutlines"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Returns the outlines of the start and end of the Grid."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": GridOutlines"),(0,a.kt)("h3",{id:"setOutlines"},"setOutlines"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Set outlines."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"outlines"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridOutlines"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The outlines to set. "))))),(0,a.kt)("h3",{id:"syncElements"},"syncElements"),(0,a.kt)("div",null),(0,a.kt)("p",null,"When elements change, it synchronizes and renders items."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"options"),(0,a.kt)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Options for rendering. "))))),(0,a.kt)("h3",{id:"updateItems"},"updateItems"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Update the size of the items and render them."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"items"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Items to be updated. "))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"options"),(0,a.kt)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Options for rendering. "))))),(0,a.kt)("h3",{id:"renderItems"},"renderItems"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Rearrange items to fit the grid and render them. When rearrange is complete, the ",(0,a.kt)("code",null,"renderComplete")," event is fired."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"options"),(0,a.kt)("td",{parentName:"tr",align:"center"},"RenderOptions"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Options for rendering. "))))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryGrid } from "@egjs/grid";\nconst grid = new MasonryGrid();\n\ngrid.on("renderComplete", e => {\n  console.log(e);\n});\ngrid.renderItems();\n')),(0,a.kt)("h3",{id:"getStatus"},"getStatus"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Returns current status such as item's position, size. The returned status can be restored with the setStatus() method."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": GridStatus"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"minimize"),(0,a.kt)("td",{parentName:"tr",align:"center"},"boolean"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Whether to minimize the status of the item. (default: false) "))))),(0,a.kt)("h3",{id:"setStatus"},"setStatus"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Set status of the Grid module with the status returned through a call to the getStatus() method."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"status"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridStatus"),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"})))),(0,a.kt)("h3",{id:"getComputedOutlineSize"},"getComputedOutlineSize"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Get the inline size corresponding to outline."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"items"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Items to get outline size. "))))),(0,a.kt)("h3",{id:"getComputedOutlineLength"},"getComputedOutlineLength"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Get the length corresponding to outline."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Returns"),": number"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"items"),(0,a.kt)("td",{parentName:"tr",align:"center"},"GridItem[]"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"this.items"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"Items to get outline length. "))))),(0,a.kt)("h3",{id:"destroy"},"destroy"),(0,a.kt)("div",null),(0,a.kt)("p",null,"Releases the instnace and events and returns the CSS of the container and elements."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"Options"),(0,a.kt)("td",{parentName:"tr",align:"center"},"DestroyOptions"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"for destroy. "))))),(0,a.kt)("h2",{id:"events"},"Events"),(0,a.kt)("h3",{id:"event-contentError"},"contentError"),(0,a.kt)("div",null),(0,a.kt)("p",null,"This event is fired when an error occurs in the content."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"e"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("a",{parentName:"td",href:"Grid:OnContentError"},"Grid.OnContentError")),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The object of data to be sent to an event "))))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'grid.on("contentError", e => {\n  e.update();\n});\n')),(0,a.kt)("h3",{id:"event-renderComplete"},"renderComplete"),(0,a.kt)("div",null),(0,a.kt)("p",null,"This event is fired when the Grid has completed rendering."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,a.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,a.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,a.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},"e"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("a",{parentName:"td",href:"Grid:OnRenderComplete"},"Grid.OnRenderComplete")),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("p",null,"The object of data to be sent to an event "))))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'grid.on("renderComplete", e => {\n  console.log(e.mounted, e.updated, e.useResize);\n});\n')))}m.isMDXComponent=!0},3905:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>c});var r=n(67294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},l=Object.keys(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var d=r.createContext({}),o=function(t){var e=r.useContext(d),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},s=function(t){var e=o(t.components);return r.createElement(d.Provider,{value:e},t.children)},k="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,l=t.originalType,d=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),k=o(n),u=a,c=k["".concat(d,".").concat(u)]||k[u]||m[u]||l;return n?r.createElement(c,i(i({ref:e},s),{},{components:n})):r.createElement(c,i({ref:e},s))}));function c(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=n.length,i=new Array(l);i[0]=u;var p={};for(var d in e)hasOwnProperty.call(e,d)&&(p[d]=e[d]);p.originalType=t,p[k]="string"==typeof t?t:a,i[1]=p;for(var o=2;o<l;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);