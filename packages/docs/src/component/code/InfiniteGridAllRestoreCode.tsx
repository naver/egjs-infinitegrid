/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import InfiniteGridCode from "./InfiniteGridCode";

import HTMLCode from "!!raw-loader!./code3/HTMLCode.txt";
import JSCode from "!!raw-loader!./code3/JSCode.txt";
import ReactCode from "!!raw-loader!./code3/ReactCode.txt";
import VueCode from "!!raw-loader!./code3/VueCode.txt";
import AngularHTMLCode from "!!raw-loader!./code3/AngularHTMLCode.txt";
import AngularComponentCode from "!!raw-loader!./code3/AngularComponentCode.txt";
import SvelteCode from "!!raw-loader!./code3/SvelteCode.txt";


export default (props: any) => <InfiniteGridCode
  htmlCode={HTMLCode}
  reactCode={ReactCode}
  jsCode={JSCode}
  vueCode={VueCode}
  angularHTMLCode={AngularHTMLCode}
  angularComponentCode={AngularComponentCode}
  svelteCode={SvelteCode}
  {...props}
/>;
