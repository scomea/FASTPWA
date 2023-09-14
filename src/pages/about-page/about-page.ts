import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { aboutPageStyles } from "./about-page.styles.js";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const aboutPageTemplate: ViewTemplate<AboutPage> = html<AboutPage>`
 <app-page>
    <img class="image" src='assets/images/beach.jpg'>
    <h1>About this PWA</h1>
    <p>
    A project by Stephane Comeau.
    <p>
    Source code is <adaptive-anchor appearance="hypertext" href="https://github.com/scomea/FASTPWA">here</adaptive-anchor>.
    <p>
    Initial template based on PWA builder's <adaptive-anchor appearance="hypertext" href="https://github.com/pwa-builder/pwa-starter">starter template</adaptive-anchor>.
    <p>
    UI is primarily built based on <adaptive-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST</adaptive-anchor> web components and the <adaptive-anchor appearance="hypertext" href="https://github.com/microsoft/adaptiveui/tree/master/packages/web-components">adaptive</adaptive-anchor> implementations of them.
    <p>
    Uses the <adaptive-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST router</adaptive-anchor>.
    <p>

    </app-page>
`;

@customElement({
  name: "about-page",
  template: aboutPageTemplate,
  styles: aboutPageStyles,
})
export class AboutPage extends FASTElement {
}
