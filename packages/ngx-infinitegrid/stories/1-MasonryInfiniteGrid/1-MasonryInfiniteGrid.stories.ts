import { AppComponent } from './apps/NgxMasonryInfiniteGridApp/app.component';

export const MasonryInfiniteGridTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";

