import type { ComposableStyles, FASTElementDefinition } from "@microsoft/fast-element";
import { componentBaseStyles } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTMenuItem } from "./menu-item.js";
import { aestheticStyles, templateStyles } from "./menu-item.styles.js";
import { MenuItemAnatomy, template } from "./menu-item.template.js";
import { ComposeOptions } from "../../utilities/compose.js";

const defaultStyles = [componentBaseStyles, templateStyles, aestheticStyles];

/**
 * @public
 */
export function composeMenuItem(
    ds: DesignSystem,
    options?: ComposeOptions<SFTMenuItem>
): FASTElementDefinition {
    const styles: ComposableStyles[] = DesignSystem.assembleStyles(defaultStyles, MenuItemAnatomy.interactivity, options);

    return SFTMenuItem.compose({
        name: `${ds.prefix}-sft-menu-item`,
        template: options?.template?.(ds) ?? template(ds),
        styles,
        registry: ds.registry,
        elementOptions: options?.elementOptions,
        shadowOptions: options?.shadowOptions
    });
}
