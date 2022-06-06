import {
    fluentAnchor,
    fluentAnchoredRegion,
    fluentBreadcrumb,
    fluentBreadcrumbItem,
    fluentButton,
    fluentCard,
    fluentCheckbox,
    fluentDataGrid,
    fluentDataGridRow,
    fluentDataGridCell,
    fluentDesignSystemProvider,
    fluentDivider,
    fluentMenu,
    fluentMenuItem,
    fluentSlider,
    fluentSliderLabel,
    fluentSwitch,
    fluentTextField,
    provideFluentDesignSystem
} from "@fluentui/web-components";
import { FASTRouter } from "@microsoft/fast-router"
import { AppMain } from "./app-main/app-main";
import { NavBar } from "./nav-bar/nav-bar";
import { NotFound } from "./not-found/not-found";
import { SettingsPanel } from "./settings-panel/settings-panel";


provideFluentDesignSystem().register(
    fluentAnchor(),
    fluentAnchoredRegion(),
    fluentDesignSystemProvider(),
    fluentBreadcrumb(),
    fluentBreadcrumbItem(),
    fluentButton(),
    fluentCheckbox(),
    fluentDataGrid(),
    fluentDataGridRow(),
    fluentDataGridCell(),
    fluentDivider(),
    fluentTextField(),
    fluentMenu(),
    fluentMenuItem(),
    fluentCard(),
    fluentSlider(),
    fluentSliderLabel(),
    fluentSwitch(),
    fluentTextField(),
);

AppMain;
NavBar;
NotFound;
FASTRouter;
SettingsPanel;