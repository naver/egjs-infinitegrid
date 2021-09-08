import { AppComponent } from './apps/NgxPackingInfiniteGridApp/app.component';

export const PackingInfiniteGridTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
