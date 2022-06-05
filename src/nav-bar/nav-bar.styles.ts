import { css, ElementStyles } from "@microsoft/fast-element";
import {
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";

/**
 * Styles
 * @public
 */
export const navBarStyles: ElementStyles =
    css`
    :host {
        padding: 8px;
        margin-right: 12px;
    }

`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );