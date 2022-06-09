import {
  attr,
  customElement,
  FASTElement,
  observable,
  ref
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
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
import { StyleSettingsPanel } from "../style-settings-panel"
import { colorPickerStyles } from "./color-picker.styles";

/**
 * Generates a template
 *
 * @public
 */
 export const colorPickerTemplate: ViewTemplate<ColorPicker> = html<ColorPicker>`
  <div
    class="container"
  >
  </div>
`;

@customElement({
  name: "color-picker",
  template: colorPickerTemplate,
  styles: colorPickerStyles,
})
export class ColorPicker extends FASTElement {

  @attr({ attribute: "color-picker-label" })
  public sliderLabel: string = "";

  @observable
  public token: CSSDesignToken<number> | undefined;
}