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
        <div>
            Home
        </div>
`;

@customElement({
  name: "home-screen",
  template: homeScreenTemplate,
  styles: homeScreenStyles,
})
export class HomeScreen extends FASTElement {
}
