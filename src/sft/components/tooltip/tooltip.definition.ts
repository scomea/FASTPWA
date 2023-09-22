import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { composeTooltip } from "./tooltip.compose.js";
import { styleModules } from "./tooltip.styles.modules.js";

/**
 * The component definition.
 *
 * @public
 */
export const tooltipDefinition = composeTooltip(
    AdaptiveDesignSystem,
    {
        styleModules,
    }
);
