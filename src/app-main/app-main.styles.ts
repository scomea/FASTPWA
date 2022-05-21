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
            background: lightblue;
        }

        .app-router{
            position: absolute;
            height: 100%;
            width: 100%;
        }

`