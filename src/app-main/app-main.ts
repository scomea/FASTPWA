import {
  customElement,
  DOM,
  FASTElement,
  html,
  observable,
  ref,
  ViewTemplate,
  when
} from "@microsoft/fast-element";
import { AnchoredRegion, Container, inject, Registration } from '@microsoft/fast-foundation';
import { DefaultRouteRecognizer, Route } from '@microsoft/fast-router';
import { registerSW } from 'virtual:pwa-register';
import { appMainStyles } from "./app-main.styles";
import { MainRouterConfig } from './routes';
import { StyleSettingsService } from "../components/style-settings-panel/style-settings-service";
import { AppBar } from "../components/app-bar/app-bar";
import '../styles/global.css';

AppBar;

/**
 * Generates a template for the app
 *
 * @public
 */
 export const appMainTemplate: ViewTemplate<AppMain> = html<AppMain>`
      <div
        class="background-layer"
      >
      </div>
      <div
        class="main-layer"
      >
        <app-bar>
          <fluent-button
            class="menu-button"
            ${ref("menuButton")}
            @click="${(x, c) => x.menuButtonClick(c.event as PointerEvent)}"
          >Menu</fluent-button>
        </app-bar>
        <fast-router
          :config=${x=> x.config}
          class="app-router"
        >
        </fast-router>
      </div>
      <div
        class="foreground-layer"
      >
      ${when(
        x => x.loadMenu,
        html<AppMain>`
        <fluent-anchored-region
          class="menu-region"
          ${ref("menuRegion")}
          id="menu-region"
          fixed-placement="true"
          vertical-positioning-mode="locktodefault"
          vertical-default-position="bottom"
          vertical-scaling="fill"
          horizontal-positioning-mode="locktodefault"
          horizontal-default-position="left"
          horizontal-scaling="anchor"
          horizontal-inset="true"
          auto-update-mode="auto"
        >
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
    </fluent-menu>
    </fluent-anchored-region>
        `
      )}
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
  public loadMenu: boolean = false;

  @observable
  public menuButton: HTMLElement | undefined;

  @observable
  public menuRegion: AnchoredRegion | undefined;

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
  }

  public menuButtonClick = (e: PointerEvent): void => {
    this.loadMenu = !this.loadMenu;
    if (this.loadMenu){
      DOM.queueUpdate(this.setRegionProps);
    }
  }

  private setRegionProps = (): void => {
    if (!this.menuRegion || !this.menuButton){
      return;
    }

    this.menuRegion.viewportElement = this;
    this.menuRegion.anchorElement = this.menuButton;
  }
}
