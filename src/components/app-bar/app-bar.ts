import {
  attr,
  customElement,
  FASTElement,
  observable,
  ref
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { appBarStyles } from "./app-bar.styles";


/**
 * Generates a template
 *
 * @public
 */
 export const appBarTemplate: ViewTemplate<AppBar> = html<AppBar>`
  <fluent-toolbar>
    <slot></slot>
  </fluent-toolbard>
`;

@customElement({
  name: "app-bar",
  template: appBarTemplate,
  styles: appBarStyles,
})
export class AppBar extends FASTElement {
}