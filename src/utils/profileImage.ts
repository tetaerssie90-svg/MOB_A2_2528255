import * as FileSystem from "expo-file-system/legacy";

const IMAGE_DIR = `${FileSystem.documentDirectory}profile/`;

/**
 * Picker results live in a cache folder that Android may clear, so the chosen photo
 * is copied into the app's private document directory before its URI is saved.
 */
export async function persistProfileImage(sourceUri: string): Promise<string> {
  await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true }).catch(() => undefined);
  const extension = sourceUri.split(".").pop()?.split("?")[0] || "jpg";
  const target = `${IMAGE_DIR}avatar-${Date.now()}.${extension}`;
  await FileSystem.copyAsync({ from: sourceUri, to: target });
  return target;
}

export async function deleteProfileImage(uri: string | null | undefined): Promise<void> {
  if (!uri || !uri.startsWith(IMAGE_DIR)) return;
  await FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => undefined);
}

export async function profileImageExists(uri: string | null): Promise<boolean> {
  if (!uri) return false;
  const info = await FileSystem.getInfoAsync(uri).catch(() => null);
  return Boolean(info?.exists);
}
