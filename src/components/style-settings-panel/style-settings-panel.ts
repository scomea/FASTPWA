import {
  customElement,
  FASTElement,
  ref
} from "@microsoft/fast-element";
import {
    baseHeightMultiplier,
    baseLayerLuminance,
    baseHorizontalSpacingMultiplier,
    controlCornerRadius,
    density,
    designUnit,
    disabledOpacity,
    layerCornerRadius,
    StandardLuminance,
    strokeWidth,
} from "@fluentui/web-components";
import {
  Checkbox,
  ColumnDefinition,
  CSSDesignToken,
  DataGrid,
  DataGridCell,
  TextField
} from "@microsoft/fast-foundation";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { StyleSettingsService, typeRampRows } from "./style-settings-service";
import { SettingsSlider } from "../settings-slider/settings-slider";
import { ColorPicker } from "../color-picker/color-picker";
import { styleSettingsPanelStyles } from "./style-settings-panel.styles";

ColorPicker;
SettingsSlider;

/**
 * Generates a template
 *
 * @public
 */
 export const styleSettingsPanelTemplate: ViewTemplate<StyleSettingsPanel> = html<StyleSettingsPanel>`
        <div
          class="container"
        >
            <h2>Style settings</h2>

            <fluent-divider></fluent-divider>
            <h3>Colors</h3>

            <settings-slider
              slider-label="Disabled Opacity"
              min="0"
              max="1"
              step="0.01"
              :target="${x => x.target}"
              :token="${x => disabledOpacity}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="1">
              1
              </fluent-slider-label>
            </settings-slider>

            <fluent-checkbox
              class="dark-mode-checkbox"
              checked="${x => baseLayerLuminance.getValueFor(x) === StandardLuminance.DarkMode ? true : void 0 }"
              @change="${(x, c) => x.toggleLightMode(c.event)}"
            >Dark Mode</fluent-checkbox>

            <fluent-divider></fluent-divider>

            <h3>Layout</h3>

            <div
              class="layout-sliders"
            >
            <settings-slider
              slider-label="Layer corner radius"
              min="0"
              max="20"
              :target="${x => x.target}"
              :token="${x => layerCornerRadius}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="20">
              20
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Control corner radius"
              min="0"
              max="20"
              :target="${x => x.target}"
              :token="${x => controlCornerRadius}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="20">
              20
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Density"
              min="0"
              max="10"
              :target="${x => x.target}"
              :token="${x => density}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="10">
              10
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Stroke width"
              min="0"
              max="4"
              :target="${x => x.target}"
              :token="${x => strokeWidth}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="4">
              4
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Design unit"
              min="0"
              max="10"
              :target="${x => x.target}"
              :token="${x => designUnit}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="10">
              10
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Base Height Multiplier"
              min="0"
              max="10"
              :target="${x => x.target}"
              :token="${x => baseHeightMultiplier}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="10">
              10
              </fluent-slider-label>
            </settings-slider>

            <settings-slider
              slider-label="Base Horizontal Spacing Multiplier"
              min="0"
              max="6"
              :target="${x => x.target}"
              :token="${x => baseHorizontalSpacingMultiplier}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="6">
              6
              </fluent-slider-label>
            </settings-slider>
            </div>

            <fluent-divider></fluent-divider>
            <h3>Typography</h3>
            <h4 id="type-ramp-grid-label">Type Ramp</h4>
            <fluent-data-grid
              :rowsData="${x => typeRampRows}"
              grid-template-columns="80px 100px 100px 100px"
              class="type-ramp-grid"
              ${ref('typeRampGrid')}
          ></fluent-data-grid>
        </div>
`;

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
      :value="${ x => x.rowData.fontSizeToken.getValueFor(x)}"
      @change="${(x, c) => x.$emit('updatetyperamptoken', { token: x.rowData.fontSizeToken, source: c.event.target })}"
    >
    </fluent-text-field>
  </template>
`;

const lineHeightCellTemplate = html`
  <template>
    <fluent-text-field
      :value="${x => x.rowData.lineHeightToken.getValueFor(x)}"
      @change="${(x, c) => x.$emit('updatetyperamptoken', { token: x.rowData.lineHeightToken, source: c.event.target })}"
    >
    </fluent-text-field>
  </template>
`;

const resetRowCellTemplate = html`
  <template>
    <fluent-button
      @click="${x => x.$emit('cleartyperamprow', x.rowData)}"
    >
    Reset
    </fluent-button>
  </template>
`;

const resetTypeRampCellTemplate = html`
  <template>
    <fluent-button
      @click="${x => x.$emit('cleartyperamp')}"
    >
    Reset
    </fluent-button>
  </template>
`;

interface updateTypeRampTokenEventDetails {
  token: CSSDesignToken<string>;
  source: TextField;
}

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
  {
    columnDataKey: "reset",
    title:"Reset",
    cellTemplate: resetRowCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: resetTypeRampCellTemplate,
  },
];

function getFocusTarget(cell: DataGridCell): HTMLElement {
  return cell.children[0] as HTMLElement;
}

@customElement({
  name: "style-settings-panel",
  template: styleSettingsPanelTemplate,
  styles: styleSettingsPanelStyles,
})
export class StyleSettingsPanel extends FASTElement {

  public target: HTMLElement = StyleSettingsService.appRoot;
  public typeRampGrid: DataGrid | undefined;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("updatetyperamptoken", this.updateTypeRampToken);
    this.addEventListener("cleartyperamprow", this.clearTypeRampRow);
    this.addEventListener("cleartyperamp", this.clearTypeRamp);
    if (this.typeRampGrid){
      this.typeRampGrid.columnDefinitions = typeRampColumns;
    }
  }

  public disconnectedCallback(): void {
    this.removeEventListener("updatetyperamptoken", this.updateTypeRampToken);
    this.removeEventListener("cleartyperamprow", this.clearTypeRampRow);
    this.removeEventListener("cleartyperamp", this.clearTypeRamp);
    super.disconnectedCallback();
  }

  public toggleLightMode = (e: Event): void => {
    StyleSettingsService.toggleLightMode((e.target as Checkbox).checked, this.target);
  };

  public updateTypeRampToken = (e: Event): void => {
    const details: updateTypeRampTokenEventDetails = (e as CustomEvent).detail;
    StyleSettingsService.updateToken(details.source.value, details.token, this.target);
  }

  public clearTypeRamp(e: Event): void {
    StyleSettingsService.clearTypeRamp(this.target);
  }

  public clearTypeRampRow(e: Event): void {
    StyleSettingsService.clearTypeRampRow((e as CustomEvent).detail, this.target);
  }
}