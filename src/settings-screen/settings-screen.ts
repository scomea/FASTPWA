import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { StyleSettingsPanel } from "../style-settings-panel/style-settings-panel";
import { StyleSettingsService } from "../style-settings-panel/style-settings-service";
import { settingsScreenStyles } from "./settings-screen.styles";

StyleSettingsPanel;

/**
 * Generates a template
 *
 * @public
 */
 export const settingsScreenTemplate: ViewTemplate<SettingsScreen> = html<SettingsScreen>`
  <div
    class="container"
  >
    <h1>Settings</h1>
      <fluent-divider></fluent-divider>
      <style-settings-panel
      >
      </style-settings-panel>
      <fluent-divider></fluent-divider>
  </div>
`;



@customElement({
  name: "settings-screen",
  template: settingsScreenTemplate,
  styles: settingsScreenStyles,
})
export class SettingsScreen extends FASTElement {

  public target: HTMLElement = StyleSettingsService.appRoot;

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}