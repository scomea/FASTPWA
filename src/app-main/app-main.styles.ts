import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Styles
 * @public
 */
export const appMainStyles: ElementStyles =
    css`
        :host{
            height: 100%;
            width: 100%;
            color: var(--neutral-foreground-rest);
            --menu-width: 180px;
        }

        .provider{
            height: 100%;
            width: 100%;
        }

        .app-foreground{
            position: absolute;
            height: 100%;
            width: 100%;
            pointer-events: none;
        }

        .app-background{
            position: absolute;
            height: 100%;
            width: 100%;
            background: var(--neutral-layer-1);
        }

        .app-router{
            margin-left: calc(var(--menu-width) + 12px);
            position: absolute;
            height: 100%;
            width: calc(100% - calc(var(--menu-width) + 12px));
        }

        .app-menu{
            margin: 12px;
            width: var(--menu-width);
            pointer-events: auto;
        }

`