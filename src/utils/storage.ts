import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKeys } from "../constants/app";
import type { Availability, EditableProfile } from "../types";

const availabilityValues: Availability[] = ["open", "internship", "busy"];

function isStoredProfile(value: unknown): value is EditableProfile {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.headline === "string" &&
    typeof v.bio === "string" &&
    typeof v.primarySkill === "string" &&
    availabilityValues.includes(v.availability as Availability) &&
    (v.imageUri === null || typeof v.imageUri === "string")
  );
}

/** Returns null when nothing is saved yet or the stored value is unreadable */
export async function loadProfile(): Promise<EditableProfile | null> {
  const raw = await AsyncStorage.getItem(storageKeys.profile);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStoredProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveProfile(profile: EditableProfile): Promise<void> {
  await AsyncStorage.setItem(storageKeys.profile, JSON.stringify(profile));
}

export async function clearProfile(): Promise<void> {
  await AsyncStorage.removeItem(storageKeys.profile);
}
