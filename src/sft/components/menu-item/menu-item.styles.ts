import {
    focusStrokeOuter,
    focusStrokeThickness,
    neutralFillStealthActive,
    neutralStrokeReadableRest,
} from "@adaptive-web/adaptive-ui/reference";
import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * Basic layout styling associated with the anatomy of the template.
 * @public
 */
export const templateStyles: ElementStyles = css`
       :host([hidden]) {
        display: none !important;
    }

    :host {
        --icon-col: minmax(42px, auto);
        align-items: center;
        background: ${neutralFillStealthActive};
        box-sizing: border-box;
        color: ${neutralStrokeReadableRest};
        cursor: pointer;
        display: flex;
        fill: currentcolor;
        height: calc(var(--height-number) * 1px);
        justify-items: start;
        margin: 0 calc(var(--design-unit) * 1px);
        outline: none;
        overflow: visible;
        padding: 0;
        white-space: nowrap;
    }

    :host(:hover) {
        background: var(--neutral-fill-stealth-hover);
        color: var(--neutral-foreground-rest);
    }

    :host(:active) {
        background: var(--neutral-fill-stealth-active);
    }

    :host(:focus-visible) {
        border-color: var(--focus-stroke-outer);
        background: var(--neutral-fill-stealth-focus);
        color: var(--neutral-foreground-rest);
    }

    :host([role="menuitem"]) .content {
        padding: 0 10px;
    }

    .content {
        justify-self: start;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    :host([aria-checked="true"]),
    :host(.expanded) {
        background: var(--neutral-fill-rest);
        color: var(--neutral-foreground-rest);
    }

    :host([disabled]) {
        cursor: var(--disabled-cursor);
        opacity: var(--disabled-opacity);
    }

    :host([disabled]:hover) {
        color: var(--neutral-foreground-rest);
        fill: currentcolor;
        background: var(--neutral-fill-stealth-rest);
    }

    :host([disabled]:hover) ::slotted([slot="start"]),
    :host([disabled]:hover) ::slotted([slot="end"]),
    :host([disabled]:hover)::slotted(svg) {
        fill: var(--neutral-foreground-rest);
    }

    .expand-collapse-glyph,
    ::slotted(svg) {
        width: 16px;
        height: 16px;
    }

    ::slotted(svg) {
        fill: currentcolor;
    }

    ::slotted([slot="start"]),
    ::slotted([slot="end"]) {
        display: flex;
        justify-content: center;
    }

    :host(:hover) ::slotted([slot="start"]),
    :host(:hover) ::slotted([slot="end"]),
    :host(:hover)::slotted(svg),
    :host(:active) ::slotted([slot="start"]),
    :host(:active) ::slotted([slot="end"]),
    :host(:active)::slotted(svg) {
        fill: var(--neutral-foreground-rest);
    }

    .input-container,
    .expand-collapse-glyph-container {
        display: none;
    }

    .expand-collapse-glyph-container {
        margin-inline-start: auto;
    }

    :host([aria-haspopup="menu"]) .expand-collapse-glyph-container,
    :host([role="menuitemcheckbox"]) .input-container,
    :host([role="menuitemradio"]) .input-container {
        display: grid;
        margin-inline-end: 10px;
    }

    .expand-collapse,
    .checkbox,
    .radio {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        outline: none;
        margin-inline-start: 10px;
    }

    .checkbox,
    .radio {
        border: calc(var(--stroke-width) * 1px) solid var(--neutral-foreground-rest);
    }

    :host([aria-checked="true"]) .checkbox,
    :host([aria-checked="true"]) .radio {
        background: var(--accent-fill-rest);
        border-color: var(--accent-fill-rest);
    }

    .checkbox {
        border-radius: calc(var(--control-corner-radius) * 1px);
    }

    .radio {
        border-radius: 999px;
    }

    .checkbox-indicator,
    .radio-indicator,
    .expand-collapse-indicator,
    ::slotted([slot="checkbox-indicator"]),
    ::slotted([slot="radio-indicator"]),
    ::slotted([slot="expand-collapse-indicator"]) {
        display: none;
    }

    ::slotted([slot="end"]:not(svg)) {
        color: var(--neutral-foreground-hint);
        margin-inline-end: 10px;
    }

    :host([aria-checked="true"]) .checkbox-indicator,
    :host([aria-checked="true"]) ::slotted([slot="checkbox-indicator"]) {
        display: block;
        fill: var(--foreground-on-accent-rest);
        height: 100%;
        pointer-events: none;
        width: 100%;
    }

    :host([aria-checked="true"]) .radio-indicator {
        background: var(--foreground-on-accent-rest);
        display: block;
        pointer-events: none;
        height: 50%;
        width: 50%;
    }
`;

/**
 * Visual styles including Adaptive UI tokens.
 * @public
 */
export const aestheticStyles: ElementStyles = css`
`;