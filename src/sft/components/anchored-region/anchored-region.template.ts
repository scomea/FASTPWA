import { ElementViewTemplate, html, when } from "@microsoft/fast-element";
import { ComponentAnatomy, Interactivity } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTAnchoredElement } from "./anchored-region.js";

/**
 * @public
 */
export const AnchoredElementConditions = {
};

/**
 * @public
 */
export const AnchoredElementParts = {
};

/**
 * @public
 */
export const AnchoredElementAnatomy: ComponentAnatomy<typeof AnchoredElementConditions, typeof AnchoredElementParts> = {
    interactivity: Interactivity.never,
    conditions: AnchoredElementConditions,
    parts: AnchoredElementParts,
};

/**
 * Template for add-patient component.
 * @public
 */
export const template: (ds: DesignSystem) => ElementViewTemplate<SFTAnchoredElement> =
    () =>
    anchoredRegionTemplate();

/**
 * The template for the Anchored Element component.
 * @public
 */
export function anchoredRegionTemplate<
    T extends SFTAnchoredElement
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

