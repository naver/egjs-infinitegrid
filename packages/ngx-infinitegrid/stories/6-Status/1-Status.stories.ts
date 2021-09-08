import { AppComponent } from './apps/NgxStatusApp/app.component';

export const StatusTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
StatusTemplate.storyName = "Status";
