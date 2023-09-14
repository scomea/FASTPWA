import {
  customElement,
  FASTElement,
  html,
  ViewTemplate,
} from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-element/di";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { fileViewPageStyles } from "./file-view-page.styles.js";
import { FileViewRoutes } from "./file-view-routes.js";
import { FileViewService, fileSystemItem } from "./file-view-service.js";

/**
 * Generates a template
 *
 * @public
 */
 export const fileViewPageTemplate: ViewTemplate<FileViewPage> = html<FileViewPage>`
 <app-page>
  <h1>File viewer</h1>
  <adaptive-divider></adaptive-divider>
    <fast-router
      :config=${x => x.config}
    ></fast-router>
</app-page>
`;

@customElement({
  name: "file-view-page",
  template: fileViewPageTemplate,
  styles: fileViewPageStyles,
})
export class FileViewPage extends FASTElement {
  config = new FileViewRoutes();
  @inject(FileViewService) fileViewService!: FileViewService;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("navigatetochild", this.handleNavigateToChild);
    this.addEventListener("navigatetobreadcrumb", this.handleNavigateToBreadcrumb);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("navigatetochild", this.handleNavigateToChild);
    this.removeEventListener("navigatetobreadcrumb", this.handleNavigateToBreadcrumb);
  }

  async enter(phase: NavigationPhase) {
    let childRoute: string | undefined = phase.route.allParams['fast-child-route'];
    const rootHandle: FileSystemHandle | undefined =this.fileViewService.getRootDirectoryHandle()

    if (!rootHandle) {
      if ( childRoute === "welcome" ){
        return;
      }
      phase.cancel(() => Route.path.replace(`file-view-page/welcome`));
      return;
    }

    if (childRoute === "welcome" || childRoute === undefined) {
      phase.cancel(() => Route.path.replace(`file-view-page/folder/${this.fileViewService.rootDirectoryHandle?.name}`));
      return;
    }

    this.fileViewService.setCurrentPath(childRoute);
  }

  private handleNavigateToChild(e: Event): void {
    const navTarget: fileSystemItem = (e as CustomEvent).detail as fileSystemItem;
    if (navTarget.fileHandle.kind === "directory") {
      Route.path.push(`file-view-page/${this.fileViewService.getCurrentPath()}*${navTarget.fileName}`)
    }
  }

  private async handleNavigateToBreadcrumb(e: Event): Promise<void> {
    const navTarget: fileSystemItem = (e as CustomEvent).detail as fileSystemItem;
    if (navTarget.fileHandle.kind === "directory") {
      const itemPath: fileSystemItem[] | undefined = await this.fileViewService.getCurrentPathItems();
      if (!itemPath || itemPath.length === 0) {
        return;
      }
      let newPath:string = `file-view-page/folder/${itemPath[0].fileName}`
      if (itemPath[0] !== navTarget){
        for(let i = 1; i < itemPath.length; i++){
          newPath = `${newPath}*${itemPath[i].fileName}`;
          if (itemPath[i] === navTarget){
            break;
          }
        }
      }
      Route.path.push(newPath);
    }
  }

}
