import {
  customElement,
  FASTElement,
  html,
  observable,
  ViewTemplate,
  when
} from "@microsoft/fast-element";
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { DefaultRouteRecognizer, Route } from '@microsoft/fast-router';
import { registerSW } from 'virtual:pwa-register';
import { appMainStyles } from "./app-main.styles";
import { MainRouterConfig } from './routes';
import { StyleSettingsService } from "../style-settings-panel/style-settings-service";
import '../styles/global.css';

/**
 * Generates a template for the app
 *
 * @public
 */
 export const appMainTemplate: ViewTemplate<AppMain> = html<AppMain>`
    <div
      class="provider"
    >
      <div
        class="app-background"
      >
      </div>
      <fast-router
          :config=${x=> x.config}
          class="app-router"
      >
      </fast-router>
      <div
        class="app-foreground"
      >
      ${when(
        x => x.loadMenu,
        html`
        <fluent-menu
          class="app-menu"
        >
        <fluent-menu-item
          @click="${x => Route.name.push(x, 'home-page')}"
        >
          Welcome
        </fluent-menu-item>
        <fluent-menu-item>
          Articles
        <fluent-menu>
          <fluent-menu-item
            @click="${x => {Route.name.push(x, 'article-page', {id:"one"});}}"
          >
            Article 1
          </fluent-menu-item>
          <fluent-menu-item
            @click="${x => Route.name.push(x, 'article-page', {id:"two"})}"
          >
            Article 2
          </fluent-menu-item>
          <fluent-menu-item
            @click="${x => Route.name.push(x, 'article-page', {id:"three"})}"
          >
            Article 3
          </fluent-menu-item>
        </fluent-menu>
      </fluent-menu-item>
    <fluent-menu-item
      @click="${x => Route.name.push(x, 'file-view-page')}"
    >
      File viewer
    </fluent-menu-item>
    <fluent-menu-item
      @click="${x => Route.name.push(x, 'about-page')}"
    >
      About
    </fluent-menu-item>
    <fluent-menu-item
      @click="${x => Route.name.push(x, 'settings-page')}"
    >
      Settings
    </fluent-menu-item>
  </fluent-menu class="app-menu">
        `
      )}
      </div>
    </div>
`;

@customElement({
  name: "app-main",
  template: appMainTemplate,
  styles: appMainStyles,
})
export class AppMain extends FASTElement {
  @inject(MainRouterConfig) config!: MainRouterConfig;
  @Container container!: Container;
  @observable provider!: any;

  @observable
  public loadMenu = false;

  constructor() {
    super();
    StyleSettingsService.setAppRoot(this);
    StyleSettingsService.applySavedSettings(StyleSettingsService.appRoot);
    registerSW({ immediate: true });
  };

  /**
   * @internal
   */
  public connectedCallback(): void {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );
    super.connectedCallback();
    // not sure why yet, but without delay loading the submenu doens't behave properly
    // adding this workaround for now
    this.loadMenu = true;
  }
}
