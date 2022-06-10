import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const fileViewStyles: ElementStyles =
    css`
    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }

    fluent-divider {
        margin: 12px 0 12px 0;
    }

`