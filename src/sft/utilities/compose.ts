import type {
    ElementStyles,
    ElementViewTemplate,
    ShadowRootOptions
} from '@microsoft/fast-element';
import type { StaticallyComposableHTML } from "@microsoft/fast-foundation";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import type { StyleModuleTarget, Styles } from "@adaptive-web/adaptive-ui";

/**
 * Configuration options for composing an element definition.
 * 
 * @internal
 */
export type ComposeOptions<TSource, TStatics extends string = any> = {
    template?: (ds: DesignSystem) => ElementViewTemplate<TSource, any>;
    styles?: ElementStyles | ElementStyles[];
    styleModules?: Iterable<readonly [StyleModuleTarget, Styles]>;
    shadowOptions?: Partial<ShadowRootOptions>;
    elementOptions?: ElementDefinitionOptions;
    statics?: Record<TStatics, StaticallyComposableHTML>;
}
