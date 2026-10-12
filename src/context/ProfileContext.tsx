import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultProfile } from "../data/portfolio";
import type { EditableProfile } from "../types";
import { clearProfile, loadProfile, saveProfile } from "../utils/storage";
import { deleteProfileImage, profileImageExists } from "../utils/profileImage";

type LoadState = "loading" | "ready" | "error";

type ProfileContextType = {
  profile: EditableProfile;
  status: LoadState;
  /** True once the user has saved at least once (vs. showing the built-in defaults) */
  isCustomised: boolean;
  lastSavedAt: number | null;
  update: (next: EditableProfile) => Promise<void>;
  reset: () => Promise<void>;
  reload: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<EditableProfile>(defaultProfile);
  const [status, setStatus] = useState<LoadState>("loading");
  const [isCustomised, setIsCustomised] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setStatus("loading");
    try {
      const saved = await loadProfile();
      if (saved) {
        // The photo file can disappear (e.g. app data partially cleared); fall back to the avatar.
        const imageOk = await profileImageExists(saved.imageUri);
        setProfile({ ...saved, imageUri: imageOk ? saved.imageUri : null });
        setIsCustomised(true);
      } else {
        setProfile(defaultProfile);
        setIsCustomised(false);
      }
      setStatus("ready");
    } catch {
      setProfile(defaultProfile);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const update = useCallback(
    async (next: EditableProfile) => {
      const previousImage = profile.imageUri;
      await saveProfile(next);
      if (previousImage && previousImage !== next.imageUri) {
        await deleteProfileImage(previousImage);
      }
      setProfile(next);
      setIsCustomised(true);
      setLastSavedAt(Date.now());
    },
    [profile.imageUri]
  );

  const reset = useCallback(async () => {
    await clearProfile();
    await deleteProfileImage(profile.imageUri);
    setProfile(defaultProfile);
    setIsCustomised(false);
    setLastSavedAt(null);
  }, [profile.imageUri]);

  const value = useMemo(
    () => ({ profile, status, isCustomised, lastSavedAt, update, reset, reload }),
    [profile, status, isCustomised, lastSavedAt, update, reset, reload]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}
