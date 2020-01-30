import { previewTemplate } from "storybook-addon-preview";

function getItems(nextGroupKey, nextKey, count) {
    const nextItems: Array<{ groupKey: number, key: number }> = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

export const HTML_TEMPLATE = ({ storyName, title, layoutType, itemCount = 10 }) => {
    const items: number[] = [];
    for (let i = 0; i < itemCount; ++i) {
        items.push(i);
    }
    return `<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
<div class="${layoutType} container">
${items.map(i => `    <div class="item" data-groupkey="0">
        <div class="thumbnail">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${i + 1}.jpg" alt="egjs">
        </div>
        <div class="info">egjs ${i}</div>
    </div>`).join("\n")}
</div>
`;
};

export const HTML_SQUARE_TEMPLATE = ({ layoutType, itemCount = 10 }) => {
    const items: number[] = [];
    for (let i = 0; i < itemCount; ++i) {
        items.push(i);
    }
    return `<div class="${layoutType} container">
${items.map(i => `    <div class="item" data-groupkey="0" data-column="${i % 4 === 1 ? 2 : 1}">
        <div class="thumbnail">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${i + 1}.jpg" alt="egjs">
        </div>
        <div class="info">egjs ${i}</div>
    </div>`).join("\n")}
</div>
`;
};

export const HTML_LAZY_TEMPLATE = ({ layoutType, itemCount = 10, sizes }) => {
    const items: number[] = [];
    for (let i = 0; i < itemCount; ++i) {
        items.push(i);
    }
    return `<div class="${layoutType} container">
${items.map(i => `    <div class="item" data-groupkey="0">
        <div class="thumbnail">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${i + 1}.jpg"  data-width="${sizes[i][0]}" data-height="${sizes[i][1]}" alt="egjs">
        </div>
        <div class="info">egjs ${i}</div>
    </div>`).join("\n")}
</div>
`;
};

export const HTML_LAZY_SQUARE_TEMPLATE = ({ layoutType, itemCount = 10, sizes }) => {
    const items: number[] = [];
    for (let i = 0; i < itemCount; ++i) {
        items.push(i);
    }
    return `<div class="${layoutType} container">
${items.map(i => `    <div class="item" data-groupkey="0" data-column="${i % 4 === 1 ? 2 : 1}">
        <div class="thumbnail">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${i + 1}.jpg"  data-width="${sizes[i][0]}" data-height="${sizes[i][1]}" alt="egjs">
        </div>
        <div class="info">egjs ${i}</div>
    </div>`).join("\n")}
</div>
`;
};

export const DEFAULT_ANGULAR_MODULE_TEMPLATE = previewTemplate`
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxInfiniteGridModule } from "@egjs/ngx-infinitegrid";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxInfiniteGridModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
`;

export const GET_ITEMS_TEMPLATE = `function getItems(nextGroupKey, nextKey, count) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}`;
