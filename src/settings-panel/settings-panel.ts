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
              checked="${x => baseLayerLuminance.getValueFor(x) === StandardLuminance.DarkMode ? true : void 0 }"
              @change="${(x, c) => x.toggleLightMode(c.event)}"
            >Dark Mode</fluent-checkbox>

            <h4 id="layer-corner-label">Layer corner radius</h4>
            <fluent-slider
              aria-labelledby="layer-corner-label"
              value="${x => layerCornerRadius.getValueFor(x)}"
              @change="${(x, c) => x.updateLayerCornerRadius(c.event)}"
              min="0"
              max="20"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="20">
              20
              </fluent-slider-label>
              <fluent-slider-label position="${x => layerCornerRadius.getValueFor(x)}">
                ${x => layerCornerRadius.getValueFor(x)}
              </fluent-slider-label>
            </fluent-slider>

            <h4 id="control-corner-label">Control corner radius</h4>
            <fluent-slider
              aria-labelledby="control-corner-label"
              value="${x => controlCornerRadius.getValueFor(x)}"
              @change="${(x, c) => x.updateControlCornerRadius(c.event)}"
              min="0"
              max="20"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="20">
              20
              </fluent-slider-label>
              <fluent-slider-label position="${x => controlCornerRadius.getValueFor(x)}">
                ${x =>controlCornerRadius.getValueFor(x)}
              </fluent-slider-label>
            </fluent-slider>

            <h4 id="density-label">Density</h4>
            <fluent-slider
              aria-labelledby="density-label"
              value=${x => density.getValueFor(x)}
              @change="${(x, c) => x.updateDensity(c.event)}"
              min="0"
              max="10"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="20">
              10
              </fluent-slider-label>
              <fluent-slider-label position="${x => density.getValueFor(x)}">
                ${x => density.getValueFor(x)}
              </fluent-slider-label>
            </fluent-slider>

            <h4 id="stroke-width-label">Stroke width</h4>
            <fluent-slider
              aria-labelledby="stroke-width-label"
              value="${ x => strokeWidth.getValueFor(x)}"
              @change="${(x, c) => x.updateStrokeWidth(c.event)}"
              min="0"
              max="4"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="4">
              4
              </fluent-slider-label>
              <fluent-slider-label position="${x => strokeWidth.getValueFor(x)}">
                ${x => strokeWidth.getValueFor(x)}
              </fluent-slider-label>
            </fluent-slider>
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
