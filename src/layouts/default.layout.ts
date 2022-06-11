import { css, html } from "@microsoft/fast-element";
import { FASTElementLayout } from "@microsoft/fast-router";

export const defaultLayout = new FASTElementLayout(
  html`
    <div class="container">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  `,
  css`
    .container {
      width: 100%;
      height: 100%;
    }

    .content {
      overflow: auto;
      width: 100%;
      height: 100%;
    }
  `
);