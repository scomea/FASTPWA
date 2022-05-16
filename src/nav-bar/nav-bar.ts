import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { navBarStyles } from "./nav-bar.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const navBarTemplate: ViewTemplate<NavBar> = html<NavBar>`
    <div>
      <fluent-menu>
        <fluent-menu-item>
          Welcome!
        </fluent-menu-item>
        <fluent-menu-item>
          Articles
        <fluent-menu>
          <fluent-menu-item>Article 1</fluent-menu-item>
          <fluent-menu-item>Article 2</fluent-menu-item>
          <fluent-menu-item>Article 3</fluent-menu-item>
        </fluent-menu>
        </fluent-menu-item>
        <fluent-menu-item>
          Settings
        </fluent-menu-item>
      </fluent-menu>
</div>
`;

@customElement({
  name: "nav-bar",
  template: navBarTemplate,
  styles: navBarStyles,
})
export class NavBar extends FASTElement {
}
