import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-foundation';
import { RouterConfiguration } from '@microsoft/fast-router';
import { HomeScreen } from '../home-screen/home-screen';
import { NotFound } from '../not-found/not-found';

type RouteSettings = {
  public?: boolean
};


export class MainRouterConfig extends RouterConfiguration<RouteSettings> {
  constructor(@Container private container: Container) {
    super();
  }

  public configure() {
    this.title = "Steph's FAST PWA";
    this.routes.map(
      { path: '', redirect: 'home-screen' },
      { path: 'home-screen', element: HomeScreen, title: 'Home', name: 'home-screen' },
      { path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found' }
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