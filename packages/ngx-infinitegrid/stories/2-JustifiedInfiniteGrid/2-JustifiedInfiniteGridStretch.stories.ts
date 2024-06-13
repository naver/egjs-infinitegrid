import { AppComponent } from './apps/NNgxJustifiedInfiniteGridStretchApp/app.component';

export const JustifiedInfiniteGridStretchTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
JustifiedInfiniteGridStretchTemplate.storyName = "JustifiedInfiniteGrid (stretch)";
