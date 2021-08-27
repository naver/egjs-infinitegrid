import { AppComponent } from './apps/NgxMasonryInfiniteGridApp/app.component';
// import HTML_TEMPLATE from '!!raw-loader!./apps/NgxMasonryGridApp/app.component.html';
// import CSS_TEMPLATE from '!!raw-loader!../../../../stories/templates/default.css';
// import RawNgxMasonryGridApp from '!!raw-loader!./apps/NgxMasonryGridApp/app.component.ts';
// import MODULE_TEMPLATE from '!!raw-loader!../apps/default/app.module.ts';

export const MasonryGridTemplate = (props: any) => ({
  component: AppComponent,
  props: {
    ...props,
    key: JSON.stringify(props),
  },
});
MasonryGridTemplate.storyName = "MasonryGrid";


// MasonryGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryGridTemplate.args = {
//   ...makeArgs(MasonryGridTemplate.argTypes),
// };

// MasonryGridTemplate.parameters = {
//   preview: [
//     {
//       tab: "CSS",
//       template: CSS_TEMPLATE,
//       language: "css",
//     },
//     {
//       tab: "Angular",
//       template: HTML_TEMPLATE,
//       language: "html",
//       description: "app.component.html",
//     },
//     {
//       tab: "Angular",
//       template: convertAngularTemplate(convertPath(RawNgxMasonryGridApp, "projects", "@egjs/ngx-grid")),
//       language: "ts",
//       description: "app.component.ts",
//     },
//     {
//       tab: "Angular",
//       template: convertPath(MODULE_TEMPLATE, "projects", "@egjs/ngx-grid"),
//       language: "ts",
//       description: "app.module.ts",
//     },
//   ],
// };
