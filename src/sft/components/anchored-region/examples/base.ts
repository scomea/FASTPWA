import {
    customElement,
    css,
    ElementViewTemplate,
    FASTElement,
    html,
} from "@microsoft/fast-element";
import type { SFTAnchoredRegion } from "../anchored-region.js";

export const styles = css`
    :host {
        display: block;
    }
`;

/**
 *
 *
 * @public
 */
@customElement({
    name: "anchored-region-demo",
    template: anchoredRegionDemoTemplate(),
    styles
})
export class AnchoredRegionDemo extends FASTElement {

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }
}

/**
 * The template
 * @public
 */
export function anchoredRegionDemoTemplate<T extends AnchoredRegionDemo>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template style="height:100%; width:100%;">
            <div id="pane" style="height:100%; width:100%;">
                Base anchored region demo
            </div>
        </template>
    `;
}
