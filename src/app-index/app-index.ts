import {
  customElement,
  FASTElement
} from "@microsoft/fast-element";
import { registerSW } from 'virtual:pwa-register';
import { appIndexTemplate } from "./app-index.template";
import { appIndexStyles } from "./app-index.styles";

@customElement({
  name: "app-index",
  template: appIndexTemplate,
  styles: appIndexStyles,
})
export class AppIndex extends FASTElement {

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    console.log("connected");
    registerSW({ immediate: true });
  }
}
