import {
  customElement,
  FASTElement,
  observable,
} from "@microsoft/fast-element";
import {
    baseLayerLuminance,
    controlCornerRadius,
    density,
    layerCornerRadius,
    StandardLuminance,
    strokeWidth,
    typeRampBaseFontSize,
    typeRampBaseLineHeight,
    typeRampMinus2FontSize,
    typeRampMinus2LineHeight,
    typeRampMinus1FontSize,
    typeRampMinus1LineHeight,
    typeRampPlus1FontSize,
    typeRampPlus1LineHeight,
    typeRampPlus2FontSize,
    typeRampPlus2LineHeight,
    typeRampPlus3FontSize,
    typeRampPlus3LineHeight,
    typeRampPlus4FontSize,
    typeRampPlus4LineHeight,
    typeRampPlus5FontSize,
    typeRampPlus5LineHeight,
    typeRampPlus6FontSize,
    typeRampPlus6LineHeight
} from "@fluentui/web-components";
import { Checkbox, CSSDesignToken, Slider } from "@microsoft/fast-foundation";
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

            <fluent-divider></fluent-divider>
            <h2>Colors</h2>

            <fluent-checkbox
              checked="${x => baseLayerLuminance.getValueFor(x) === StandardLuminance.DarkMode ? true : void 0 }"
              @change="${(x, c) => SettingsPanel.toggleLightMode(c.event)}"
            >Dark Mode</fluent-checkbox>

            <fluent-divider></fluent-divider>

            <h2>Layout</h2>

            <h4 id="layer-corner-label">Layer corner radius</h4>
            <fluent-slider
              aria-labelledby="layer-corner-label"
              value="${x => layerCornerRadius.getValueFor(x)}"
              @change="${(x, c) => SettingsPanel.updateLayerCornerRadius(c.event)}"
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
              @change="${(x, c) => SettingsPanel.updateControlCornerRadius(c.event)}"
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
              @change="${(x, c) => SettingsPanel.updateDensity(c.event)}"
              min="0"
              max="10"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="10">
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
              @change="${(x, c) => SettingsPanel.updateStrokeWidth(c.event)}"
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

            <fluent-divider></fluent-divider>
            <h2>Typography</h2>
            <h4 id="type-ramp-grid-label">Type Ramp</h4>
            <fluent-divider></fluent-divider>
        </div>
`;

export interface typeRampRow {
  key: string,
  typeSizeToken: CSSDesignToken<string>,
  lineHeightToken: CSSDesignToken<string>,
}

const typeRampRows: typeRampRow[] = [
  {key: "Minus2", typeSizeToken: typeRampMinus2FontSize, lineHeightToken: typeRampMinus2LineHeight},
  {key: "Minus1", typeSizeToken: typeRampMinus1FontSize, lineHeightToken: typeRampMinus1LineHeight},
  {key: "Base", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus1", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus2", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus3", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus4", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus5", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus6", typeSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
];

@customElement({
  name: "settings-panel",
  template: settingsPanelTemplate,
  styles: settingsPanelStyles,
})
export class SettingsPanel extends FASTElement {

  public static toggleLightMode(e: Event): void {
    baseLayerLuminance.setValueFor(
      document.body,
      (e.target as Checkbox).checked ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );
    localStorage.setItem("darkMode", (e.target as Checkbox).checked ? "true" : "false")
  };

  public static updateControlCornerRadius(e: Event): void {
    controlCornerRadius.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
    localStorage.setItem("controlCornerRadius", (e.target as Slider).value);
  };

  public static updateLayerCornerRadius(e: Event): void {
    layerCornerRadius.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
    localStorage.setItem("layerCornerRadius", (e.target as Slider).value);
  };

  public static updateDensity(e: Event): void {
    density.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
    localStorage.setItem("density", (e.target as Slider).value);
  };

  public static updateStrokeWidth(e: Event): void {
    strokeWidth.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
    localStorage.setItem("strokeWidth", (e.target as Slider).value);
  };

  public static applySavedSetting(token: CSSDesignToken<string | number>): void {
    const savedSetting: string | number | null = localStorage.getItem(token.name);
    if (savedSetting){
      token.setValueFor(
        document.body,
        typeof savedSetting === "string" ? savedSetting : Number.parseInt(savedSetting)
      );
    }
  }

  public static applySavedSettings(): void {
    const darkModeSetting: string | null = localStorage.getItem("darkMode");
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        document.body,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    SettingsPanel.applySavedSetting(controlCornerRadius);
    SettingsPanel.applySavedSetting(layerCornerRadius);
    SettingsPanel.applySavedSetting(density);
    SettingsPanel.applySavedSetting(strokeWidth);

    typeRampRows.forEach(rowdata => {
      SettingsPanel.applySavedSetting(rowdata.typeSizeToken);
      SettingsPanel.applySavedSetting(rowdata.lineHeightToken);
    });
  }
}
