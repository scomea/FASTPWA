import {
    ElementViewTemplate,
    html,
    ref,
    SyntheticViewTemplate,
    when
} from "@microsoft/fast-element";
import type { StaticallyComposableHTML } from "@microsoft/fast-foundation";
import { ComponentAnatomy, Interactivity } from "@adaptive-web/adaptive-ui";
import { DesignSystem, MenuItemStatics } from "@adaptive-web/adaptive-web-components";
import {
    endSlotTemplate,
    StartEndOptions,
    startSlotTemplate,
    tagFor,
    TemplateElementDependency
} from "@microsoft/fast-foundation";
import { composeAnchoredRegion } from "../anchored-region/index.js";
import { MenuItemRole } from "./menu-item.js";
import type { SFTMenuItem } from "./menu-item.js";

/**
 * @public
 */
export const MenuItemConditions = {
    checked: "[aria-checked='true']",
};

/**
 * @public
 */
export const MenuItemParts = {
};

/**
 * @public
 */
export const MenuItemAnatomy: ComponentAnatomy<typeof MenuItemConditions, typeof MenuItemParts> = {
    interactivity: Interactivity.never,
    conditions: MenuItemConditions,
    parts: MenuItemParts,
};

/**
 * Options for the menu item
 * @public
 */
export type MenuItemOptions = StartEndOptions<SFTMenuItem> & {
    checkboxIndicator?: StaticallyComposableHTML<SFTMenuItem>;
    expandCollapseGlyph?: StaticallyComposableHTML<SFTMenuItem>;
    radioIndicator?: StaticallyComposableHTML<SFTMenuItem>;
    anchoredRegion: TemplateElementDependency;
};

export const template: (ds: DesignSystem) => ElementViewTemplate<SFTMenuItem> =
    (ds: DesignSystem) =>
    menuItemTemplate({
        checkboxIndicator: ds.statics.get(MenuItemStatics.checkbox),
        radioIndicator: ds.statics.get(MenuItemStatics.radio),
        expandCollapseGlyph: ds.statics.get(MenuItemStatics.submenu),
        anchoredRegion: composeAnchoredRegion(ds),
    });

/**
 * Generates a template for the {@link @microsoft/fast-foundation#(FASTMenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
function menuItemTemplate<T extends SFTMenuItem>(
    options: MenuItemOptions
): ElementViewTemplate<T> {
    const anchoredRegionTag = tagFor(options.anchoredRegion);
    return html<T>`
    <template
        aria-haspopup="${x => (x.hasSubmenu ? "menu" : void 0)}"
        aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
        aria-disabled="${x => x.disabled}"
        aria-expanded="${x => x.expanded}"
        @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
        @click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
        @mouseover="${(x, c) => x.handleMouseOver(c.event as MouseEvent)}"
        @mouseout="${(x, c) => x.handleMouseOut(c.event as MouseEvent)}"
    >
            ${when(
                x => x.role === MenuItemRole.menuitemcheckbox,
                html<SFTMenuItem>`
                    <div part="input-container" class="input-container">
                        <span part="checkbox" class="checkbox">
                            <slot name="checkbox-indicator">
                                ${options.checkboxIndicator ?? ""}
                            </slot>
                        </span>
                    </div>
                `
            )}
            ${when(
                x => x.role === MenuItemRole.menuitemradio,
                html<SFTMenuItem>`
                    <div part="input-container" class="input-container">
                        <span part="radio" class="radio">
                            <slot name="radio-indicator">
                                ${options.radioIndicator ?? ""}
                            </slot>
                        </span>
                    </div>
                `
            )}
        </div>
        ${startSlotTemplate(options)}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endSlotTemplate(options)}
        ${when(
            x => x.hasSubmenu,
            html<T>`
                <div
                    part="expand-collapse-glyph-container"
                    class="expand-collapse-glyph-container"
                >
                    <span part="expand-collapse" class="expand-collapse">
                        <slot name="expand-collapse-indicator">
                            ${options.expandCollapseGlyph ?? ""}
                        </slot>
                    </span>
                </div>
            `
        )}
        ${when(
            x => x.expanded,
            html<T>`
                <${anchoredRegionTag}
                    :anchorElement="${x => x}"
                    auto-update-mode="auto"
                    vertical-positioning-mode="dynamic"
                    vertical-default-position="bottom"
                    vertical-viewport-lock="true"
                    vertical-inset="true"
                    horizontal-positioning-mode="dynamic"
                    horizontal-default-position="end"
                    horizontal-viewport-lock="true"
                    class="submenu-region"
                    dir="${x => x.currentDirection}"
                    @loaded="${x => x.submenuLoaded()}"
                    ${ref("submenuRegion")}
                    part="submenu-region"
                >
                    <slot name="submenu"></slot>
                </${anchoredRegionTag}>
            `
        )}
    </template>
    `;
}
