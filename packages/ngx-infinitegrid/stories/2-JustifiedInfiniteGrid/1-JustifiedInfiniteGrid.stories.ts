import { AppComponent } from './apps/NgxJustifiedInfiniteGridApp/app.component';

export const JustifiedInfiniteGridTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
