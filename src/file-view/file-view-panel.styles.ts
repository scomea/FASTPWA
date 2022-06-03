import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const fileViewPanelStyles: ElementStyles =
    css`
    .container {
    }

    .filename-button {
        width: 100%;
    }

    .filename-button::part(control){
        justify-content: start;
        padding: 0;
    }

    .sticky-header {
        background: var(--neutral-layer-floating);
    }

    fluent-divider {
        margin: 12px 0 12px 0;
    }

    fluent-button {
        position: unset;
    }
`