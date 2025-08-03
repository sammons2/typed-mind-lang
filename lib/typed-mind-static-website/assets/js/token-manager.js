// Token Manager - Secure API token storage using Web Crypto API
class TokenManager {
  constructor() {
    this.keyName = 'typedmind_crypto_key';
    this.tokenStorageKey = 'typedmind_encrypted_tokens';
    this.cryptoKey = null;
  }

  /**
   * Initialize or retrieve the encryption key
   */
  async initializeKey() {
    try {
      // Try to get existing key from IndexedDB
      const existingKey = await this.getKeyFromStorage();
      if (existingKey) {
        this.cryptoKey = existingKey;
        return;
      }

      // Generate new key if none exists
      this.cryptoKey = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        true, // extractable
        ['encrypt', 'decrypt']
      );

      // Store the key
      await this.storeKey(this.cryptoKey);
    } catch (error) {
      console.error('Failed to initialize encryption key:', error);
      throw new Error('Encryption initialization failed');
    }
  }

  /**
   * Store encryption key in IndexedDB
   */
  async storeKey(key) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('TypedMindStorage', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('keys')) {
          db.createObjectStore('keys');
        }
      };
      
      request.onsuccess = async () => {
        const db = request.result;
        const transaction = db.transaction(['keys'], 'readwrite');
        const store = transaction.objectStore('keys');
        
        try {
          const exportedKey = await window.crypto.subtle.exportKey('jwk', key);
          store.put(exportedKey, this.keyName);
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        } catch (error) {
          reject(error);
        }
      };
    });
  }

  /**
   * Retrieve encryption key from IndexedDB
   */
  async getKeyFromStorage() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('TypedMindStorage', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('keys')) {
          db.createObjectStore('keys');
        }
      };
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['keys'], 'readonly');
        const store = transaction.objectStore('keys');
        const getRequest = store.get(this.keyName);
        
        getRequest.onsuccess = async () => {
          const keyData = getRequest.result;
          if (!keyData) {
            resolve(null);
            return;
          }
          
          try {
            const key = await window.crypto.subtle.importKey(
              'jwk',
              keyData,
              {
                name: 'AES-GCM',
                length: 256
              },
              true,
              ['encrypt', 'decrypt']
            );
            resolve(key);
          } catch (error) {
            reject(error);
          }
        };
        
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  }

  /**
   * Encrypt a token
   */
  async encryptToken(token, provider) {
    if (!this.cryptoKey) {
      await this.initializeKey();
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(token);
      
      // Generate a random IV for each encryption
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.cryptoKey,
        data
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedData), iv.length);

      // Store encrypted token
      const tokens = this.getStoredTokens();
      tokens[provider] = Array.from(combined);
      localStorage.setItem(this.tokenStorageKey, JSON.stringify(tokens));

      return true;
    } catch (error) {
      console.error('Token encryption failed:', error);
      return false;
    }
  }

  /**
   * Decrypt a token
   */
  async decryptToken(provider) {
    if (!this.cryptoKey) {
      await this.initializeKey();
    }

    try {
      const tokens = this.getStoredTokens();
      const encryptedArray = tokens[provider];
      
      if (!encryptedArray) {
        return null;
      }

      const combined = new Uint8Array(encryptedArray);
      const iv = combined.slice(0, 12);
      const encryptedData = combined.slice(12);

      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        this.cryptoKey,
        encryptedData
      );

      const decoder = new TextDecoder();
      return decoder.decode(decryptedData);
    } catch (error) {
      console.error('Token decryption failed:', error);
      return null;
    }
  }

  /**
   * Check if a token exists for a provider
   */
  hasToken(provider) {
    const tokens = this.getStoredTokens();
    return tokens[provider] && tokens[provider].length > 0;
  }

  /**
   * Remove a stored token
   */
  removeToken(provider) {
    const tokens = this.getStoredTokens();
    delete tokens[provider];
    localStorage.setItem(this.tokenStorageKey, JSON.stringify(tokens));
  }

  /**
   * Remove all stored tokens
   */
  clearAllTokens() {
    localStorage.removeItem(this.tokenStorageKey);
  }

  /**
   * Get stored tokens object from localStorage
   */
  getStoredTokens() {
    try {
      const stored = localStorage.getItem(this.tokenStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to parse stored tokens:', error);
      return {};
    }
  }

  /**
   * Get list of providers with stored tokens
   */
  getStoredProviders() {
    const tokens = this.getStoredTokens();
    return Object.keys(tokens).filter(provider => tokens[provider] && tokens[provider].length > 0);
  }

  /**
   * Check if Web Crypto API is supported
   */
  static isSupported() {
    return window.crypto && window.crypto.subtle && typeof window.crypto.subtle.generateKey === 'function';
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.TokenManager = TokenManager;
}