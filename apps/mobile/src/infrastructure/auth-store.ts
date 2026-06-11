import * as SecureStore from "expo-secure-store";
import { AuthSession } from "../domain/types";

const SESSION_KEY = "evoflow.auth.session";
const LEGACY_SESSION_KEY = "habiflow.auth.session";

export async function loadAuthSession(): Promise<AuthSession | null> {
  const legacy = await SecureStore.getItemAsync(LEGACY_SESSION_KEY);
  const raw = await SecureStore.getItemAsync(SESSION_KEY);
  if (raw) {
    return JSON.parse(raw) as AuthSession;
  }
  if (legacy) {
    await SecureStore.setItemAsync(SESSION_KEY, legacy);
    await SecureStore.deleteItemAsync(LEGACY_SESSION_KEY);
    return JSON.parse(legacy) as AuthSession;
  }
  return null;
}

export async function saveAuthSession(session: AuthSession): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function clearAuthSession(): Promise<void> {
  await Promise.all([SecureStore.deleteItemAsync(SESSION_KEY), SecureStore.deleteItemAsync(LEGACY_SESSION_KEY)]);
}
