import {
  attr,
  customElement,
  FASTElement,
  observable,
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
import {
  CSSDesignToken,
} from "@microsoft/fast-foundation";
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