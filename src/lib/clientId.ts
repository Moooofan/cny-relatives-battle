const CLIENT_ID_KEY = "dzsg:client";

function safeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Creates (once) and persists an anonymous per-device id used only to group
 * a single device's uploaded runs — never tied to any real identity. Also
 * used as the `salt` for `makeResultCode` so two devices producing the same
 * score/turns on the same (e.g. daily) seed don't collide on the Supabase
 * `result_code` primary key. */
export function getClientId(): string {
  const storage = safeStorage();
  if (!storage) return "anonymous";
  try {
    const existing = storage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    storage.setItem(CLIENT_ID_KEY, id);
    return id;
  } catch {
    return "anonymous";
  }
}
