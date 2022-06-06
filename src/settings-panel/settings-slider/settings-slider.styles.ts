import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const settingsSliderStyles: ElementStyles =
    css`
    .container {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: max-content max-content;
        margin: 12px;
    }

    .slider {
        height: 80px;
        grid-column: 1 / 3;
        grid-row: 2
        margin 12px;
    }

    .reset-btn {
        grid-column: 2;
        grid-row: 1;
    }

    .reset-btn::part(control){
        justify-content: end;
    }


    .label {
        margin: 0 0 12px 0;
        grid-column: 1;
        grid-row: 1;
    }
`