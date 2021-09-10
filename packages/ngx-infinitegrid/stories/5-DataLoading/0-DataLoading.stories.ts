import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { NgxInfiniteGridModule } from '../../projects/ngx-infinitegrid/src/public-api';

export default {
  title: "Examples/Data Loading",
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [NgxInfiniteGridModule, CommonModule],
    }),
  ],
};
export * from "./1-WaitNReady.stories";
export * from "./2-Placeholder.stories";
export * from "./3-Loading.stories";
