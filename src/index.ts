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
import { NotFound } from "./not-found/not-found";
import { SettingsScreen } from "./settings-screen/settings-screen";


provideFluentDesignSystem().register(
    fluentAnchor(),
    fluentAnchoredRegion(),
    fluentDesignSystemProvider(),
    fluentBreadcrumb(),
    fluentBreadcrumbItem(),
    fluentButton(),
    fluentCard(),
    fluentCheckbox(),
    fluentDataGrid(),
    fluentDataGridRow(),
    fluentDataGridCell(),
    fluentDivider(),
    fluentTextField(),
    fluentMenu(),
    fluentMenuItem(),
    fluentSlider(),
    fluentSliderLabel(),
    fluentSwitch(),
    fluentTextField(),
);

AppMain;
NotFound;
FASTRouter;
SettingsScreen;