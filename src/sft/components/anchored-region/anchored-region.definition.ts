import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { composeAnchoredRegion } from "./anchored-region.compose.js";
import { styleModules } from "./anchored-region.styles.modules.js";

/**
 * The component definition.
 *
 * @remarks
 * HTML Element: \<anchored-region\>
 *
 * @public
 */
export const anchoredRegionDefinition = composeAnchoredRegion(
    AdaptiveDesignSystem,
    {
        styleModules,
    }
);
