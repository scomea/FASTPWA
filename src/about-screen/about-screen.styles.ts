import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const aboutScreenStyles: ElementStyles =
    css`
    .image {
        width: 100%;
    }

    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }

`