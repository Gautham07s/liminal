/**
 * Web Crypto API wrapper for AES-GCM encryption/decryption
 */

function generateKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  ).then(keyMaterial => {
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  });
}

export async function encryptData(password: string, data: string): Promise<{ ciphertext: string, salt: string, iv: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const key = await generateKey(password, salt);
  const enc = new TextEncoder();
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(data)
  );

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    salt: btoa(String.fromCharCode(...salt)),
    iv: btoa(String.fromCharCode(...iv))
  };
}

export async function decryptData(password: string, ciphertext: string, saltBase64: string, ivBase64: string): Promise<string> {
  const salt = new Uint8Array(atob(saltBase64).split('').map(c => c.charCodeAt(0)));
  const iv = new Uint8Array(atob(ivBase64).split('').map(c => c.charCodeAt(0)));
  const ct = new Uint8Array(atob(ciphertext).split('').map(c => c.charCodeAt(0)));
  
  const key = await generateKey(password, salt);
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ct
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}
