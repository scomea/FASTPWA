import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"
import {
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";

/**
 * Styles
 * @public
 */
export const homePageStyles: ElementStyles =
    css`
    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }

    .image {
        width: 100%;
    }

`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );