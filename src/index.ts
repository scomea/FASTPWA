import { DesignToken } from "@microsoft/fast-foundation";
import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { AllComponents } from "@adaptive-web/adaptive-web-components/all-components";
import { FASTRouter } from "@microsoft/fast-router";
import { AppMain } from "./app-main/app-main.js";
import { NotFoundPage } from "./pages/not-found-page/not-found-page.js";
import { SettingsPage } from "./pages/settings-page/settings-page.js";
import { AppPage } from "./components/app-page/app-page.js";

DesignToken.registerDefaultStyleTarget();

AdaptiveDesignSystem.defineComponents(AllComponents);

AppMain;
AppPage;
NotFoundPage;
FASTRouter;