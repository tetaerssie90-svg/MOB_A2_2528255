import Constants from "expo-constants";

export const appVersion = Constants.expoConfig?.version ?? "1.0.0";

export const storageKeys = {
  profile: "@tetaportfolio/profile",
} as const;

export const dataUseStatement =
  "Your edited profile and the photo you choose are stored only on this device using " +
  "AsyncStorage and the app's private folder. Nothing is uploaded, shared or tracked. " +
  "Use Reset profile in the editor to delete the saved data at any time.";
