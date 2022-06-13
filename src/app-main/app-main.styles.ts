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
            display: block;
            color: var(--neutral-foreground-rest);
            --app-bar-height: 40px;
            overflow: hidden;
        }

        .foreground-layer{
            height: 100%;
            width: 100%;
            position: absolute;
            pointer-events: none;
        }

        .background-layer{
            height: 100%;
            width: 100%;
            position: absolute;
            background: var(--neutral-layer-1);
        }

        .main-layer{
            height: 100%;
            width: 100%;
            position: absolute;
            overflow: hidden;
            display: grid;
            grid-template-rows: auto 1fr;
            grid-template-columns: 1fr;
        }

        .app-router{
            overflow: auto;
            grid-row: 2;
            grid-column: 1;
        }

        .app-menu{
            pointer-events: auto;
        }

        app-bar {
            height: var(--app-bar-height);
            grid-row: 1;
            grid-column: 1;
        }

        .menu-button {
            width: 120px;
        }

        .menu-region {
            z-index: 10;
            overflow: visible;
            min-height: 10px;
            min-width: 10px;
        }

`