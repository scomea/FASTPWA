import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const fileViewStyles: ElementStyles =
    css`
    :host {
    }

    .directory {
        margin: 12px;
    }

    .directory-selector {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: center;
    }

    fluent-divider {
        margin: 12px 0 12px 0;
    }

`