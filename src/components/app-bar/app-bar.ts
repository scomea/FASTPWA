import {
  attr,
  customElement,
  FASTElement,
  observable,
  ref
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { appBarStyles } from "./app-bar.styles.js";


/**
 * Generates a template
 *
 * @public
 */
 export const appBarTemplate: ViewTemplate<AppBar> = html<AppBar>`
  <adaptive-toolbar>
    <slot></slot>
  </adaptive-toolbard>
`;

@customElement({
  name: "app-bar",
  template: appBarTemplate,
  styles: appBarStyles,
})
export class AppBar extends FASTElement {
}