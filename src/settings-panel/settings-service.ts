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

  public static toggleLightMode(newVal: boolean): void {
    baseLayerLuminance.setValueFor(
      document.body,
      newVal ? StandardLuminance.DarkMode : StandardLuminance.LightMode
    );
    localStorage.setItem("darkMode", newVal ? "true" : "false")
  };

  public static updateToken(
    newVal: number | string,
    token: DesignToken<number | string > | undefined
  ): void {
    if (!token){
      return;
    }
    token.setValueFor(
      document.body,
      newVal
    );
    localStorage.setItem(token.name, (typeof newVal === "number") ?`newval` : newVal);
  }

  public static applySavedSetting(token: CSSDesignToken<string | number>): void {
    const savedSetting: string | number | null = localStorage.getItem(token.name);
    if (savedSetting){
      token.setValueFor(
        document.body,
        typeof savedSetting === "string" ? savedSetting : Number.parseFloat(savedSetting)
      );
    }
  }

  public static clearToken(token: CSSDesignToken<string | number>): void {
    const savedSetting: string | number | null = localStorage.getItem(token.name);
    if (savedSetting){
      localStorage.removeItem(token.name);
      token.deleteValueFor(
        document.body);
    }
  }

  public static applySavedSettings(): void {
    const darkModeSetting: string | null = localStorage.getItem("darkMode");
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        document.body,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    SettingsService.applySavedSetting(controlCornerRadius);
    SettingsService.applySavedSetting(layerCornerRadius);
    SettingsService.applySavedSetting(density);
    SettingsService.applySavedSetting(strokeWidth);
    SettingsService.applySavedSetting(designUnit);
    SettingsService.applySavedSetting(disabledOpacity);
    SettingsService.applySavedSetting(baseHorizontalSpacingMultiplier);
    SettingsService.applySavedSetting(baseHeightMultiplier);

    typeRampRows.forEach(rowdata => {
      SettingsService.applySavedSetting(rowdata.fontSizeToken);
      SettingsService.applySavedSetting(rowdata.lineHeightToken);
    });
  }

  public static clearSavedSettings(): void {
    const darkModeSetting: string | null = localStorage.getItem("darkMode");
    if (darkModeSetting) {
      baseLayerLuminance.setValueFor(
        document.body,
        darkModeSetting === "true" ? StandardLuminance.DarkMode : StandardLuminance.LightMode
      );
    }
    SettingsService.clearToken(controlCornerRadius);
    SettingsService.clearToken(layerCornerRadius);
    SettingsService.clearToken(density);
    SettingsService.clearToken(strokeWidth);
    SettingsService.clearToken(designUnit);
    SettingsService.clearToken(disabledOpacity);
    SettingsService.clearToken(baseHorizontalSpacingMultiplier);
    SettingsService.clearToken(baseHeightMultiplier);

    SettingsService.clearTypeRamp();
  }

  public static clearTypeRamp(): void {
    typeRampRows.forEach(rowData => {
      SettingsService.clearTypeRampRow(rowData);
    });
  }

  public static clearTypeRampRow(rowData: typeRampRow): void {
    SettingsService.clearToken(rowData.fontSizeToken);
    SettingsService.clearToken(rowData.lineHeightToken);
  }
}