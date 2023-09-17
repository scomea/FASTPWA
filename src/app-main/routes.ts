import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-element/di';
import { RouterConfiguration } from '@microsoft/fast-router';
import { NotFoundPage } from '../pages/not-found-page/not-found-page.js';
import { SettingsPage } from '../pages/settings-page/settings-page.js';
import { defaultLayout } from '../layouts/default.layout.js';
import { ARPositionDemo } from "../sft/components/anchored-region/stories/examples/ar-position-demo.js";

type RouteSettings = {
  public?: boolean
};

export class MainRouterConfig extends RouterConfiguration<RouteSettings> {
  constructor(@Container private container: Container) {
    super();
  }

  public configure() {
    this.title = "FAST PWA";
    this.defaultLayout = defaultLayout;
    this.routes.map(
      { path: '', redirect: 'home-page' },
      { path: 'home-page', element: () => import("../pages/home-page/home-page.js").then(module => new module.HomePage()), title: 'Home', name: 'home-page' },
      { path: 'article-page', element: () => import("../pages/article-page/article-page.js").then(module => new module.ArticlePage()), title: 'Articles', name: 'article-page' },
      { path: 'article-page/{id}', element: () => import("../pages/article-page/article-page.js").then(module => new module.ArticlePage()), title: 'Articles', name: 'article-page' },
      { path: 'not-found-page', element: NotFoundPage, title: 'Not Found', name: 'not-found-page' },
      { path: 'settings-page', element: SettingsPage, title: 'Settings', name: 'settings-page' },
      { path: 'file-view-page', element: () => import("../pages/file-view-page/file-view-page.js").then(module => new module.FileViewPage()), title: 'File viewer', name: 'file-view-page', childRouters: true },
      { path: 'about-page', element: () => import("../pages/about-page/about-page.js").then(module => new module.AboutPage()), title: 'About', name: 'about-page' },
      { path: 'ae-position-page', element: () => import("../sft/components/anchored-region/stories/examples/ar-position-demo.js").then(module => new module.ARPositionDemo()), title: 'Anchored Element Positions', name: 'ae-position-page' },
      { path: 'ae-lock-view-page', element: () => import("../sft/components/anchored-region/stories/examples/ar-lockintoview.js").then(module => new module.ARLockIntoView()), title: 'Anchored Element Lock View', name: 'ae-lock-view-page' },

    );

    this.routes.fallback(
      { redirect: 'not-found-page' }
    );
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
