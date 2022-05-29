import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-foundation';
import { RouterConfiguration } from '@microsoft/fast-router';
import { NotFound } from '../not-found/not-found';
import { SettingsPanel } from '../settings-panel/settings-panel';
import { navBarLayout } from '../layouts/nav-bar.layout';

type RouteSettings = {
  public?: boolean
};

export class MainRouterConfig extends RouterConfiguration<RouteSettings> {
  constructor(@Container private container: Container) {
    super();
  }

  public configure() {
    this.title = "FAST PWA";
    this.defaultLayout = navBarLayout;
    this.routes.map(
      { path: '', redirect: 'home-screen' },
      { path: 'home-screen', element: () => import("../home-screen/home-screen").then(module => new module.HomeScreen()), title: 'Home', name: 'home-screen' },
      { path: 'article', element: () => import("../article-view/article-view").then(module => new module.ArticleView()), title: 'Article', name: 'article' },
      { path: 'article/{id}', element: () => import("../article-view/article-view").then(module => new module.ArticleView()), title: 'Article', name: 'article' },
      { path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found', layout: navBarLayout },
      { path: 'settings-panel', element: SettingsPanel, title: 'Settings', name: 'settings-panel', layout: navBarLayout },
      { path: 'file-view', element: () => import("../file-view/file-view").then(module => new module.FileView()), title: 'File viewer', name: 'file-view' },
      { path: 'about-screen', element: () => import("../about-screen/about-screen").then(module => new module.AboutScreen()), title: 'About', name: 'about-screen' },
    );

    this.routes.fallback(
      { redirect: 'not-found' }
    );
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
