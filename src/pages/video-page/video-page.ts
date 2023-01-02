import {
  customElement,
  FASTElement,
  observable,
  ref
} from "@microsoft/fast-element";
import { ColumnDefinition, DataGrid, DataGridCell, inject } from "@microsoft/fast-foundation";
import { videoPageStyles } from "./video-page.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";

function getFocusTarget(cell: DataGridCell): HTMLElement {
  return cell.children[0] as HTMLElement;
}

const labelCellTemplate = html`
<template>
    <fluent-button
      class="filename-button"
      @click="${x => x.$emit('playmedia', x.rowData)}"
      appearance="stealth"
    >
    ${x =>
      x.rowData.label
    }
    </fluent-button>
  </template>
`;

/**
 * Generates a template
 *
 * @public
 */
 export const videoPageTemplate: ViewTemplate<VideoPage> = html<VideoPage>`
 <app-page>
    <h1>Video feed</h1>
    <p>
    To test videos
    <p>
    <video
      class="video"
      ${ref('videoElement')}
    ></video>
    <fluent-data-grid
      class="devices"
      :rowsData="${x => x.devices}"
      grid-template-columns="1fr 120px 120px 200px"
      ${ref('gridElement')}
    ></fluent-data-grid>
</app-page>
`;

const baseColumns: ColumnDefinition[] = [
  { columnDataKey: "label",
    title:"Label",
    cellTemplate: labelCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
  },
  {
    columnDataKey: "kind",
    title:"Kind",
  },
  {
    columnDataKey: "groupId",
    title:"Group ID",
  },
  {
    columnDataKey: "deviceId",
    title:"Device ID",
  },
];

@customElement({
  name: "video-page",
  template: videoPageTemplate,
  styles: videoPageStyles,
})

export class VideoPage extends FASTElement {

  @observable
  public videoElement: HTMLVideoElement | undefined;

  @observable
  public gridElement: DataGrid | undefined;

  @observable
  public devices: object[] =  [];

  public connectedCallback(): void {
    super.connectedCallback();

    if (this.gridElement){
      this.gridElement.columnDefinitions = baseColumns;
      this.gridElement.generateHeader = "default";
    }

    this.addEventListener("playmedia", this.handlePlayMedia);

    this.updateDevices();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("playmedia", this.handlePlayMedia);
  }

  public handlePlayMedia = (e: Event): void => {
    const device: MediaDeviceInfo = (e as CustomEvent).detail as MediaDeviceInfo;
    this.playMedia(device);
  }

  private updateDevices(): void {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        if (device.kind === "videoinput") {
          this.devices.push(device);
        }
      });
    });
  }

  private playMedia(device: MediaDeviceInfo): void {

    const constraints = {
      video: {
        deviceId: device.deviceId
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        if (this.videoElement){
          this.videoElement.srcObject = mediaStream;
          this.videoElement.onloadedmetadata = () => {
            if (this.videoElement){
              this.videoElement.play();
            }
          };
        }
      })
  }
}
