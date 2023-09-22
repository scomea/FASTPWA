import {
    customElement,
    css,
    ElementViewTemplate,
    FASTElement,
    html,
} from "@microsoft/fast-element";
import type { SFTMenuItem } from "../menu-item.js";

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
    name: "menu-item-demo",
    template: menuItemDemoTemplate(),
    styles
})
export class MenuItemDemo extends FASTElement {

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
export function menuItemDemoTemplate<T extends MenuItemDemo>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template style="height:100%; width:100%;">
            menu item demo

            <adaptive-sft-menu-item
                    anchor="anchor"
                    visible
                >
                    BOO!
            </adaptive-sft-menu-item>
        </template>
    `;
}
