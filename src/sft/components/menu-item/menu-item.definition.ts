import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { composeMenuItem } from "./menu-item.compose.js";
import { styleModules } from "./menu-item.styles.modules.js";

/**
 * The component definition.
 * @public
 */
export const menuItemDefinition = composeMenuItem(
    AdaptiveDesignSystem,
    {
        styleModules,
    }
);
