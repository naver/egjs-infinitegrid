import * as React from "react";
import { IMAGE_SIZES } from "../consts";

export const Item = ({ num }) => <div className="item" data-column={num % 4 === 1 ? 2 : 1}>
    <div className="thumbnail">
        <img
            src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) +
                1}.jpg`}
            alt="egjs"
        />
    </div>
    <div className="info">{`egjs ${num}`}</div>
</div>;
export const LazyItem = ({ num }) => <div className="item" data-column={num % 4 === 1 ? 2 : 1}>
<div className="thumbnail">
    <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) +
            1}.jpg`}

        data-width={IMAGE_SIZES[num % 33][0]}
        data-height={IMAGE_SIZES[num % 33][1]}
        alt="egjs"
    />
</div>
<div className="info">{`egjs ${num}`}</div>
</div>;

export const VANILLA_MARKUP_TEMPLATE = `<div class="item">
    <div class="thumbnail">
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg" alt="egjs" />
    </div>
    <div class="info">egjs ${"$"}{num}</div>
</div>`;
export const REACT_MARKUP_TEMPLATE = `<div className="item">
    <div className="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg${"`"}}
            alt="egjs"
        />
    </div>
    <div className="info">{${"`"}egjs ${"$"}{num}${"`"}}</div>
</div>`;
export const VUE_MARKUP_TEMPLATE = `<div class="item" v-for="item in items" :groupKey="item.groupKey" :key="item.key">
    <div class="thumbnail">
        <img
        :src="${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) +1}.jpg${"`"}"
        alt="egjs"
        >
    </div>
    <div class="info">{{${"`"}egjs ${"$"}{item.key}${"`"}}}</div>
</div>`;
export const SVELTE_MARKUP_TEMPLATE = `<div class="item">
    <div class="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) + 1}.jpg${"`"}}
            alt="egjs" />
    </div>
    <div class="info">{${"`"}egjs ${"$"}{item.key}${"`"}}</div>
</div>`;
export const ANGULAR_MARKUP_TEMPLATE = `<div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">
    <div class="thumbnail">
        <img [src]="'https://naver.github.io/egjs-infinitegrid/assets/image/' + (item.key % 33 + 1) + '.jpg'" alt="egjs" />
    </div>
    <div class="info">egjs {{item.key}}</div>
</div>`;

export const VANILLA_LAZY_MARKUP_TEMPLATE = `<div class="item">
    <div class="thumbnail">
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg" alt="egjs"
            data-width="${"$"}{IMAGE_SIZES[num % 33][0]}"
            data-height="${"$"}{IMAGE_SIZES[num % 33][1]}" />
    </div>
    <div class="info">egjs ${"$"}{num}</div>
</div>`;
export const REACT_LAZY_MARKUP_TEMPLATE = `<div className="item">
    <div className="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg${"`"}} alt="egjs"
            data-width={IMAGE_SIZES[num % 33][0]}
            data-height={IMAGE_SIZES[num % 33][1]} />
    </div>
    <div className="info">{${"`"}egjs ${"$"}{num}${"`"}}</div>
</div>`;
export const VUE_LAZY_MARKUP_TEMPLATE = `<div class="item" v-for="item in items" :groupKey="item.groupKey" :key="item.key">
    <div class="thumbnail">
        <img
        :src="${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) +1}.jpg${"`"}"
        alt="egjs"
        :data-width="IMAGE_SIZES[item.key % 33][0]"
        :data-height="IMAGE_SIZES[item.key % 33][1]"
        >
    </div>
    <div class="info">{{${"`"}egjs ${"$"}{item.key}${"`"}}}</div>
</div>`;
export const SVELTE_LAZY_MARKUP_TEMPLATE = `<div class="item">
    <div class="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) + 1}.jpg${"`"}}
            data-width={IMAGE_SIZES[item.key % 33][0]}
            data-height={IMAGE_SIZES[item.key % 33][1]}
            alt="egjs" />
    </div>
    <div class="info">{${"`"}egjs ${"$"}{item.key}${"`"}}</div>
</div>`;
export const ANGULAR_LAZY_MARKUP_TEMPLATE = `<div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">
    <div class="thumbnail">
        <img [src]="'https://naver.github.io/egjs-infinitegrid/assets/image/' + (item.key % 33 + 1) + '.jpg'" alt="egjs"
            [attr.data-width]="IMAGE_SIZES[item.key % 33][0]"
            [attr.data-height]="IMAGE_SIZES[item.key % 33][1]" />
    </div>
    <div class="info">egjs {{item.key}}</div>
</div>`;

export const VANILLA_SQUARE_MARKUP_TEMPLATE = `<div class="item" data-column="${"$"}{num % 4 === 1 ? 2 : 1}">
    <div class="thumbnail">
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg" alt="egjs" />
    </div>
    <div class="info">egjs ${"$"}{num}</div>
</div>`;
export const REACT_SQUARE_MARKUP_TEMPLATE = `<div className="item" data-column={num % 4 === 1 ? 2 : 1}>
    <div className="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(num % 33) + 1}.jpg${"`"}}
            alt="egjs"
        />
    </div>
    <div className="info">{${"`"}egjs ${"$"}{num}${"`"}}</div>
</div>`;
export const VUE_SQUARE_MARKUP_TEMPLATE = `<div class="item" v-for="item in items" :groupKey="item.groupKey" :key="item.key"  :data-column="item.key % 4 === 1 ? 2 : 1">
    <div class="thumbnail">
        <img
        :src="${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) +1}.jpg${"`"}"
        alt="egjs"
        >
    </div>
    <div class="info">{{${"`"}egjs ${"$"}{item.key}${"`"}}}</div>
</div>`;
export const SVELTE_SQUARE_MARKUP_TEMPLATE = `<div class="item"  data-column={item.key % 4 === 1 ? 2 : 1}>
    <div class="thumbnail">
        <img
            src={${"`"}https://naver.github.io/egjs-infinitegrid/assets/image/${"$"}{(item.key % 33) + 1}.jpg${"`"}}
            alt="egjs" />
    </div>
    <div class="info">{${"`"}egjs ${"$"}{item.key}${"`"}}</div>
</div>`;
export const ANGULAR_SQUARE_MARKUP_TEMPLATE = `<div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;"  [attr.data-column]="item.key % 4 === 1 ? 2 : 1">
    <div class="thumbnail">
        <img [src]="'https://naver.github.io/egjs-infinitegrid/assets/image/' + (item.key % 33 + 1) + '.jpg'" alt="egjs" />
    </div>
    <div class="info">egjs {{item.key}}</div>
</div>`;
