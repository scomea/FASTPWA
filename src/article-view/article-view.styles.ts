import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const articleViewStyles: ElementStyles =
    css`
    :host {
        height: 100%;
        width: 100%;
        overflow: scroll;
        margin: 0, 12px, 0, 12px;
    }

    .frame {
        border-width: 0;
        height: 100%;
        width: 100%
    }

`