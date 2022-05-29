import {
  customElement,
  FASTElement,
  html,
  observable,
  ref,
  ViewTemplate,
  when
} from "@microsoft/fast-element";
import { ColumnDefinition, DataGrid } from "@microsoft/fast-foundation";
import { fileViewStyles } from "./file-view.styles";

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
  <span class="directory">${x => x.directoryHandle?.name}</span>
  </div>
  <fluent-divider></fluent-divider>
  <fluent-data-grid
    class="display-grid"
    ${ref('displayGrid')}
  ></fluent-data-grid>
  </div>
`;

const fileNameCellTemplate = html`
    <template>
    ${x =>
      x.rowData.fileName
    }
    </template>
`;


const fileSizeCellTemplate = html`
    <template>
      ${x =>
        x.rowData.fileData ? x.rowData.fileData.size : x.rowData.children.length
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
          x.rowData.fileData ? new Date(x.rowData.fileData.lastModified) : ""
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

export interface fileSystemItem{
  fileName: string;
  fileHandle: FileSystemDirectoryHandleWithFS | FileSystemFileHandle;
  expanded?: boolean;
  fileData?: File;
  children?: fileSystemItem[];
}

@customElement({
  name: "file-view",
  template: fileViewTemplate,
  styles: fileViewStyles,
})
export class FileView extends FASTElement {
  @observable
  public directoryHandle: undefined |  FileSystemDirectoryHandleWithFS;

  @observable
  public fileEntries: fileSystemItem[] = []

  public displayGrid: DataGrid | undefined;

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public async pickDirectory(): Promise<void> {
    try {
      this.directoryHandle = await ((window as unknown) as WindowWithFS).showDirectoryPicker() as FileSystemDirectoryHandleWithFS;
    } catch {
      return;
    }

    this.fileEntries.splice(0);

    await this.getDirectoryEntries(this.fileEntries, this.directoryHandle);

    if (this.displayGrid){
      this.displayGrid.columnDefinitions = baseColumns;
      this.displayGrid.rowsData = this.fileEntries;
    }
  }

  private async getDirectoryEntries(entries: fileSystemItem[], directoryHandle: FileSystemDirectoryHandleWithFS): Promise<void> {
    for await (const [key, value] of directoryHandle.entries()) {
      if (value instanceof FileSystemDirectoryHandle){
        const children: fileSystemItem[] = [];
        await this.getDirectoryEntries(children, value as FileSystemDirectoryHandleWithFS);
        entries.push({ fileName: key, fileHandle: value as FileSystemDirectoryHandleWithFS, children });
      } else {
        const fileData: File = await (value as FileSystemFileHandle).getFile();
        entries.push({ fileName: key, fileHandle: value, fileData });
      }
    }
  }
}
