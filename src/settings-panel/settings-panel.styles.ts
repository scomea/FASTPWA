import { css, ElementStyles } from "@microsoft/fast-element";
import {
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";
// import {
//     bodyFont,
//     controlCornerRadius,
//     designUnit,
//     focusStrokeOuter,
//     neutralForegroundRest,
//     strokeWidth,
//     typeRampBaseFontSize,
//     typeRampBaseLineHeight,
// } from "../design-tokens.js";

/**
 * Styles
 * @public
 */
export const settingsPanelStyles: ElementStyles =
    css`
    .container {
        padding: 8px;
    }

`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );