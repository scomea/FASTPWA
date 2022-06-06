import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { homeScreenStyles } from "./home-screen.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const homeScreenTemplate: ViewTemplate<HomeScreen> = html<HomeScreen>`
  <div
    class="container"
  >
      <img class="image" src='assets/images/beach.jpg'>
      <h1>Welcome!</h1>
      <p>
      This "app" is an informal effort to create a sample
      <fluent-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST</fluent-anchor>
      based PWA that could be used as a starting template, reference "app" and test plaform for UX explorations.
      <p>
      We use the FAST router for navigation, FAST based Fluent web-components and design system for the UI.
      <p>
  </div>
`;

@customElement({
  name: "home-screen",
  template: homeScreenTemplate,
  styles: homeScreenStyles,
})
export class HomeScreen extends FASTElement {
}
