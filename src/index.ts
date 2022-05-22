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
    fluentSwitch,
    fluentTextField,
    provideFluentDesignSystem
} from "@fluentui/web-components";
import { FASTRouter } from "@microsoft/fast-router"
import { AboutScreen } from "./about-screen/about-screen";
import { AppMain } from "./app-main/app-main";
import { ArticleView } from "./article-view/article-view";
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
    fluentSliderLabel(),
    fluentSwitch()
);

AboutScreen;
AppMain;
ArticleView;
HomeScreen;
NavBar;
NotFound;
FASTRouter;
SettingsPanel;