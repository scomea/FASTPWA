import {
  customElement,
  FASTElement,
  html,
  observable,
  ViewTemplate,
} from "@microsoft/fast-element";
import { fileViewWelcomeStyles } from "./file-view-welcome.styles";


/**
 * Generates a template
 *
 * @public
 */
 export const fileViewWelcomeTemplate: ViewTemplate<FileViewWelcome> = html<FileViewWelcome>`
  <div>
  <h1>Choose a folder</h1>
  </div>
`;

@customElement({
  name: "file-view-welcome",
  template: fileViewWelcomeTemplate,
  styles: fileViewWelcomeStyles,
})
export class FileViewWelcome extends FASTElement {
}
