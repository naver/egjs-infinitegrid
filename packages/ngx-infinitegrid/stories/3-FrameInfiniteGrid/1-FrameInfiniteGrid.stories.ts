import { AppComponent } from './apps/NgxFrameInfiniteGridApp/app.component';

export const FrameInfiniteGridTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";
