import { css, ElementStyles } from "@microsoft/fast-element";
import {
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";

/**
 * Styles
 * @public
 */
export const homeScreenStyles: ElementStyles =
    css`
    :host {
        height: 100%;
        width: 100%;
        overflow: scroll;
    }

    .image {
        width: 100%;
    }

    .container {
        padding: 0 12px;
    }

`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );