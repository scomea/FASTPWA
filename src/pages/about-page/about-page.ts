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
    Source code is <a href="https://github.com/scomea/FASTPWA">here</a>.
    <p>
    Initial template based on PWA builder's <a href="https://github.com/pwa-builder/pwa-starter">starter template</a>.
    <p>
    UI is primarily built based on <a href="https://github.com/microsoft/fast">FAST</a> web components and the <a href="https://github.com/microsoft/adaptiveui/tree/master/packages/web-components">adaptive</a> implementations of them.
    <p>
    Uses the <a href="https://github.com/microsoft/fast">FAST router</a>.
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
