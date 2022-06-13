export interface showSaveFilePickerOptions {
}

export interface showOpenFilePickerOptions {
}


declare global {
    interface WindowWithFS extends Window {
        showDirectoryPicker: () => FileSystemDirectoryHandle,
        showOpenFilePicker: (options?: showOpenFilePickerOptions) => FileSystemFileHandle[],
        showSaveFilePicker: (options?: showSaveFilePickerOptions) => FileSystemFileHandle,
    }
}

declare global {
    interface FileSystemDirectoryHandleWithFS extends FileSystemDirectoryHandle {
        entries: () => any[],
    }
}