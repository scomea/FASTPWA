import { css, html } from "@microsoft/fast-element";
import { FASTElementLayout } from "@microsoft/fast-router";
import { NavBar } from "../nav-bar/nav-bar";

NavBar;

export const navBarLayout = new FASTElementLayout(
  html`
    <div class="container">
      <nav-bar class="navbar"></nav-bar>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  `,
  css`
    .container {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 180px 1fr;
    }

    .navbar {
      z-index: 100;
      grid-column: 1;
    }

    .content {
      overflow: auto;
      width: 100%;
      height: 100%;
      grid.column: 2;
    }
  `
);