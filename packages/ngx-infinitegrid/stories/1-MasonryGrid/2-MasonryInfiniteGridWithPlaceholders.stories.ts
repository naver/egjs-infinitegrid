import { AppComponent } from './apps/NgxMasonryInfiniteGridWithPlaceholdersApp/app.component';

export const MasonryInfiniteGridWithPlaceholdersTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
MasonryInfiniteGridWithPlaceholdersTemplate.storyName = "MasonryInfiniteGridWithPlaceholders";
