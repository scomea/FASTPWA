import {
  customElement,
  FASTElement,
  html,
  observable,
  ref,
  ViewTemplate,
  when
} from "@microsoft/fast-element";
import { ColumnDefinition, DataGrid, inject } from "@microsoft/fast-foundation";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { fileViewPanelStyles } from "./file-view-panel.styles";
import { FileViewService, fileSystemItem } from "./file-view-service";

/**
 * Generates a template
 *
 * @public
 */
 export const fileViewPanelTemplate: ViewTemplate<FileViewPanel> = html<FileViewPanel>`
  <fluent-data-grid
    grid-template-columns="1fr 120px 120px 140px"
    class="display-grid"
    ${ref('displayGrid')}
  ></fluent-data-grid>
`;

const fileNameCellTemplate = html`
    <fluent-button
      @click=${x => x.$emit('navigatetoitem', x.rowData)}
      appearance="stealth"
    >
    ${x =>
      x.rowData.fileName
    }
    </fluent-button>
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
    cellTemplate: fileNameCellTemplate
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

@customElement({
  name: "file-view-panel",
  template: fileViewPanelTemplate,
  styles: fileViewPanelStyles,
})
export class FileViewPanel extends FASTElement {
  @inject(FileViewService) fileViewService!: FileViewService;

  public displayGrid: DataGrid | undefined;

  // public connectedCallback(): void {
  //   super.connectedCallback();
  //   if (this.displayGrid){
  //     this.displayGrid.columnDefinitions = baseColumns;
  //     this.displayGrid.rowsData = this.fileViewService.currentDirectoryEntries;
  //   }
  // }


  // async commit() {
  //   if (this.displayGrid){
  //     console.log("navigate")
  //     this.displayGrid.columnDefinitions = baseColumns;
  //     this.displayGrid.rowsData = await this.fileViewService.getCurrentDirectoryEntries();
  //   }
  // }

  async commit() {
    if (this.displayGrid){
      console.log("enter");
      this.displayGrid.columnDefinitions = baseColumns;
      this.displayGrid.rowsData = await this.fileViewService.getCurrentDirectoryEntries();
    }
  }

}
