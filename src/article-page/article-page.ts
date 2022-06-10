import {
  customElement,
  FASTElement,
  html,
  ref,
  ViewTemplate
} from "@microsoft/fast-element";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { articlePageStyles } from "./article-page.styles";

/**
 * Generates a template
 *
 * @public
 */
 export const articlePageTemplate: ViewTemplate<ArticlePage> = html<ArticlePage>`
 <app-page
  class="page"
 >
    <iframe
      class="frame"
      ${ref("frame")}
    >
    </iframe>
  </app-page>
`;

@customElement({
  name: "article-view",
  template: articlePageTemplate,
  styles: articlePageStyles,
})

export class ArticlePage extends FASTElement {
  /**
   * reference to the iframe
   *
   * @internal
   */
  public frame: HTMLIFrameElement | undefined;

  public connectedCallback(): void {
    super.connectedCallback();
  }

  async enter(phase: NavigationPhase) {
    const childRoute = phase.route.allParams['id'];

    if (childRoute && this.frame) {
      this.frame.src = `assets/articles/${childRoute}.html`
    } else {
      phase.cancel(() => Route.path.replace(`not-found`));
    }
  }
}
