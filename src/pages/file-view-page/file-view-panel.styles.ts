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
    }

    .filename-button::part(control),
    .header-button::part(control){
        padding: 0 12px;
    }

    .header-button::part(control):hover{
    }

    adaptive-button::part(control){
        justify-content: start;
        padding: 0 12px;
    }

    .sticky-header {
    }

    .row-header, .column-header {
        padding: 0;
    }

    adaptive-breadcrumb {
        margin: 0 0 6px 0;
    }

    adaptive-button {
        position: unset;
    }
`