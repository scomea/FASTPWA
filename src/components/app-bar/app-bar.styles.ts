import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const appBarStyles: ElementStyles =
    css`
    :host {
        box-sizing: border-box;
        display: block;
        background: var(--neutral-layer-floating);
    }

    fluent-toolbar {
        background: transparent;
    }
`