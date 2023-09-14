import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { homePageStyles } from "./home-page.styles.js";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const homePageTemplate: ViewTemplate<HomePage> = html<HomePage>`
 <app-page>
      <img class="image" src='assets/images/beach.jpg'>
      <h1>Welcome!</h1>
      <p>
      This "app" is an informal effort to create a sample
      <adaptive-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST</adaptive-anchor>
      based PWA that could be used as a starting template, reference "app" and test plaform for UX explorations.
      <p>
      We use the FAST router for navigation, FAST based adaptive web-components and design system for the UI.
      <p>
</app-page>
`;

@customElement({
  name: "home-page",
  template: homePageTemplate,
  styles: homePageStyles,
})
export class HomePage extends FASTElement {
}
