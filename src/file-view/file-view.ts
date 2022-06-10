import {
  customElement,
  FASTElement,
  html,
  observable,
  ViewTemplate,
} from "@microsoft/fast-element";
import { ColumnDefinition, inject } from "@microsoft/fast-foundation";
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
 <app-page>
  <h1>File viewer</h1>
  <fluent-divider></fluent-divider>
    <fast-router
      :config=${x => x.config}
    ></fast-router>
</app-page>
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
      phase.cancel(() => Route.path.replace(`file-view/welcome`));
      return;
    }

    if (childRoute === "welcome" || childRoute === undefined) {
      phase.cancel(() => Route.path.replace(`file-view/folder/${this.fileViewService.rootDirectoryHandle?.name}`));
      return;
    }

    this.fileViewService.setCurrentPath(childRoute);
  }

  private handleNavigateToChild(e: Event): void {
    const navTarget: fileSystemItem = (e as CustomEvent).detail as fileSystemItem;
    if (navTarget.fileHandle.kind === "directory") {
      Route.path.push(`file-view/${this.fileViewService.getCurrentPath()}*${navTarget.fileName}`)
    }
  }

  private async handleNavigateToBreadcrumb(e: Event): Promise<void> {
    const navTarget: fileSystemItem = (e as CustomEvent).detail as fileSystemItem;
    if (navTarget.fileHandle.kind === "directory") {
      const itemPath: fileSystemItem[] | undefined = await this.fileViewService.getCurrentPathItems();
      if (!itemPath || itemPath.length === 0) {
        return;
      }
      let newPath:string = `file-view/folder/${itemPath[0].fileName}`
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
