import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import {
    baseLayerLuminance,
    controlCornerRadius,
    density,
    layerCornerRadius,
    StandardLuminance,
    strokeWidth
} from "@fluentui/web-components";
import { Checkbox, Slider } from "@microsoft/fast-foundation";
import { settingsPanelStyles } from "./settings-panel.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const settingsPanelTemplate: ViewTemplate<SettingsPanel> = html<SettingsPanel>`
        <div
          class="container"
        >
            <h1>Settings</h1>

            <fluent-checkbox
              @change="${(x, c) => x.toggleLightMode(c.event)}"
            >Dark Mode</fluent-checkbox>

            <h4>Layer corner radius</h4>
            <fluent-slider
              value=${x => layerCornerRadius.getValueFor(x)}
              @change="${(x, c) => x.updateLayerCornerRadius(c.event)}"
              min="0"
              max="20"
            ></fluent-slider>

            <h4>Control corner radius</h4>
            <fluent-slider
              value=${x => controlCornerRadius.getValueFor(x)}
              @change="${(x, c) => x.updateControlCornerRadius(c.event)}"
              min="0"
              max="20"
            ></fluent-slider>

            <h4>Density</h4>
            <fluent-slider
              value=${x => density.getValueFor(x)}
              @change="${(x, c) => x.updateDensity(c.event)}"
              min="0"
              max="10"
            ></fluent-slider>

            <h4>Stroke width</h4>
            <fluent-slider
              value=${ x => strokeWidth.getValueFor(x)}
              @change="${(x, c) => x.updateStrokeWidth(c.event)}"
              min="1"
              max="4"
            ></fluent-slider>
        </div>
`;

@customElement({
  name: "settings-panel",
  template: settingsPanelTemplate,
  styles: settingsPanelStyles,
})
export class SettingsPanel extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  public toggleLightMode(e: Event): void {
    baseLayerLuminance.setValueFor(
      document.body,
      (e.target as Checkbox).checked ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );
  };

  public updateControlCornerRadius(e: Event): void {
    controlCornerRadius.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
  };

  public updateLayerCornerRadius(e: Event): void {
    layerCornerRadius.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
  };

  public updateDensity(e: Event): void {
    density.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
  };

  public updateStrokeWidth(e: Event): void {
    strokeWidth.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
  };
}
