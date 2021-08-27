import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { NgxInfiniteGridModule } from '../../projects/ngx-infinitegrid/src/public-api';

export default {
  title: "Examples/MasonryInfiniteGrid",
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [NgxInfiniteGridModule, CommonModule],
    }),
  ],
};
export * from "./1-MasonryInfiniteGrid.stories";
export * from "./2-MasonryInfiniteGridWithPlaceholders.stories";
export * from "./3-MasonryInfiniteGridWithLoading.stories";
export * from "./4-MasonryInfiniteGridWithStatus.stories";
