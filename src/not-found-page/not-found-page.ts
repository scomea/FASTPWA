import {
  customElement,
  FASTElement,
} from "@microsoft/fast-element";
import { notFoundPageStyles } from "./not-found-page.styles";
import { html, ViewTemplate } from "@microsoft/fast-element";

/**
 * Generates a template
 *
 * @public
 */
 export const notFoundPageTemplate: ViewTemplate<NotFoundPage> = html<NotFoundPage>`
 <app-page>
  <h1>Can't find that :(-</h1>
</app-page>
`;

@customElement({
  name: "not-found-page",
  template: notFoundPageTemplate,
  styles: notFoundPageStyles,
})
export class NotFoundPage extends FASTElement {
}
