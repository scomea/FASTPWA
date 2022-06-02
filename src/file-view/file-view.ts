import {
  customElement,
  FASTElement,
  html,
  observable,
  ViewTemplate,
} from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { fileViewStyles } from "./file-view.styles";
import { FileViewRoutes } from "./file-view-routes";
import { FileViewService, fileSystemItem } from "./file-view-service";

/**
 * Generates a template
 *
 * @public
 */
 export const fileViewTemplate: ViewTemplate<FileView> = html<FileView>`
  <div
    class="container"
  >
  <h1>File viewer</h1>
  <fluent-divider></fluent-divider>
  <div class="directory-selector">
  <fluent-button
    @click=${x => x.pickDirectory()}
  >
    Choose a directory
  </fluent-button>
  </div>
  <fluent-divider></fluent-divider>
    <fast-router
      :config=${x => x.config}
    ></fast-router>
  </div>
`;

@customElement({
  name: "file-view",
  template: fileViewTemplate,
  styles: fileViewStyles,
})
export class FileView extends FASTElement {
  config = new FileViewRoutes();
  @inject(FileViewService) fileViewService!: FileViewService;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("navigatetoitem", this.handleNavigate);
    // this.updateDirectory();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("navigatetoitem", this.handleNavigate);
  }

  public async pickDirectory(): Promise<void> {
    try {;
      this.fileViewService.setRootDirectoryHandle(await ((window as unknown) as WindowWithFS).showDirectoryPicker())
    } catch {
      return;
    }

    Route.path.push(`file-view/folder/${this.fileViewService.rootDirectoryHandle?.name}`);
  }

  async enter(phase: NavigationPhase) {
    const childRoute: string | undefined = phase.route.allParams['fast-child-route'];
    console.log(childRoute);

    if (childRoute === "welcome"){
      return;
    }

    if (this.fileViewService.getRootDirectoryHandle() === undefined) {
      phase.cancel(() => Route.path.replace(`file-view/welcome`));
      return;
    }

    this.fileViewService.setCurrentDirectory(childRoute);
  }

  private handleNavigate(e: Event): void {
    const navTarget: fileSystemItem = (e as CustomEvent).detail as fileSystemItem;
    if (navTarget.fileHandle.kind === "directory") {
      Route.path.push(`file-view/${this.fileViewService.currentPath}*${navTarget.fileName}`)
    }
  }

}
