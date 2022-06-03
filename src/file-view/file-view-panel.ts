import {
  customElement,
  FASTElement,
  html,
  repeat,
  observable,
  ref,
  ViewTemplate,
  when
} from "@microsoft/fast-element";
import { ColumnDefinition, DataGrid, DataGridCell, inject } from "@microsoft/fast-foundation";
import { Route } from "@microsoft/fast-router";
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
    <fluent-divider></fluent-divider>
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
  },
  {
    columnDataKey: "fileData",
    title:"Type",
    cellTemplate: fileTypeCellTemplate
  },
  {
    columnDataKey: "fileData",
    title:"Size",
    cellTemplate: fileSizeCellTemplate
  },
  {
    columnDataKey: "fileData",
    title:"Last modified",
    cellTemplate: fileModCellTemplate
  },
];

function getFocusTarget(cell: DataGridCell): HTMLElement {
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

  public displayGrid: DataGrid | undefined;

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

}
