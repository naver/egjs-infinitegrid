import { AppComponent } from './apps/NgxPlaceholderApp/app.component';

export const PlaceholderTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
PlaceholderTemplate.storyName = "Placeholder";
