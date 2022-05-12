import {
  customElement,
  FASTElement,
  html,
  observable,
  ref,
  ViewTemplate
} from "@microsoft/fast-element";
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { DefaultRouteRecognizer } from '@microsoft/fast-router';
import { registerSW } from 'virtual:pwa-register';
import { appMainStyles } from "./app-main.styles";
import { MainRouterConfig } from './routes';

import {} from "@microsoft/fast-element";

/**
 * Generates a template for the app
 *
 * @public
 */
 export const appMainTemplate: ViewTemplate<AppMain> = html<AppMain>`
    <fluent-design-system-provider use-defaults ${ref('provider')}>
        <div
            class="app-foreground"
        >
        </div>
        <fast-router
            :config=${x=> x.config}
            class="app-router"
        >
        </fast-router>
        <div
            class="app-background"
        >
        </div>
    </fluent-design-system-provider>
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


  /**
   * @internal
   */
  public connectedCallback(): void {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );
    super.connectedCallback();
    registerSW({ immediate: true });
  }

  providerChanged() {
    // this.provider.registerCSSCustomProperty(neutralLayerL1Behavior);

    // this.provider.style.setProperty(
    //     "background-color",
    //     `var(--${neutralLayerL1Behavior.name})`
    // );

    // this.provider.backgroundColor = (neutralLayerL1Behavior.value as any)(
    //     this.provider.designSystem
    // );

    // this.provider.baseLayerLuminance = 1;
  }
}
