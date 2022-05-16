import {
    fluentAnchoredRegion,
    fluentButton,
    fluentCard,
    fluentCheckbox,
    fluentDesignSystemProvider,
    fluentMenu,
    fluentMenuItem,
    fluentSlider,
    fluentSliderLabel,
    fluentTextField,
    provideFluentDesignSystem,
} from "@fluentui/web-components";
import {FASTRouter} from "@microsoft/fast-router"

import { AppMain } from "./app-main/app-main";
import { HomeScreen } from "./home-screen/home-screen";
import { NavBar } from "./nav-bar/nav-bar";
import { NotFound } from "./not-found/not-found";
import { SettingsPanel } from "./settings-panel/settings-panel";


provideFluentDesignSystem().register(
    fluentAnchoredRegion(),
    fluentDesignSystemProvider(),
    fluentButton(),
    fluentCheckbox(),
    fluentTextField(),
    fluentMenu(),
    fluentMenuItem(),
    fluentCard(),
    fluentSlider(),
    fluentSliderLabel()
);

AppMain;
HomeScreen;
NavBar;
NotFound;
FASTRouter;
SettingsPanel;