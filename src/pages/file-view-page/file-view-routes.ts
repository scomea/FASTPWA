import { RouterConfiguration } from "@microsoft/fast-router";
import { FileViewWelcome } from "./file-view-welcome.js";
import { FileViewPanel } from "./file-view-panel.js";

export class FileViewRoutes extends RouterConfiguration {
  configure() {
    this.routes.map(
      { path: '', element: FileViewPanel },
      { path: 'welcome', element: FileViewWelcome },
      { path: 'folder/{path}', element: FileViewPanel },
    );
  }
}