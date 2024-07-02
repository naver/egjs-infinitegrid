import WaitNReadyApp from "./apps/SvelteWaitNReadyApp.svelte";
import "../../../infinitegrid/stories/templates/default.css";


export const WaitNReadyTemplate = (props) => ({
  Component: WaitNReadyApp,
  props,
});

WaitNReadyTemplate.storyName = "Wait & Ready";
