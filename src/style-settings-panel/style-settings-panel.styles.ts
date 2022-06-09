import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const styleSettingsPanelStyles: ElementStyles =
    css`
    .container {'
        padding: 0 12px;
    }

    fluent-divider {
        margin: 12px 0 24px 0;
    }

    .dark-mode-checkbox {
        margin: 12px 0 24px 24px;
    }

    .layout-sliders {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }
`