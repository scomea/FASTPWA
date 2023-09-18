import type { ComposableStyles, FASTElementDefinition } from "@microsoft/fast-element";
import { componentBaseStyles } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTAnchoredRegion } from "./anchored-region.js";
import { aestheticStyles, templateStyles } from "./anchored-region.styles.js";
import { AnchoredRegionAnatomy, template } from "./anchored-region.template.js";
import { ComposeOptions } from "../../utilities/compose.js";

const defaultStyles = [componentBaseStyles, templateStyles, aestheticStyles];

/**
 * @public
 */
export function composeAnchoredRegion(
    ds: DesignSystem,
    options?: ComposeOptions<SFTAnchoredRegion>
): FASTElementDefinition {
    const styles: ComposableStyles[] = DesignSystem.assembleStyles(defaultStyles, AnchoredRegionAnatomy.interactivity, options);

    return SFTAnchoredRegion.compose({
        name: `${ds.prefix}-anchored-region`,
        template: options?.template?.(ds) ?? template(ds),
        styles,
        registry: ds.registry,
        elementOptions: options?.elementOptions,
        shadowOptions: options?.shadowOptions
    });
}
