import { RouterConfiguration } from "@microsoft/fast-router";
import { FileViewWelcome } from "./file-view-welcome";
import { FileViewPanel } from "./file-view-panel";

export class FileViewRoutes extends RouterConfiguration {
  configure() {
    this.routes.map(
      { path: '', element: FileViewPanel },
      { path: 'welcome', element: FileViewWelcome },
      { path: 'folder/{path}', element: FileViewPanel },
    );
  }
}