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

import { AppIndex } from "./app-index/app-index";


provideFluentDesignSystem().register(
    fluentDesignSystemProvider(),
    fluentButton(),
    fluentCheckbox(),
    fluentTextField(),
    fluentCard(),
    fluentSlider(),
    fluentSliderLabel()
);

AppIndex;