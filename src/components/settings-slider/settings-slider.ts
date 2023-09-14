// import {
//   attr,
//   customElement,
//   FASTElement,
//   observable,
//   ref
// } from "@microsoft/fast-element";
// import { html, ViewTemplate } from "@microsoft/fast-element";
// import {
//   CSSDesignToken,
//   Slider,
// } from "@microsoft/fast-foundation";
// import { StyleSettingsService } from "../style-settings-panel/style-settings-service";
// import { settingsSliderStyles } from "./settings-slider.styles";

// /**
//  * Generates a template
//  *
//  * @public
//  */
//  export const settingsSliderTemplate: ViewTemplate<SettingsSlider> = html<SettingsSlider>`
//   <fluent card
//     class="container"
//   >
//       <h4 id="label" class="label">${x => x.sliderLabel}</h4>
//       <fluent-slider
//         class="slider"
//         aria-labelledby="label"
//         :value="${x => `${x.token?.getValueFor(x.target)}`}"
//         @change="${(x, c) => x.updateToken(c.event)}"
//         min="${x => x.min}"
//         max="${x => x.max}"
//         step="${x => x.step}"
//         ${ref('slider')}
//       >
//       <slot></slot>
//       <fluent-slider-label
//         position="${x => x.token?.getValueFor(x.target)}"
//       >
//         ${x => x.token?.getValueFor(x.target)}
//       </fluent-slider-label>
//     </fluent-slider>
//     <fluent-button
//       class="reset-btn"
//       appearance="stealth"
//       @click="${(x, c) => x.resetToken(c.event)}"
//     >
//       reset
//     </fluent-button>
//   </fluent-card>
// `;

// @customElement({
//   name: "settings-slider",
//   template: settingsSliderTemplate,
//   styles: settingsSliderStyles,
// })
// export class SettingsSlider extends FASTElement {

//   @attr({ attribute: "slider-label" })
//   public sliderLabel: string = "";

//   @attr({ attribute: "min" })
//   public min: string | undefined;

//   @attr({ attribute: "max" })
//   public max: string | undefined;

//   @attr({ attribute: "step" })
//   public step: number | undefined;

//   @observable
//   public token: CSSDesignToken<number> | undefined;

//   @observable
//   public target: HTMLElement = document.body;

//   public slider: Slider | undefined;

//   public updateToken(e: Event): void {
//     if (!this.token || !this.target){
//       return;
//     }
//     StyleSettingsService.updateToken((e.target as Slider).valueAsNumber, this.token, this.target)
//   }

//   public resetToken(e: Event): void {
//     if (!this.token || !this.target || !this.slider){
//       return;
//     }
//     StyleSettingsService.clearToken(this.token, this.target);
//     this.slider.value = `${this.token.getValueFor(this.target)}`;
//   }
// }