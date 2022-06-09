import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const settingsScreenStyles: ElementStyles =
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

    html, body, p {
        ${typeRampBase}
    }

    h1 {
        ${typeRampPlus6}
    }
`