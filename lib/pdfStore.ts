const DB_NAME = 'lukas_teknik'
const STORE_NAME = 'pdfs'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function savePdf(id: string, file: File): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put({ blob: file, name: file.name }, id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function loadPdf(id: string): Promise<{ url: string; name: string } | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).get(id)
    req.onsuccess = () => {
      if (!req.result) { resolve(null); return }
      const url = URL.createObjectURL(req.result.blob)
      resolve({ url, name: req.result.name })
    }
    req.onerror = () => reject(req.error)
  })
}

export async function deletePdf(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
