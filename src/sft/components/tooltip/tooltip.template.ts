import { ElementViewTemplate, html, ref, when } from "@microsoft/fast-element";
import { ComponentAnatomy, Interactivity } from "@adaptive-web/adaptive-ui";
import { tagFor, TemplateElementDependency } from "@microsoft/fast-foundation";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { composeAnchoredRegion } from "../anchored-region/index.js";
import type { SFTTooltip } from "./tooltip.js";

/**
 * @public
 */
export const TooltipConditions = {
};

/**
 * @public
 */
export const TooltipParts = {
};

/**
 * @public
 */
export const TooltipAnatomy: ComponentAnatomy<typeof TooltipConditions, typeof TooltipParts> = {
    interactivity: Interactivity.never,
    conditions: TooltipConditions,
    parts: TooltipParts,
};

/**
 * Options for the tooltip.
 * @public
 */
export type TooltipOptions = {
    anchoredRegion: TemplateElementDependency;
};

export const template: (ds: DesignSystem) => ElementViewTemplate<SFTTooltip> =
    (ds: DesignSystem) =>
    tooltipTemplate({
        anchoredRegion: composeAnchoredRegion(ds),
    });

/**
 * Creates a template for the tooltip component using the provided prefix.
 * @public
 */
function tooltipTemplate<T extends SFTTooltip>(
    options: TooltipOptions
): ElementViewTemplate<T> {
    const sftAnchoredRegionTag: string = tagFor(options.anchoredRegion);
    // TODO: why do i need to hardcode this????
    console.debug(sftAnchoredRegionTag);
    const toReturn: any = html<T>`
        <template>
            ${when(
                x => x.tooltipVisible,
                html<T>`
                    <adaptive-sft-anchored-region
                        auto-update-mode="${x => x.autoUpdateMode}"
                        :virtualAnchorX = "${x => x.virtualAnchorX}"
                        :virtualAnchorY = "${x => x.virtualAnchorY}"
                        use-virtual-anchor="${x => x.isPointerTracking}"
                        fixed-placement="true"
                        vertical-positioning-mode="${x => x.verticalPositioningMode}"
                        vertical-default-position="${x =>
                            x.isPointerTracking ? "top" : x.verticalDefaultPosition}"
                        vertical-inset="${x => x.verticalInset}"
                        vertical-scaling="${x => x.verticalScaling}"
                        horizontal-positioning-mode="${x => x.horizontalPositioningMode}"
                        horizontal-default-position="${x =>
                            x.isPointerTracking ? "end" : x.horizontalDefaultPosition}"
                        horizontal-scaling="${x => x.horizontalScaling}"
                        horizontal-inset="${x => x.horizontalInset}"
                        vertical-viewport-lock="${x => x.horizontalViewportLock}"
                        horizontal-viewport-lock="${x => x.verticalViewportLock}"
                        dir="${x => x.currentDirection}"
                        ${ref("region")}
                    >
                        <div class="tooltip" part="tooltip" role="tooltip">
                            <slot></slot>
                        </div>
                    </adaptive-sft-anchored-region>
                `
            )}
        </template>
    `;
    console.debug(toReturn);
    return toReturn;
}
