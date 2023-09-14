import {
  customElement,
  FASTElement,
  html,
  repeat,
  observable,
  ref,
  ViewTemplate,
} from "@microsoft/fast-element";
import {
  ColumnDefinition,
  FASTDataGrid,
  FASTDataGridCell
} from "@microsoft/fast-foundation";
import { inject } from '@microsoft/fast-element/di';
import { fileViewPanelStyles } from "./file-view-panel.styles";
import { FileViewService, fileSystemItem } from "./file-view-service";

/**
 * Generates a template
 *
 * @public
 */
 export const fileViewPanelTemplate: ViewTemplate<FileViewPanel> = html<FileViewPanel>`
  <div class="container">
    <fluent-breadcrumb
      class="breadcrumbs"
    >
      ${repeat(x => x.pathItems, html`
        <fluent-breadcrumb-item>
          <fluent-button
            appearance="lightweight"
            @click="${(x, c) => c.parent.$emit('navigatetobreadcrumb', x)}"
          >
            ${x => x.fileName}
          </fluent-button>
        </fluent-breadcrumb-item>
      `)}
    </fluent-breadcrumb>
    <fluent-data-grid
      generate-header="sticky"
      :rowsData="${x => x.items}"
      grid-template-columns="1fr 120px 120px 140px"
      class="display-grid"
      ${ref('displayGrid')}
    ></fluent-data-grid>
  </div>
`;

const fileNameCellTemplate = html`
<template>
    <fluent-button
      class="filename-button"
      @click="${x => x.$emit('navigatetochild', x.rowData)}"
      appearance="stealth"
    >
    ${x =>
      x.rowData.fileName
    }
    </fluent-button>
  </template>
`;

const headerCellTemplate = html`
<template>
    <fluent-button
      class="header-button"
      @click="${(x, c) => x.$emit('updatesort', x.columnDefinition)}"
      appearance="stealth"
    >
    ${ x => x.columnDefinition.title }
    </fluent-button>
  </template>
`;


const fileSizeCellTemplate = html`
    <template>
      ${x =>
        x.rowData.fileData ? `${x.rowData.fileData.size} bytes` : `${x.rowData.children.length} items`
      }
    </template>
`;

const fileTypeCellTemplate = html`
    <template>
      ${x =>
        x.rowData.fileData ? x.rowData.fileData.type : "folder"
      }
    </template>
`;

const fileModCellTemplate = html`
    <template>
      ${x =>
          x.rowData.fileData ? new Date(x.rowData.fileData.lastModified).toDateString() : ""
      }
    </template>
`;

const baseColumns: ColumnDefinition[] = [
  { columnDataKey: "fileName",
    title:"Name",
    isRowHeader: true,
    cellTemplate: fileNameCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: headerCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    columnDataKey: "fileData.type",
    title:"Type",
    cellTemplate: fileTypeCellTemplate,
    headerCellTemplate: headerCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    columnDataKey: "fileData.size",
    title:"Size",
    cellTemplate: fileSizeCellTemplate,
    headerCellTemplate: headerCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    columnDataKey: "fileData.lastModified",
    title:"Last modified",
    cellTemplate: fileModCellTemplate,
    headerCellTemplate: headerCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
];

function getFocusTarget(cell: FASTDataGridCell): HTMLElement {
  return cell.children[0] as HTMLElement;
}


@customElement({
  name: "file-view-panel",
  template: fileViewPanelTemplate,
  styles: fileViewPanelStyles,
})
export class FileViewPanel extends FASTElement {
  @inject(FileViewService) fileViewService!: FileViewService;

  @observable
  public items: fileSystemItem[] = [];

  @observable
  public pathItems: fileSystemItem[] = [];

  public displayGrid: FASTDataGrid | undefined;

  private currentSort: string = "fileName";
  private invertSort: boolean = false;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("updatesort", this.handleUpdateSort);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("updatesort", this.handleUpdateSort);
  }

  async commit() {
    if (this.displayGrid){
      this.displayGrid.columnDefinitions = baseColumns;
      const entries: fileSystemItem[] | undefined =  await this.fileViewService.getCurrentDirectoryEntries();
      const path: fileSystemItem[] | undefined =  await this.fileViewService.getCurrentPathItems();
      if (entries && path){
        this.items = entries;
        this.pathItems = path;
      }
    }
  }

  public handleUpdateSort = (e: Event): void => {
    const columnDefinition: ColumnDefinition = (e as CustomEvent).detail as ColumnDefinition;

    if (!this.displayGrid){
      return;
    }

    if (this.currentSort === columnDefinition.columnDataKey) {
      this.invertSort = !this.invertSort;
    } else {
      this.invertSort = false;
      this.currentSort =  columnDefinition.columnDataKey;
    }

    switch (this.currentSort) {
      case "fileName":
        this.items.sort((a: fileSystemItem, b: fileSystemItem): number => {
          const A: string = a.fileName;
          const B: string = b.fileName;
          if (A < B) {
            return this.invertSort ? -1 : 1;
          } else if (A > B) {
            return this.invertSort ? 1 : -1;
          } else {
            return 0;
          }
        });
        this.displayGrid.gridTemplateColumns ="1fr 120px 120px 140px"
        break;
      case "fileData.type":
        this.items.sort((a: fileSystemItem, b: fileSystemItem): number => {
          const A: string  = a.fileData ? a.fileData.type : "folder";
          const B: string = b.fileData ? b.fileData.type : "folder";
          if (A < B) {
            return this.invertSort ? -1 : 1;
          } else if (A > B) {
            return this.invertSort ? 1 : -1;
          } else {
            return 0;
          }
        });
        this.displayGrid.gridTemplateColumns ="1fr 240px 120px 140px"
        break;
      case "fileData.size":
        this.items.sort((a: fileSystemItem, b: fileSystemItem): number => {
          const A: number  = a.fileData ? a.fileData.size : 0;
          const B: number = b.fileData ? b.fileData.size : 0;
          if (A < B) {
            return this.invertSort ? -1 : 1;
          } else if (A > B) {
            return this.invertSort ? 1 : -1;
          } else {
            return 0;
          }
        });
        this.displayGrid.gridTemplateColumns ="1fr 120px 240px 140px"
        break;
      case "fileData.lastModified":
        this.items.sort((a: fileSystemItem, b: fileSystemItem): number => {
          const A: number  = a.fileData ? a.fileData.lastModified : 0;
          const B: number = b.fileData ? b.fileData.lastModified : 0;
          if (A < B) {
            return this.invertSort ? -1 : 1;
          } else if (A > B) {
            return this.invertSort ? 1 : -1;
          } else {
            return 0;
          }
        });
        this.displayGrid.gridTemplateColumns ="1fr 120px 120px 240px"
        break;
    }
  }

}
