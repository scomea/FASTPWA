import {
    customElement,
    css,
    ElementViewTemplate,
    FASTElement,
    html,
} from "@microsoft/fast-element";
import type { SFTTooltip } from "../tooltip.js";

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
    name: "tooltip-demo",
    template: tooltipDemoTemplate(),
    styles
})
export class TooltipDemo extends FASTElement {

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
export function tooltipDemoTemplate<T extends TooltipDemo>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template style="height:100%; width:100%;">
            <div id="pane" style="height:100%; width:100%;">
                Base tooltip demo
                <adaptive-button
                    id="anchor"
                >
                    hover me
                </adaptive-button>
                <adaptive-sft-tooltip
                    anchor="anchor"
                    visible
                >
                    BOO!
                </adaptive-sft-tooltip>
            </div>
        </template>
    `;
}

// visible="${x => (x.visible ? "true" : undefined)}"
// track-pointer="${x => (x.trackPointer ? "true" : undefined)}"
// delay="${x => x.delay}"
// position="${x => x.position}"
// auto-update-mode="${x => x.autoUpdateMode}"
// vertical-viewport-lock="${x => x.verticalViewportLock}"
// horizontal-viewport-lock="${x => x.horizontalViewportLock}"
