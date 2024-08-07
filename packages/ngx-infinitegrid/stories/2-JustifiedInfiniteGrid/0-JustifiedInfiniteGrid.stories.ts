import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { NgxInfiniteGridModule } from '../../projects/ngx-infinitegrid/src/public-api';

export default {
  title: "Examples/JustifiedInfiniteGrid",
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [NgxInfiniteGridModule, CommonModule],
    }),
  ],
};
export * from "./1-JustifiedInfiniteGrid.stories";
export * from "./2-JustifiedInfiniteGridStretch.stories";
