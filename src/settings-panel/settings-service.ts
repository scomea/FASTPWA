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

export class SettingsService {

  public static appRoot: HTMLElement = document.body;

  public static setAppRoot(element: HTMLElement): void{
    SettingsService.appRoot = element;
  }

  public static toggleLightMode(newVal: boolean, target: HTMLElement, settingGroup?: string): void {
    baseLayerLuminance.setValueFor(
      target,
      newVal ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );

    localStorage.setItem(SettingsService.settingName("darkMode", settingGroup), newVal ? "true" : "false")
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
    localStorage.setItem(SettingsService.settingName(token.name, settingGroup), (typeof newVal === "number") ? `${newVal}` : newVal);
  }

  public static applySavedSetting(
    token: CSSDesignToken<string | number>,
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const savedSetting: string | number | null = localStorage.getItem(SettingsService.settingName(token.name, settingGroup));
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
    const savedSetting: string | number | null = localStorage.getItem(SettingsService.settingName(token.name, settingGroup));
    if (savedSetting){
      localStorage.removeItem(SettingsService.settingName(token.name, settingGroup));
      token.deleteValueFor(target);
    }
  }

  public static applySavedSettings(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const darkModeSetting: string | null = localStorage.getItem(SettingsService.settingName("darkMode", settingGroup));
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        target,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    SettingsService.applySavedSetting(controlCornerRadius, target, settingGroup);
    SettingsService.applySavedSetting(layerCornerRadius, target, settingGroup);
    SettingsService.applySavedSetting(density, target, settingGroup);
    SettingsService.applySavedSetting(strokeWidth, target, settingGroup);
    SettingsService.applySavedSetting(designUnit, target, settingGroup);
    SettingsService.applySavedSetting(disabledOpacity, target, settingGroup);
    SettingsService.applySavedSetting(baseHorizontalSpacingMultiplier, target, settingGroup);
    SettingsService.applySavedSetting(baseHeightMultiplier, target, settingGroup);

    typeRampRows.forEach(rowdata => {
      SettingsService.applySavedSetting(rowdata.fontSizeToken, target, settingGroup);
      SettingsService.applySavedSetting(rowdata.lineHeightToken, target, settingGroup);
    });
  }

  public static clearSavedSettings(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    const darkModeSetting: string | null = localStorage.getItem(SettingsService.settingName("darkMode", settingGroup));
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        target,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    SettingsService.clearToken(controlCornerRadius, target, settingGroup);
    SettingsService.clearToken(layerCornerRadius, target, settingGroup);
    SettingsService.clearToken(density, target, settingGroup);
    SettingsService.clearToken(strokeWidth, target, settingGroup);
    SettingsService.clearToken(designUnit, target, settingGroup);
    SettingsService.clearToken(disabledOpacity, target, settingGroup);
    SettingsService.clearToken(baseHorizontalSpacingMultiplier, target, settingGroup);
    SettingsService.clearToken(baseHeightMultiplier, target, settingGroup);

    SettingsService.clearTypeRamp(target, settingGroup);
  }

  public static clearTypeRamp(
    target: HTMLElement,
    settingGroup?: string
  ): void {
    typeRampRows.forEach(rowData => {
      SettingsService.clearTypeRampRow(rowData, target, settingGroup);
    });
  }

  public static clearTypeRampRow(
    rowData: typeRampRow,
    target: HTMLElement,
    settingGroup?: string): void {
    SettingsService.clearToken(rowData.fontSizeToken, target, settingGroup);
    SettingsService.clearToken(rowData.lineHeightToken, target, settingGroup);
  }

  private static settingName(baseSettingName: string, settingGroup?: string): string {
    return settingGroup ? `${settingGroup}-${baseSettingName}`: baseSettingName;
  }
}