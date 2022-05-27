import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-foundation';
import { RouterConfiguration } from '@microsoft/fast-router';
import { ArticleView } from "../article-view/article-view";
import { HomeScreen } from '../home-screen/home-screen';
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
      { path: 'home-screen', element: HomeScreen, title: 'Home', name: 'home-screen', layout: navBarLayout },
      { path: 'article', element: ArticleView, title: 'Article', name: 'article', layout: navBarLayout},
      { path: 'article/{id}', element: ArticleView, title: 'Article', name: 'article', layout: navBarLayout },
      { path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found', layout: navBarLayout },
      { path: 'settings-panel', element: SettingsPanel, title: 'Settings', name: 'settings-panel', layout: navBarLayout },
      { path: 'about-screen', element: () => import("../about-screen/about-screen").then(module => new module.AboutScreen()), title: 'About', name: 'about-screen', layout: navBarLayout },
    );

    this.routes.fallback(
      { redirect: 'not-found' }
    );

    // this.contributors.push({
    //   navigate(phase) {
    //     const settings = phase.route.settings;

    //     if (settings && settings.public) {
    //       return;
    //     }

    //     phase.cancel(() => {
    //       Route.name.replace(phase.router, 'login');
    //     });
    //   }
    // });
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
