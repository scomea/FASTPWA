import { css, ElementStyles } from "@microsoft/fast-element";

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

`