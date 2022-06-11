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
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { AppPage } from "./app-page/app-page";


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
AppPage;
NotFoundPage;
FASTRouter;
SettingsPage;