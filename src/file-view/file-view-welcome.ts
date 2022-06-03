import {
  customElement,
  FASTElement,
  html,
  ViewTemplate,
} from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { Route } from "@microsoft/fast-router";
import { FileViewService, fileSystemItem } from "./file-view-service";
import { fileViewWelcomeStyles } from "./file-view-welcome.styles";


/**
 * Generates a template
 *
 * @public
 */
 export const fileViewWelcomeTemplate: ViewTemplate<FileViewWelcome> = html<FileViewWelcome>`
  <div>
  <p>
  This page demonstrates basic navigation of a local directory structure using the PWA's ability to access local files.
  Click the button below to select a folder and browse.
  <p>
  <fluent-button
    @click=${x => x.pickDirectory()}
  >
    Choose root folder
  </fluent-button>
  <fluent-divider></fluent-divider>
  </div>
`;

@customElement({
  name: "file-view-welcome",
  template: fileViewWelcomeTemplate,
  styles: fileViewWelcomeStyles,
})
export class FileViewWelcome extends FASTElement {
  @inject(FileViewService) fileViewService!: FileViewService;

  public async pickDirectory(): Promise<void> {
    try {;
      this.fileViewService.setRootDirectoryHandle(await ((window as unknown) as WindowWithFS).showDirectoryPicker())
    } catch {
      return;
    }

    Route.path.push(`file-view/folder/${this.fileViewService.rootDirectoryHandle?.name}`);
  }
}
