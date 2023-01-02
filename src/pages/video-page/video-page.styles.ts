import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const videoPageStyles: ElementStyles =
    css`
    .video {
        width: 400px;
        height: 300px;
    }

    .devices {
        width: 100%;
    }

    fluent-button::part(control){
        justify-content: start;
        padding: 0 12px;
    }

    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }

`