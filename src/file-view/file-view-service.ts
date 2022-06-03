export interface fileSystemItem{
    fileName: string;
    fileHandle: FileSystemHandle;
    fileData?: File;
    children?: fileSystemItem[];
  }


export class FileViewService {

    public rootDirectoryHandle: undefined |  FileSystemDirectoryHandle;

    private currentPath: string = "";
    private currentDirectoryEntries: fileSystemItem[] | undefined;
    private currentPathItems: fileSystemItem[] | undefined;

    constructor() {}

    public getRootDirectoryHandle(): undefined |  FileSystemHandle {
        return this.rootDirectoryHandle;
    }

    public async setRootDirectoryHandle( newValue: undefined |  FileSystemDirectoryHandle): Promise<void> {
        this.rootDirectoryHandle = newValue;
        this.currentPath = "";
        this.currentDirectoryEntries = undefined;
        this.currentPathItems = undefined;
    }

    public setCurrentPath(newPath: string | undefined): void {
      this.currentDirectoryEntries = undefined;
      this.currentPathItems = undefined;
      if (typeof newPath === "string" && newPath !== ""){
        this.currentPath = newPath;
      } else {
        this.currentPath = "";
      }
    }

    public getCurrentPath(): string {
      return this.currentPath;
    }

    public async getCurrentDirectoryEntries(): Promise<fileSystemItem[] | undefined> {
      await this.updateItems();
      return this.currentDirectoryEntries;
    }

    public async getCurrentPathItems(): Promise<fileSystemItem[] | undefined> {
      await this.updateItems();
      return this.currentPathItems;
    }

    private async updateItems(): Promise<void> {
      if (this.currentDirectoryEntries || !this.rootDirectoryHandle){
        return;
      }

      let handle: FileSystemDirectoryHandle = this.rootDirectoryHandle;
      this.currentPathItems = [{ fileName: this.rootDirectoryHandle.name, fileHandle: this.rootDirectoryHandle }]

      if (typeof this.currentPath === "string" && this.currentPath !== ""){
        const segments: string[] = this.currentPath.split("*");
        for(let i = 1; i < segments.length; i++){
          handle = await handle.getDirectoryHandle(segments[i]);
          if (!handle){
            return;
          }
          this.currentPathItems.push({ fileName: handle.name, fileHandle: handle })
        }
        this.currentDirectoryEntries = await this.getDirectoryEntries(handle as FileSystemDirectoryHandleWithFS, false);
      } else {
        this.currentDirectoryEntries = await this.getDirectoryEntries(this.rootDirectoryHandle as FileSystemDirectoryHandleWithFS, false)
      }
      this.currentPathItems[this.currentPathItems.length - 1].children = this.currentDirectoryEntries;
    }

    private async getDirectoryEntries(directoryHandle: FileSystemDirectoryHandleWithFS, shallow: boolean): Promise<fileSystemItem[]> {
        const entries: fileSystemItem[] = [];
        for await (const [key, value] of directoryHandle.entries()) {
          if (value instanceof FileSystemDirectoryHandle){
            if (!shallow){
              const children: fileSystemItem[] = await this.getDirectoryEntries(value as FileSystemDirectoryHandleWithFS, true);
              entries.push({ fileName: key, fileHandle: value as FileSystemDirectoryHandleWithFS, children });
            }
          } else {
            const fileData: File = await (value as FileSystemFileHandle).getFile();
            entries.push({ fileName: key, fileHandle: value, fileData });
          }
        }
        return entries;
      }
  }