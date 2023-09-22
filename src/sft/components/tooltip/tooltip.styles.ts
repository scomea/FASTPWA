import {
    accentForegroundReadableControlStyles,
    controlDensityStyles,
    cornerRadiusControl,
    controlShapeStyles,
    neutralForegroundStrongElementStyles,
    neutralStrokeSubtleRest,
    elevationTooltip,
    neutralFillSubtleRest,
    strokeThickness
} from "@adaptive-web/adaptive-ui/reference";
import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Basic layout styling associated with the anatomy of the template.
 * @public
 */
export const templateStyles: ElementStyles = css`
    :host {
        contain: size;
        overflow: visible;
        height: 0;
        width: 0;
    }
    .tooltip {
        box-sizing: border-box;
        background: ${neutralFillSubtleRest};
        padding: 4px;
        height: fit-content;
        width: fit-content;
        white-space: nowrap;
        z-index: 10000;
        box-shadow: ${elevationTooltip};
    }
    fast-anchored-region {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
        flex-direction: row;
    }
    fast-anchored-region.right,
    fast-anchored-region.left {
        flex-direction: column;
    }
    fast-anchored-region.top .tooltip {
        margin-bottom: 4px;
    }
    fast-anchored-region.bottom .tooltip {
        margin-top: 4px;
    }
    fast-anchored-region.left .tooltip {
        margin-right: 4px;
    }
    fast-anchored-region.right .tooltip {
        margin-left: 4px;
    }
    fast-anchored-region.top.left .tooltip,
    fast-anchored-region.top.right .tooltip {
        margin-bottom: 0;
    }
    fast-anchored-region.bottom.left .tooltip,
    fast-anchored-region.bottom.right .tooltip {
        margin-top: 0;
    }
    fast-anchored-region.top.left .tooltip,
    fast-anchored-region.bottom.left .tooltip {
        margin-right: 0;
    }
    fast-anchored-region.top.right .tooltip,
    fast-anchored-region.bottom.right .tooltip {
        margin-left: 0;
    }
`;

/**
 * Visual styles including Adaptive UI tokens.
 * @public
 */
export const aestheticStyles: ElementStyles = css`
`;
