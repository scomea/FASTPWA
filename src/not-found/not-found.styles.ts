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
 * Styles for app index
 * @public
 */
export const notFoundStyles: ElementStyles =
    css`
    :host {
    }

`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );