import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const fileViewPanelStyles: ElementStyles =
    css`
    .container {
    }

    .filename-button,
    .header-button{
        width: 100%;
    }

    .header-button::part(control){
        background: var(--neutral-layer-floating);
    }

    .header-button::part(control):hover{
        background: var(--accent-fill-hover);
    }

    .filename-button::part(control),
    .header-button::part(control){
        justify-content: start;
    }

    .sticky-header {
        background: var(--neutral-layer-floating);
    }

    .row-header,
    .column-header {
        padding: 0;
    }

    fluent-divider {
        margin: 12px 0 12px 0;
    }

    fluent-button {
        position: unset;
    }
`