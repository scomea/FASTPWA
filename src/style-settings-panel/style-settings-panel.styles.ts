import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampPlus4, typeRampPlus5 } from "@fluentui/web-components";

/**
 * Styles
 * @public
 */
export const styleSettingsPanelStyles: ElementStyles =
    css`

    h3 {
        ${typeRampPlus5}
    }

    h4 {
        ${typeRampPlus4}
    }

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