import {
    baseHeightMultiplier,
    baseLayerLuminance,
    baseHorizontalSpacingMultiplier,
    controlCornerRadius,
    density,
    designUnit,
    disabledOpacity,
    layerCornerRadius,
    StandardLuminance,
    strokeWidth,
    typeRampBaseFontSize,
    typeRampBaseLineHeight,
    typeRampMinus2FontSize,
    typeRampMinus2LineHeight,
    typeRampMinus1FontSize,
    typeRampMinus1LineHeight,
    typeRampPlus1FontSize,
    typeRampPlus1LineHeight,
    typeRampPlus2FontSize,
    typeRampPlus2LineHeight,
    typeRampPlus3FontSize,
    typeRampPlus3LineHeight,
    typeRampPlus4FontSize,
    typeRampPlus4LineHeight,
    typeRampPlus5FontSize,
    typeRampPlus5LineHeight,
    typeRampPlus6FontSize,
    typeRampPlus6LineHeight
} from "@fluentui/web-components";
import {
  CSSDesignToken,
  DesignToken,
} from "@microsoft/fast-foundation";


export interface typeRampRow {
  key: string,
  fontSizeToken: CSSDesignToken<string>,
  lineHeightToken: CSSDesignToken<string>,
}

export const typeRampRows: typeRampRow[] = [
  {key: "Minus2", fontSizeToken: typeRampMinus2FontSize, lineHeightToken: typeRampMinus2LineHeight},
  {key: "Minus1", fontSizeToken: typeRampMinus1FontSize, lineHeightToken: typeRampMinus1LineHeight},
  {key: "Base", fontSizeToken: typeRampBaseFontSize, lineHeightToken: typeRampBaseLineHeight},
  {key: "Plus1", fontSizeToken: typeRampPlus1FontSize, lineHeightToken: typeRampPlus1LineHeight},
  {key: "Plus2", fontSizeToken: typeRampPlus2FontSize, lineHeightToken: typeRampPlus2LineHeight},
  {key: "Plus3", fontSizeToken: typeRampPlus3FontSize, lineHeightToken: typeRampPlus3LineHeight},
  {key: "Plus4", fontSizeToken: typeRampPlus4FontSize, lineHeightToken: typeRampPlus4LineHeight},
  {key: "Plus5", fontSizeToken: typeRampPlus5FontSize, lineHeightToken: typeRampPlus5LineHeight},
  {key: "Plus6", fontSizeToken: typeRampPlus6FontSize, lineHeightToken: typeRampPlus6LineHeight},
];

export class StyleSettingsService {

  public static appRoot: HTMLElement = document.body;

  public static setAppRoot(element: HTMLElement): void{
    StyleSettingsService.appRoot = element;
  }

  public static toggleLightMode(newVal: boolean, target: HTMLElement, settingGroup?: string): void {
    baseLayerLuminance.setValueFor(
      target,
      newVal ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );

    localStorage.setItem(StyleSettingsService.settingName("darkMode", settingGroup), newVal ? "true" : "false")
  };

  public static updateToken(
    newVal: number | string,
    token: DesignToken<number | string > | undefined,
    target: HTMLElement,
    settingGroup?: string
  ): void {
    if (!token){
      return;
    }
    token.setValueFor(
      target,
      newVal
    );
    localStorage.setItem(StyleSettingsService.settingName(token.name, settingGroup), (typeof newVal === "number") ? `${newVal}` : newVal);
  }

  public static applySavedSetting(
    token: CSSDesignToken<string | number>,
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const savedSetting: string | number | null = localStorage.getItem(StyleSettingsService.settingName(token.name, settingGroup));
    if (savedSetting){
      token.setValueFor(
        target,
        typeof savedSetting === "string" ? savedSetting : Number.parseFloat(savedSetting)
      );
    }
  }

  public static clearToken(
    token: CSSDesignToken<string | number>,
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const savedSetting: string | number | null = localStorage.getItem(StyleSettingsService.settingName(token.name, settingGroup));
    if (savedSetting){
      localStorage.removeItem(StyleSettingsService.settingName(token.name, settingGroup));
    }
    token.deleteValueFor(target);
  }

  public static applySavedSettings(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const darkModeSetting: string | null = localStorage.getItem(StyleSettingsService.settingName("darkMode", settingGroup));
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        target,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    StyleSettingsService.applySavedSetting(controlCornerRadius, target, settingGroup);
    StyleSettingsService.applySavedSetting(layerCornerRadius, target, settingGroup);
    StyleSettingsService.applySavedSetting(density, target, settingGroup);
    StyleSettingsService.applySavedSetting(strokeWidth, target, settingGroup);
    StyleSettingsService.applySavedSetting(designUnit, target, settingGroup);
    StyleSettingsService.applySavedSetting(disabledOpacity, target, settingGroup);
    StyleSettingsService.applySavedSetting(baseHorizontalSpacingMultiplier, target, settingGroup);
    StyleSettingsService.applySavedSetting(baseHeightMultiplier, target, settingGroup);

    typeRampRows.forEach(rowdata => {
      StyleSettingsService.applySavedSetting(rowdata.fontSizeToken, target, settingGroup);
      StyleSettingsService.applySavedSetting(rowdata.lineHeightToken, target, settingGroup);
    });
  }

  public static clearSavedSettings(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const darkModeSetting: string | null = localStorage.getItem(StyleSettingsService.settingName("darkMode", settingGroup));
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        target,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    StyleSettingsService.clearToken(controlCornerRadius, target, settingGroup);
    StyleSettingsService.clearToken(layerCornerRadius, target, settingGroup);
    StyleSettingsService.clearToken(density, target, settingGroup);
    StyleSettingsService.clearToken(strokeWidth, target, settingGroup);
    StyleSettingsService.clearToken(designUnit, target, settingGroup);
    StyleSettingsService.clearToken(disabledOpacity, target, settingGroup);
    StyleSettingsService.clearToken(baseHorizontalSpacingMultiplier, target, settingGroup);
    StyleSettingsService.clearToken(baseHeightMultiplier, target, settingGroup);

    StyleSettingsService.clearTypeRamp(target, settingGroup);
  }

  public static clearTypeRamp(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    typeRampRows.forEach(rowData => {
      StyleSettingsService.clearTypeRampRow(rowData, target, settingGroup);
    });
  }

  public static clearTypeRampRow(
    rowData: typeRampRow,
    target: HTMLElement,
    settingGroup?: string): void {
    StyleSettingsService.clearToken(rowData.fontSizeToken, target, settingGroup);
    StyleSettingsService.clearToken(rowData.lineHeightToken, target, settingGroup);
  }

  private static settingName(baseSettingName: string, settingGroup?: string): string {
    return settingGroup ? `${settingGroup}-${baseSettingName}`: baseSettingName;
  }
}