import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { homeScreenStyles } from "./home-screen.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";

/**
 * Generates a template
 *
 * @public
 */
 export const homeScreenTemplate: ViewTemplate<HomeScreen> = html<HomeScreen>`
  <div>
      <h1>Welcome!</h1>
      <p>
      <fluent-button
        @click=${x => Route.name.push(x, 'settings-panel')}
      >
        Settings
      </fluent-button>
  </div>
`;

@customElement({
  name: "home-screen",
  template: homeScreenTemplate,
  styles: homeScreenStyles,
})
export class HomeScreen extends FASTElement {
}
