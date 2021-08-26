import { AppComponent } from './apps/NgxMasonryInfiniteGridWithLoadingApp/app.component';

export const MasonryInfiniteGridWithLoadingTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
MasonryInfiniteGridWithLoadingTemplate.storyName = "MasonryInfiniteGridWithLoading";
