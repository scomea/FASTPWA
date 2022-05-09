import { html, ViewTemplate } from "@microsoft/fast-element";
import { AppIndex } from "./app-index";

/**
 * Generates a template for the app index component
 *
 * @public
 */
 export const appIndexTemplate: ViewTemplate<AppIndex> = html<AppIndex>`
        <template>
            <slot></slot>
        </template>
    `;
