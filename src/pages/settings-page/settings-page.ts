import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { html, ViewTemplate } from "@microsoft/fast-element";
import { StyleSettingsPanel } from "../../components/style-settings-panel/style-settings-panel";
import { StyleSettingsService } from "../../components/style-settings-panel/style-settings-service";
import { settingsPageStyles } from "./settings-page.styles";

StyleSettingsPanel;

/**
 * Generates a template
 *
 * @public
 */
 export const settingsPageTemplate: ViewTemplate<SettingsPage> = html<SettingsPage>`
<app-page>
  <h1>Settings</h1>
  <fluent-divider></fluent-divider>
  <style-settings-panel></style-settings-panel>
  <fluent-divider></fluent-divider>
</app-page>
`;

@customElement({
  name: "settings-page",
  template: settingsPageTemplate,
  styles: settingsPageStyles,
})
export class SettingsPage extends FASTElement {
  public target: HTMLElement = StyleSettingsService.appRoot;
}