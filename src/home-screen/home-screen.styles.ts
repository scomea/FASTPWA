import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"
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

    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
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