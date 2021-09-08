import * as React from "react";
import StatusApp from "./apps/VanillaStatusApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const StatusTemplate = getApp(
  StatusApp,
  () => <div className="wrapper">
    <div className="button-area">
      <button className="save">Save Status</button>
      <button className="restore">Restore Status</button>
    </div>
    <div className="container"></div>
  </div>,
);

StatusTemplate.storyName = "Status";

// StatusTemplate.parameters = {
//   preview: getPreview("6-Status", "Status", {
//     htmlCode: `<div class="wrapper">
//     <div class="button-area">
//       <button class="save">Save Status</button>
//       <button class="restore">Restore Status</button>
//     </div>
//     <div class="container"></div>
//   </div>`,
//   }),
// };


