import { css, ElementStyles } from "@microsoft/fast-element";
import {
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"


/**
 * Styles
 * @public
 */
export const notFoundStyles: ElementStyles =
    css`
    :host {
    }

    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }
`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
        :host {
        }
        `
        )
    );