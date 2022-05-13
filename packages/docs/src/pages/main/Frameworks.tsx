import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

import styles from "./frameworks.module.css";

export default () => {
  const plugins = [new AutoPlay()];

  return (<Flicking className="mb-2" plugins={plugins} circular={true}>
    <div className="framework-logo button mr-2 is-danger">
      <div className="framework-logo-wrapper mr-2"><img src="img/icons/angular.svg" /></div>
      <span>@egjs/ngx-infinitegrid</span>
    </div>
    <div className="framework-logo button mr-2 is-info">
      <div className="framework-logo-wrapper mr-2"><img src="img/icons/react.svg" /></div>
      <span>@egjs/react-infinitegrid</span>
    </div>
    <div className="framework-logo button mr-2 is-success">
      <div className="framework-logo-wrapper mr-2"><img src="img/icons/vue.svg" /></div>
      <span>@egjs/vue-infinitegrid</span>
    </div>
    <div className="framework-logo button mr-2 is-light">
      <div className="framework-logo-wrapper mr-2"><img src="img/icons/svelte.svg" /></div>
      <span>@egjs/svelte-infinitegrid</span>
    </div>
    <div className={`framework-logo button mr-2 ${styles["is-vue3"]}`}>
      <div className="framework-logo-wrapper mr-2"><img src="img/icons/vue.svg" /></div>
      <span>@egjs/vue3-infinitegrid</span>
    </div>
  </Flicking>);
};
