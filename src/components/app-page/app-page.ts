import {
  customElement,
  FASTElement,
  html,
  ViewTemplate
} from "@microsoft/fast-element";
import { appPageStyles } from "./app-page.styles.js";

/**
 * Generates a template
 *
 * @public
 */
 export const appPageTemplate: ViewTemplate<AppPage> = html<AppPage>`
  <template>
    <slot></slot>
  </template>
`;

@customElement({
  name: "app-page",
  template: appPageTemplate,
  styles: appPageStyles,
})

export class AppPage extends FASTElement {
}
