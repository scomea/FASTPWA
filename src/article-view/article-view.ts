import {
  customElement,
  FASTElement,
  html,
  ref,
  ViewTemplate
} from "@microsoft/fast-element";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { articleViewStyles } from "./article-view.styles";

/**
 * Generates a template
 *
 * @public
 */
 export const articleViewTemplate: ViewTemplate<ArticleView> = html<ArticleView>`
  <iframe
    class="frame"
    ${ref("frame")}
  >
  </iframe>
`;

@customElement({
  name: "article-view",
  template: articleViewTemplate,
  styles: articleViewStyles,
})

export class ArticleView extends FASTElement {
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
