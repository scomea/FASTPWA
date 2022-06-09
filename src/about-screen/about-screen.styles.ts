import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const aboutScreenStyles: ElementStyles =
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


    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }

`