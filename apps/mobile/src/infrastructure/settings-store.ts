import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeMode } from "../domain/types";

const SETTINGS_KEY = "evoflow.settings";
const LEGACY_SETTINGS_KEY = "habiflow.settings";

export interface UserSettings {
  theme: ThemeMode;
  dashboardDays: number;
}

export const defaultSettings: UserSettings = {
  theme: "system",
  dashboardDays: 3
};

export async function loadSettings(): Promise<UserSettings> {
  const legacy = await AsyncStorage.getItem(LEGACY_SETTINGS_KEY);
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (raw) {
    return { ...defaultSettings, ...JSON.parse(raw) };
  }
  if (legacy) {
    await AsyncStorage.setItem(SETTINGS_KEY, legacy);
    await AsyncStorage.removeItem(LEGACY_SETTINGS_KEY);
    return { ...defaultSettings, ...JSON.parse(legacy) };
  }
  return defaultSettings;
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
