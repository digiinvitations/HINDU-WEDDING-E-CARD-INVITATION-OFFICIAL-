import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { uploadChunkToDb, fetchChunksFromDb } from "./supabase";

const CHUNK_SIZE = 500000;
const DIRECT_RETURN_THRESHOLD = 50000; // 50KB

export async function uploadToFsdb(base64: string): Promise<string> {
  // If it's small enough, just return the base64 directly to save reads/writes
  if (base64.length < DIRECT_RETURN_THRESHOLD) {
    return base64;
  }

  const fileId = `fsdb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const chunks = [];
  
  for (let i = 0; i < base64.length; i += CHUNK_SIZE) {
    chunks.push(base64.substring(i, i + CHUNK_SIZE));
  }

  for (let i = 0; i < chunks.length; i++) {
    const chunkId = `${fileId}_${i}`;
    const chunkData = {
      chunkId,
      fileId,
      index: i,
      data: chunks[i],
      totalChunks: chunks.length,
      createdAt: new Date().toISOString()
    };

    await uploadChunkToDb(chunkData, async () => {
      await setDoc(doc(db, "fsFiles", chunkId), {
        fileId,
        index: i,
        data: chunks[i],
        totalChunks: chunks.length,
        createdAt: chunkData.createdAt
      });
    });
  }

  return `fsdb://${fileId}`;
}

const memoryCache = new Map<string, string>();

// Simple IndexedDB wrapper for persistent caching
function getIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FSDB_Cache", 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getFromIDB(key: string): Promise<string | null> {
  try {
    const db = await getIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    return null;
  }
}

async function saveToIDB(key: string, value: string): Promise<void> {
  try {
    const db = await getIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    // Ignore
  }
}

export function transformGoogleDriveUrl(url: string): string {
  if (!url) return url;
  
  // Handle drive.google.com/file/d/ID/view format
  const match1 = url.match(/\/file\/d\/([^/]+)/);
  if (match1 && match1[1]) {
    return `https://drive.google.com/uc?export=download&id=${match1[1]}`;
  }
  
  // Handle drive.google.com/open?id=ID format
  const match2 = url.match(/id=([^&]+)/);
  if (url.includes('drive.google.com') && match2 && match2[1]) {
    return `https://drive.google.com/uc?export=download&id=${match2[1]}`;
  }
  
  return url;
}

export async function fetchFromFsdb(fileUrl: string): Promise<string> {
  if (!fileUrl) return fileUrl;
  if (!fileUrl.startsWith("fsdb://")) return transformGoogleDriveUrl(fileUrl);
  
  if (memoryCache.has(fileUrl)) {
    return memoryCache.get(fileUrl)!;
  }

  const idbCache = await getFromIDB(fileUrl);
  if (idbCache) {
    memoryCache.set(fileUrl, idbCache);
    return idbCache;
  }

  const fileId = fileUrl.replace("fsdb://", "");

  const result = await fetchChunksFromDb(fileId, async () => {
    const q = query(
      collection(db, "fsFiles"),
      where("fileId", "==", fileId)
    );
    
    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) return "";

      const sortedDocs = [...snapshot.docs].sort((a, b) => {
        const indexA = a.data().index ?? 0;
        const indexB = b.data().index ?? 0;
        return indexA - indexB;
      });

      let base64 = "";
      sortedDocs.forEach(doc => {
        base64 += doc.data().data;
      });
      return base64;
    } catch (error) {
      const errMsg = String(error);
      if (errMsg.includes("Quota") || errMsg.includes("quota") || errMsg.includes("billing")) {
        console.warn(
          "⚠️ Firestore daily quota limit has been exceeded. If you are migrating to Supabase, please copy the updated SQL script from the Admin Panel, run it in your Supabase Dashboard SQL Editor, and the application will seamlessly transition and read/write entirely through Supabase instead of Firestore!",
          error
        );
      } else {
        console.error("Error fetching from fsdb:", error);
      }
      return "";
    }
  });

  if (result) {
    memoryCache.set(fileUrl, result);
    saveToIDB(fileUrl, result);
  }
  return result;
}
