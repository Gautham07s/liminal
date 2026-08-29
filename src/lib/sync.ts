/**
 * Minimal jsonbin.io wrapper for syncing encrypted data.
 * Using kv.rest or jsonbin is standard for free JSON storage, but let's use jsonbin.io API v3.
 * We'll need a Master Key. Alternatively, a completely open KV bin like jsonkeeper.
 * Since jsonbin requires an API key, and the user wants a simple Sync ID,
 * we can use https://api.jsonbin.io/v3/b as an anonymous bin if we don't pass X-Access-Key,
 * but anonymous bins can't be updated.
 * 
 * Better free alternative for simple read/write without auth:
 * jsonstorage.net (https://api.jsonstorage.net/v1/json) - supports creating and updating without auth!
 */

const API_BASE = 'https://api.jsonstorage.net/v1/json';

export async function pushToCloud(data: any): Promise<string> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create sync bin');
  const result = await res.json();
  // returns { "uri": "https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000" }
  const parts = result.uri.split('/');
  return parts[parts.length - 1]; // The Sync ID
}

export async function updateInCloud(syncId: string, data: any): Promise<void> {
  const res = await fetch(`${API_BASE}/${syncId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update sync bin');
}

export async function pullFromCloud(syncId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/${syncId}`);
  if (!res.ok) throw new Error('Failed to read sync bin');
  return res.json();
}
