import { themes } from "@storybook/theming";
import {
    INITIAL_VIEWPORTS,
    // or MINIMAL_VIEWPORTS,
} from "@storybook/addon-viewport";

// or global addParameters
export const parameters = {
    controls: {
        passArgsFirst: true,
        expanded: true,
        hideNoControlsWarning: true,
    },
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
        },
    },
    darkMode: {
        // Override the default light theme
        light: { ...themes.normal },
        // Override the default dark theme
        dark: { ...themes.dark },
    },
};
