// lib/cache.ts
// Unified In-Memory & LocalStorage Cache with Time-To-Live (TTL)

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export function getCachedData<T>(key: string, ttlMs = DEFAULT_TTL_MS): T | null {
  const now = Date.now();

  // 1. Check in-memory cache first (fastest - 0ms)
  const memEntry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (memEntry && now - memEntry.timestamp < ttlMs) {
    return memEntry.data;
  }

  // 2. Check localStorage cache if in browser environment
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`hs_cache_${key}`);
      if (stored) {
        const parsed: CacheEntry<T> = JSON.parse(stored);
        if (now - parsed.timestamp < ttlMs) {
          // Sync into memory cache
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
  };

  // 1. Save in memory cache
  memoryCache.set(key, entry);

  // 2. Save in localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`hs_cache_${key}`, JSON.stringify(entry));
    } catch {
      // Storage full or quota exceeded
    }
  }
}

export function invalidateCache(keyPrefix?: string): void {
  if (keyPrefix) {
    for (const key of memoryCache.keys()) {
      if (key.startsWith(keyPrefix)) {
        memoryCache.delete(key);
      }
    }
    if (typeof window !== 'undefined') {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith(`hs_cache_${keyPrefix}`)) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        // Ignore storage errors
      }
    }
  } else {
    memoryCache.clear();
    if (typeof window !== 'undefined') {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith('hs_cache_')) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        // Ignore storage errors
      }
    }
  }
}
