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
    }

    .frame {
        border-width: 0;
        height: 100%;
        width: 100%
    }

`