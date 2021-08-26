import { AppComponent } from './apps/NgxMasonryInfiniteGridWithStatusApp/app.component';

export const MasonryInfiniteGridWithStatusTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
MasonryInfiniteGridWithStatusTemplate.storyName = "MasonryInfiniteGridWithStatus";
