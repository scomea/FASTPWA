import { ElementViewTemplate, html, when } from "@microsoft/fast-element";
import { ComponentAnatomy, Interactivity } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTAnchoredRegion } from "./anchored-region.js";

/**
 * @public
 */
export const AnchoredRegionConditions = {
};

/**
 * @public
 */
export const AnchoredRegionParts = {
};

/**
 * @public
 */
export const AnchoredRegionAnatomy: ComponentAnatomy<typeof AnchoredRegionConditions, typeof AnchoredRegionParts> = {
    interactivity: Interactivity.never,
    conditions: AnchoredRegionConditions,
    parts: AnchoredRegionParts,
};

/**
 * Template for Anchored Region component.
 * @public
 */
export const template: (ds: DesignSystem) => ElementViewTemplate<SFTAnchoredRegion> =
    () =>
    anchoredRegionTemplate();

/**
 * The template for the Anchored Region component.
 * @public
 */
export function anchoredRegionTemplate<
    T extends SFTAnchoredRegion
>(): ElementViewTemplate<T> {
    return html<T>`
        <template data-loaded="${x => (x.initialLayoutComplete ? "loaded" : "")}">
            ${when(
                x => x.initialLayoutComplete,
                html<T>`
                    <slot></slot>
                `
            )}
        </template>
    `;
}

