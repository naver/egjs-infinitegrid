import { AppComponent } from './apps/NgxLoadingApp/app.component';

export const LoadingTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
LoadingTemplate.storyName = "Loading";
