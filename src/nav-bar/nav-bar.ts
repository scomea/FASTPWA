import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { navBarStyles } from "./nav-bar.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";

/**
 * Generates a template
 *
 * @public
 */
 export const navBarTemplate: ViewTemplate<NavBar> = html<NavBar>`
    <div>
      <fluent-menu>
        <fluent-menu-item
          @click=${x => Route.name.push(x, 'home-screen')}
        >
          Welcome
        </fluent-menu-item>
        <fluent-menu-item>
          Articles
        <fluent-menu>
          <fluent-menu-item
            @click=${x => {Route.name.push(x, 'article', {id:"one"});}}
          >
            Article 1
          </fluent-menu-item>
          <fluent-menu-item
            @click=${x => Route.name.push(x, 'article', {id:"two"})}
          >
            Article 2
          </fluent-menu-item>
          <fluent-menu-item
            @click=${x => Route.name.push(x, 'article', {id:"three"})}
          >
            Article 3
          </fluent-menu-item>
        </fluent-menu>
        </fluent-menu-item>
        <fluent-menu-item
          @click=${x => Route.name.push(x, 'about-screen')}
        >
          About
        </fluent-menu-item>
      <fluent-menu-item
        @click=${x => Route.name.push(x, 'settings-panel')}
      >
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
