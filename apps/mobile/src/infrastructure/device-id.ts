import AsyncStorage from "@react-native-async-storage/async-storage";

const DEVICE_ID_KEY = "evoflow.deviceId";
const LEGACY_DEVICE_ID_KEY = "habiflow.deviceId";

export async function getOrCreateDeviceId(): Promise<string> {
  const legacy = await AsyncStorage.getItem(LEGACY_DEVICE_ID_KEY);
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (existing) {
    return existing;
  }
  if (legacy) {
    await AsyncStorage.setItem(DEVICE_ID_KEY, legacy);
    await AsyncStorage.removeItem(LEGACY_DEVICE_ID_KEY);
    return legacy;
  }
  const value = `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, value);
  return value;
}
