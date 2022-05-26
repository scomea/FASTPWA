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
import {
  baseLayerLuminance,
  controlCornerRadius,
  density,
  layerCornerRadius,
  StandardLuminance,
  strokeWidth
} from "@fluentui/web-components";
import { appMainStyles } from "./app-main.styles";
import { MainRouterConfig } from './routes';

import {} from "@microsoft/fast-element";

/**
 * Generates a template for the app
 *
 * @public
 */
 export const appMainTemplate: ViewTemplate<AppMain> = html<AppMain>`
    <fluent-design-system-provider
      class="provider"
      use-defaults
      ${ref('provider')}
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

  constructor() {
    super();

    const darkModeSetting: string | null = localStorage.getItem("darkMode");
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        document.body,
          "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }

    const controlCornerRadiusSetting: string | null = localStorage.getItem("controlCornerRadius");
    if (controlCornerRadiusSetting){
      controlCornerRadius.setValueFor(
        document.body,
        Number.parseInt(controlCornerRadiusSetting)
      );
    }

    const layerCornerRadiusSetting: string | null = localStorage.getItem("layerCornerRadius");
    if (layerCornerRadiusSetting){
      layerCornerRadius.setValueFor(
        document.body,
        Number.parseInt(layerCornerRadiusSetting)
      );
    }

    const densitySetting: string | null = localStorage.getItem("density");
    if (densitySetting){
      density.setValueFor(
        document.body,
        Number.parseInt(densitySetting)
      );
    }

    const strokeWidthSetting: string | null = localStorage.getItem("strokeWidth");
    if (strokeWidthSetting){
      strokeWidth.setValueFor(
        document.body,
        Number.parseInt(strokeWidthSetting)
      );
    }
  };

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
