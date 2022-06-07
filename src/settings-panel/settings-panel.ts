import {
  customElement,
  FASTElement,
  observable,
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
  DataGrid,
  DataGridCell,
  DesignToken,
  TextField
} from "@microsoft/fast-foundation";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { SettingsService, typeRampRow, typeRampRows } from "./settings-service";
import { SettingsSlider } from "./settings-slider/settings-slider";
import { ColorPicker } from "./color-picker/color-picker";
import { settingsPanelStyles } from "./settings-panel.styles";

ColorPicker;
SettingsSlider;

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

            <settings-slider
              slider-label="Disabled Opacity"
              min="0"
              max="1"
              step="0.01"
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
              @change="${(x, c) => SettingsPanel.toggleLightMode(c.event)}"
            >Dark Mode</fluent-checkbox>

            <fluent-divider></fluent-divider>

            <h2>Layout</h2>

            <settings-slider
              slider-label="Layer corner radius"
              min="0"
              max="20"
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
              step="1"
              :token="${x => baseHorizontalSpacingMultiplier}"
            >
              <fluent-slider-label position="0">
              0
              </fluent-slider-label>
              <fluent-slider-label position="6">
              6
              </fluent-slider-label>
            </settings-slider>

            <fluent-divider></fluent-divider>
            <h2>Typography</h2>
            <h4 id="type-ramp-grid-label">Type Ramp</h4>
            <fluent-data-grid
              :rowsData="${x => typeRampRows}"
              grid-template-columns="100px 140px 140px"
              class="type-ramp-grid"
              ${ref('typeRampGrid')}
          ></fluent-data-grid>
            <fluent-divider></fluent-divider>
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
      @change="${(x, c) => SettingsPanel.updateTypeRampToken(c.event, x.rowData.fontSizeToken)}"
    >
    </fluent-text-field>
  </template>
`;

const lineHeightCellTemplate = html`
  <template>
    <fluent-text-field
      :value="${ x => x.rowData.lineHeightToken.getValueFor(x)}"
      @change="${(x, c) => SettingsPanel.updateTypeRampToken(c.event, x.rowData.lineHeightToken)}"
    >
    </fluent-text-field>
  </template>
`;

const resetRowCellTemplate = html`
  <template>
    <fluent-button
      @click="${(x, c) => SettingsPanel.clearTypeRampRow(c.event, x.rowData)}"
    >
    Reset
    </fluent-button>
  </template>
`;

const resetTypeRampCellTemplate = html`
  <template>
    <fluent-button
      @click="${(x, c) => SettingsPanel.clearTypeRamp(c.event)}"
    >
    Reset
    </fluent-button>
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
  name: "settings-panel",
  template: settingsPanelTemplate,
  styles: settingsPanelStyles,
})
export class SettingsPanel extends FASTElement {

  public typeRampGrid: DataGrid | undefined;

  public static toggleLightMode(e: Event): void {
    SettingsService.toggleLightMode((e.target as Checkbox).checked);
  };

  public static updateTypeRampToken(e: Event, token: DesignToken<string>): void {
    SettingsService.updateToken((e.target as TextField).value, token);
  }

  public static clearTypeRamp(e: Event): void {
    SettingsService.clearTypeRamp();
  }

  public static clearTypeRampRow(e: Event, rowData: typeRampRow): void {
    SettingsService.clearTypeRampRow(rowData);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.typeRampGrid){
      this.typeRampGrid.columnDefinitions = typeRampColumns;
    }
  }
}