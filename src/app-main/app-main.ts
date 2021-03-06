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
        ${when(
          x => x.showMenu,
          html<AppMain>`
          <fluent-anchored-region
            class="menu-region"
            ${ref("menuRegion")}
            id="menu-region"
            vertical-positioning-mode="locktodefault"
            vertical-default-position="bottom"
            vertical-scaling="content"
            horizontal-positioning-mode="locktodefault"
            horizontal-default-position="left"
            horizontal-scaling="anchor"
            horizontal-inset="true"
            auto-update-mode="auto"
            @loaded="${(x, c) => x.menuLoaded(c.event as CustomEvent)}"
          >
            <fluent-menu
              class="app-menu"
            >
            <fluent-menu-item
              ${ref("homeMenuItem")}
              @change="${x => {
                Route.name.push(x, 'home-page');
                x.showMenu = false;
              }}"
            >
              Welcome
            </fluent-menu-item>
            <fluent-menu-item>
              Articles
            <fluent-menu>
              <fluent-menu-item
                @change="${x => {
                  Route.name.push(x, 'article-page', {id:"one"});
                  x.showMenu = false;
                }}"
              >
                Article 1
              </fluent-menu-item>
              <fluent-menu-item
                @change="${x => {
                  Route.name.push(x, 'article-page', {id:"two"});
                  x.showMenu = false;
                }}"
              >
                Article 2
              </fluent-menu-item>
              <fluent-menu-item
                @change="${x => {
                  Route.name.push(x, 'article-page', {id:"three"});
                  x.showMenu = false;
              }}"
              >
                Article 3
              </fluent-menu-item>
            </fluent-menu>
          </fluent-menu-item>
        <fluent-menu-item
          @change="${x => {
            Route.name.push(x, 'file-view-page');
            x.showMenu = false;
        }}"
        >
          File viewer
        </fluent-menu-item>
        <fluent-menu-item
          @change="${x => {
            Route.name.push(x, 'about-page');
            x.showMenu = false;
          }}"
        >
          About
        </fluent-menu-item>
        <fluent-menu-item
          @change="${x => {
            Route.name.push(x, 'settings-page');
            x.showMenu = false;
          }}"
        >
          Settings
        </fluent-menu-item>
      </fluent-menu>
      </fluent-anchored-region>
          `
    )}
        <fast-router
          :config=${x=> x.config}
          class="app-router"
        >
        </fast-router>
      </div>
      <div
        class="foreground-layer"
      >
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
  public showMenu: boolean = false;
  public showMenuChanged(prev: boolean, next: boolean): void {
    if (prev === next){
      return;
    }
    if (next){
      DOM.queueUpdate(() => {
        this.setRegionProps();
      });
    } else {
      this.removeEventListener("focusout", this.handleMenuBlur)
    }
  }

  public menuButton: HTMLElement | undefined;
  public menuRegion: AnchoredRegion | undefined;
  public homeMenuItem: HTMLElement | undefined;

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
    this.showMenu = !this.showMenu;
  }

  public menuLoaded = (e: CustomEvent): void => {
    this.homeMenuItem?.focus();
  }

  public handleMenuBlur = (e: FocusEvent): void => {
    if (!e.relatedTarget || (!this.menuRegion?.contains(e.relatedTarget as Element) && e.relatedTarget !== this.menuButton)){
      this.showMenu = false;
    }
  }

  private setRegionProps = (): void => {
    if (!this.menuRegion || !this.menuButton){
      //todo: simplify, likely by fixing anchored region to recognize shadow dom id's
      DOM.queueUpdate(() => {
        this.setRegionProps();
      });
      return;
    }

    this.menuRegion.viewportElement = this;
    this.menuRegion.anchorElement = this.menuButton;
    this.menuRegion.addEventListener("focusout", this.handleMenuBlur)
  }
}
