import type { ComposableStyles, FASTElementDefinition } from "@microsoft/fast-element";
import { componentBaseStyles } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTTooltip } from "./tooltip.js";
import { aestheticStyles, templateStyles } from "./tooltip.styles.js";
import { TooltipAnatomy, template } from "./tooltip.template.js";
import { ComposeOptions } from "../../utilities/compose.js";

const defaultStyles = [componentBaseStyles, templateStyles, aestheticStyles];

/**
 * @public
 */
export function composeTooltip(
    ds: DesignSystem,
    options?: ComposeOptions<SFTTooltip>
): FASTElementDefinition {
    const styles: ComposableStyles[] = DesignSystem.assembleStyles(defaultStyles, TooltipAnatomy.interactivity, options);

    return SFTTooltip.compose({
        name: `${ds.prefix}-sft-tooltip`,
        template: options?.template?.(ds) ?? template(ds),
        styles,
        registry: ds.registry,
        elementOptions: options?.elementOptions,
        shadowOptions: options?.shadowOptions
    });
}
