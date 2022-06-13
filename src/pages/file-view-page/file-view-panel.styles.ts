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

    .filename-button::part(control),
    .header-button::part(control){
        padding: 0 12px;
    }

    .header-button::part(control):hover{
        background: var(--accent-fill-hover);
    }

    fluent-button::part(control){
        justify-content: start;
        padding: 0 12px;
    }

    .sticky-header {
        background: var(--neutral-layer-floating);
    }

    .row-header, .column-header {
        padding: 0;
    }

    fluent-breadcrumb {
        margin: 0 0 6px 0;
    }

    fluent-button {
        position: unset;
    }
`