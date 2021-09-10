import { AppComponent } from './apps/NgxWaitNReadyApp/app.component';

export const WaitNReadyTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
WaitNReadyTemplate.storyName = "Wait & Ready";
