import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-foundation';
import { RouterConfiguration } from '@microsoft/fast-router';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { SettingsPage } from '../settings-page/settings-page';
import { defaultLayout } from '../layouts/default.layout';

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
      { path: 'home-page', element: () => import("../home-page/home-page").then(module => new module.HomePage()), title: 'Home', name: 'home-page' },
      { path: 'article-page', element: () => import("../article-page/article-page").then(module => new module.ArticlePage()), title: 'Articles', name: 'article-page' },
      { path: 'article-page/{id}', element: () => import("../article-page/article-page").then(module => new module.ArticlePage()), title: 'Articles', name: 'article-page' },
      { path: 'not-found-page', element: NotFoundPage, title: 'Not Found', name: 'not-found-page' },
      { path: 'settings-page', element: SettingsPage, title: 'Settings', name: 'settings-page' },
      { path: 'file-view-page', element: () => import("../file-view-page/file-view-page").then(module => new module.FileViewPage()), title: 'File viewer', name: 'file-view-page', childRouters: true },
      { path: 'about-page', element: () => import("../about-page/about-page").then(module => new module.AboutPage()), title: 'About', name: 'about-page' },
    );

    this.routes.fallback(
      { redirect: 'not-found-page' }
    );
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
