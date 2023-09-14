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
    Source code is <fluent-anchor appearance="hypertext" href="https://github.com/scomea/FASTPWA">here</fluent-anchor>.
    <p>
    Initial template based on PWA builder's <fluent-anchor appearance="hypertext" href="https://github.com/pwa-builder/pwa-starter">starter template</fluent-anchor>.
    <p>
    UI is primarily built based on <fluent-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST</fluent-anchor> web components and the <fluent-anchor appearance="hypertext" href="https://github.com/microsoft/fluentui/tree/master/packages/web-components">Fluent</fluent-anchor> implementations of them.
    <p>
    Uses the <fluent-anchor appearance="hypertext" href="https://github.com/microsoft/fast">FAST router</fluent-anchor>.
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
