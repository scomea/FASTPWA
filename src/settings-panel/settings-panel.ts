import {
  customElement,
  FASTElement,
  observable,
  ref
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
import {
  Checkbox,
  ColumnDefinition,
  CSSDesignToken,
  DataGrid,
  DataGridCell,
  DesignToken,
  Slider,
  TextField
} from "@microsoft/fast-foundation";
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
              @change="${(x, c) => SettingsPanel.updateTokenFromSlider(c.event, layerCornerRadius)}"
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
              @change="${(x, c) => SettingsPanel.updateTokenFromSlider(c.event, controlCornerRadius)}"
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
              @change="${(x, c) => SettingsPanel.updateTokenFromSlider(c.event, density)}"
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
              @change="${(x, c) => SettingsPanel.updateTokenFromSlider(c.event, strokeWidth)}"
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
            <fluent-data-grid
              :rowsData="${x => typeRampRows}"
              grid-template-columns="140px 140px 140px"
              class="type-ramp-grid"
              ${ref('typeRampGrid')}
          ></fluent-data-grid>
            <fluent-divider></fluent-divider>
        </div>
`;

export interface typeRampRow {
  key: string,
  fontSizeToken: CSSDesignToken<string>,
  lineHeightToken: CSSDesignToken<string>,
}

const typeRampRows: typeRampRow[] = [
  {key: "Minus2", fontSizeToken: typeRampMinus2FontSize, lineHeightToken: typeRampMinus2LineHeight},
  {key: "Minus1", fontSizeToken: typeRampMinus1FontSize, lineHeightToken: typeRampMinus1LineHeight},
  {key: "Base", fontSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus1", fontSizeToken: typeRampPlus1FontSize, lineHeightToken: typeRampPlus1LineHeight},
  {key: "Plus2", fontSizeToken: typeRampPlus2FontSize, lineHeightToken: typeRampPlus2LineHeight},
  {key: "Plus3", fontSizeToken: typeRampPlus3FontSize, lineHeightToken: typeRampPlus3LineHeight},
  {key: "Plus4", fontSizeToken: typeRampPlus4FontSize, lineHeightToken: typeRampPlus4LineHeight},
  {key: "Plus5", fontSizeToken: typeRampPlus5FontSize, lineHeightToken: typeRampPlus5LineHeight},
  {key: "Plus6", fontSizeToken: typeRampPlus6FontSize, lineHeightToken: typeRampPlus6LineHeight},
];

const headerCellTemplate = html`
  <template>
    ${ x => x.columnDefinition.title }
  </template>
`;

const keyCellTemplate = html`
  <template>
    ${ x => x.rowData.key }
  </template>
`;

const fontSizeCellTemplate = html`
  <template>
    <fluent-text-field
      value="${ x => x.rowData.fontSizeToken.getValueFor(x)}"
      @change="${(x, c) => SettingsPanel.updateTypeRampToken(c.event, x.rowData.fontSizeToken)}"
    >
    </fluent-text-field>
  </template>
`;

const lineHeightCellTemplate = html`
  <template>
    <fluent-text-field
      value="${ x => x.rowData.lineHeightToken.getValueFor(x)}"
      @change="${(x, c) => SettingsPanel.updateTypeRampToken(c.event, x.rowData.lineHeightToken)}"
    >
    </fluent-text-field>
  </template>
`;

const typeRampColumns: ColumnDefinition[] = [
  { columnDataKey: "key",
    title:"Level",
    isRowHeader: true,
    cellTemplate: keyCellTemplate,
    headerCellTemplate: headerCellTemplate,
  },
  {
    columnDataKey: "fontSizeToken",
    title:"Font Size",
    cellTemplate: fontSizeCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: headerCellTemplate,
  },
  {
    columnDataKey: "lineHeightToken",
    title:"Line Height",
    cellTemplate: lineHeightCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: headerCellTemplate,
  },
];

function getFocusTarget(cell: DataGridCell): HTMLElement {
  return cell.children[0] as HTMLElement;
}

@customElement({
  name: "settings-panel",
  template: settingsPanelTemplate,
  styles: settingsPanelStyles,
})
export class SettingsPanel extends FASTElement {

  public typeRampGrid: DataGrid | undefined;

  public static toggleLightMode(e: Event): void {
    baseLayerLuminance.setValueFor(
      document.body,
      (e.target as Checkbox).checked ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );
    localStorage.setItem("darkMode", (e.target as Checkbox).checked ? "true" : "false")
  };

  public static updateTokenFromSlider(e: Event, token: DesignToken<number>): void {
    token.setValueFor(
      document.body,
      (e.target as Slider).valueAsNumber
    );
  }

  public static updateTypeRampToken(e: Event, token: DesignToken<string>): void {
    token.setValueFor(
      document.body,
      (e.target as TextField).value
    );
  }

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
      SettingsPanel.applySavedSetting(rowdata.fontSizeToken);
      SettingsPanel.applySavedSetting(rowdata.lineHeightToken);
    });
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.typeRampGrid){
      this.typeRampGrid.columnDefinitions = typeRampColumns;
    }
  }
}
