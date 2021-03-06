import { css, ElementStyles } from "@microsoft/fast-element";
import { typeRampBase, typeRampPlus6 } from "@fluentui/web-components"

/**
 * Styles
 * @public
 */
export const settingsPageStyles: ElementStyles =
    css`
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