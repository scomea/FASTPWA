import {
    fluentButton,
    fluentCard,
    fluentCheckbox,
    fluentDesignSystemProvider,
    fluentSlider,
    fluentSliderLabel,
    fluentTextField,
    provideFluentDesignSystem,
} from "@fluentui/web-components";
import {FASTRouter} from "@microsoft/fast-router"

import { AppMain } from "./app-main/app-main";
import { NotFound } from "./not-found/not-found";
import { HomeScreen } from "./home-screen/home-screen";


provideFluentDesignSystem().register(
    fluentDesignSystemProvider(),
    fluentButton(),
    fluentCheckbox(),
    fluentTextField(),
    fluentCard(),
    fluentSlider(),
    fluentSliderLabel()
);

AppMain;
HomeScreen;
NotFound;
FASTRouter;