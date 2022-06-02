export interface fileSystemItem{
    fileName: string;
    fileHandle: FileSystemHandle;
    fileData?: File;
    children?: fileSystemItem[];
  }


export class FileViewService {

    public rootDirectoryHandle: undefined |  FileSystemDirectoryHandle;

    public currentPath: string = "";
    public currentDirectoryEntries: fileSystemItem[] = [];

    constructor() {}

    public getRootDirectoryHandle(): undefined |  FileSystemHandle {
        return this.rootDirectoryHandle;
    }

    public async setRootDirectoryHandle( newValue: undefined |  FileSystemDirectoryHandle): Promise<void> {
        this.rootDirectoryHandle = newValue;
        this.currentPath = ""
        this.currentDirectoryEntries.splice(0);
    }

    public setCurrentDirectory(newPath: string | undefined): void {
      this.currentDirectoryEntries.splice(0);
      if (typeof newPath === "string" && newPath !== ""){
        this.currentPath = newPath;
      } else {
        this.currentPath = "";
      }
    }

    public async getCurrentDirectoryEntries(): Promise<fileSystemItem[]> {
      if (!this.rootDirectoryHandle){
        return this.currentDirectoryEntries;
      }
      if (typeof this.currentPath === "string" && this.currentPath !== ""){
        const segments: string[] = this.currentPath.split("*");
        let handle: FileSystemDirectoryHandle = this.rootDirectoryHandle;
        for(let i = 1; i < segments.length; i++){
          handle = await handle.getDirectoryHandle(segments[i]);
          if (!handle){
            return this.currentDirectoryEntries;
          }
        }
        this.currentDirectoryEntries = await this.getDirectoryEntries(handle as FileSystemDirectoryHandleWithFS, false)
      } else {
        this.currentDirectoryEntries = await this.getDirectoryEntries(this.rootDirectoryHandle as FileSystemDirectoryHandleWithFS, false)
      }

      return this.currentDirectoryEntries;
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