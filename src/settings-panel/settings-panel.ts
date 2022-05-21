import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
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
        </div>
`;

@customElement({
  name: "settings-panel",
  template: settingsPanelTemplate,
  styles: settingsPanelStyles,
})
export class SettingsPanel extends FASTElement {
}
