// Token Manager - Secure API token storage using Web Crypto API with fallback
class TokenManager {
  constructor() {
    this.keyName = 'typedmind_crypto_key';
    this.tokenStorageKey = 'typedmind_encrypted_tokens';
    this.fallbackStorageKey = 'typedmind_tokens_fallback';
    this.cryptoKey = null;
    this.useWebCrypto = false;
    this.initialized = false;
    this.initPromise = null;
    
    console.log('[TokenManager] Constructor called');
  }

  /**
   * Initialize the token manager with appropriate encryption method
   */
  async initialize() {
    if (this.initialized) {
      return true;
    }
    
    if (this.initPromise) {
      return this.initPromise;
    }
    
    this.initPromise = this._performInitialization();
    return this.initPromise;
  }
  
  async _performInitialization() {
    console.log('[TokenManager] Starting initialization...');
    
    try {
      // Check Web Crypto API support
      if (this.isWebCryptoSupported()) {
        console.log('[TokenManager] Web Crypto API available, attempting initialization');
        await this.initializeWebCrypto();
        this.useWebCrypto = true;
        console.log('[TokenManager] Web Crypto API initialization successful');
      } else {
        console.log('[TokenManager] Web Crypto API not available, using fallback storage');
        this.useWebCrypto = false;
      }
      
      this.initialized = true;
      console.log('[TokenManager] Initialization complete, useWebCrypto:', this.useWebCrypto);
      return true;
      
    } catch (error) {
      console.error('[TokenManager] Initialization failed:', error);
      console.log('[TokenManager] Falling back to simple storage');
      this.useWebCrypto = false;
      this.initialized = true;
      return true; // Don't fail completely, use fallback
    }
  }
  
  /**
   * Initialize Web Crypto API encryption
   */
  async initializeWebCrypto() {
    try {
      // Try to get existing key from IndexedDB
      const existingKey = await this.getKeyFromStorage();
      if (existingKey) {
        this.cryptoKey = existingKey;
        console.log('[TokenManager] Retrieved existing encryption key');
        return;
      }

      // Generate new key if none exists
      console.log('[TokenManager] Generating new encryption key');
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
      console.log('[TokenManager] New encryption key generated and stored');
    } catch (error) {
      console.error('[TokenManager] Web Crypto initialization failed:', error);
      throw error;
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
   * Encrypt and store a token
   */
  async encryptToken(token, provider) {
    console.log('[TokenManager] encryptToken called for provider:', provider);
    
    await this.initialize();
    
    try {
      if (this.useWebCrypto && this.cryptoKey) {
        return await this.encryptTokenWithWebCrypto(token, provider);
      } else {
        return this.storeTokenWithFallback(token, provider);
      }
    } catch (error) {
      console.error('[TokenManager] Token encryption failed:', error);
      // Try fallback method if Web Crypto fails
      console.log('[TokenManager] Attempting fallback storage method');
      return this.storeTokenWithFallback(token, provider);
    }
  }
  
  /**
   * Encrypt token using Web Crypto API
   */
  async encryptTokenWithWebCrypto(token, provider) {
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
      
      console.log('[TokenManager] Token encrypted and stored successfully');
      return true;
    } catch (error) {
      console.error('[TokenManager] Web Crypto encryption failed:', error);
      throw error;
    }
  }
  
  /**
   * Store token using fallback method (simple obfuscation)
   */
  storeTokenWithFallback(token, provider) {
    try {
      console.log('[TokenManager] Using fallback storage method');
      // Simple base64 encoding for basic obfuscation (not secure, but functional)
      const obfuscated = btoa(token);
      
      const tokens = this.getFallbackTokens();
      tokens[provider] = obfuscated;
      localStorage.setItem(this.fallbackStorageKey, JSON.stringify(tokens));
      
      console.log('[TokenManager] Token stored with fallback method');
      return true;
    } catch (error) {
      console.error('[TokenManager] Fallback storage failed:', error);
      return false;
    }
  }

  /**
   * Decrypt and retrieve a token
   */
  async decryptToken(provider) {
    console.log('[TokenManager] decryptToken called for provider:', provider);
    
    await this.initialize();
    
    try {
      if (this.useWebCrypto && this.cryptoKey) {
        const result = await this.decryptTokenWithWebCrypto(provider);
        if (result) {
          return result;
        }
      }
      
      // Try fallback method
      return this.getTokenWithFallback(provider);
    } catch (error) {
      console.error('[TokenManager] Token decryption failed:', error);
      // Try fallback method if Web Crypto fails
      return this.getTokenWithFallback(provider);
    }
  }
  
  /**
   * Decrypt token using Web Crypto API
   */
  async decryptTokenWithWebCrypto(provider) {
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
      console.error('[TokenManager] Web Crypto decryption failed:', error);
      throw error;
    }
  }
  
  /**
   * Get token using fallback method
   */
  getTokenWithFallback(provider) {
    try {
      const tokens = this.getFallbackTokens();
      const obfuscated = tokens[provider];
      
      if (!obfuscated) {
        return null;
      }
      
      // Simple base64 decoding
      return atob(obfuscated);
    } catch (error) {
      console.error('[TokenManager] Fallback token retrieval failed:', error);
      return null;
    }
  }

  /**
   * Check if a token exists for a provider
   */
  hasToken(provider) {
    // Check both encrypted and fallback storage
    const tokens = this.getStoredTokens();
    const fallbackTokens = this.getFallbackTokens();
    
    return (tokens[provider] && tokens[provider].length > 0) || 
           (fallbackTokens[provider] && fallbackTokens[provider].length > 0);
  }

  /**
   * Remove a stored token
   */
  removeToken(provider) {
    // Remove from both storage methods
    const tokens = this.getStoredTokens();
    delete tokens[provider];
    localStorage.setItem(this.tokenStorageKey, JSON.stringify(tokens));
    
    const fallbackTokens = this.getFallbackTokens();
    delete fallbackTokens[provider];
    localStorage.setItem(this.fallbackStorageKey, JSON.stringify(fallbackTokens));
    
    console.log('[TokenManager] Token removed for provider:', provider);
  }

  /**
   * Remove all stored tokens
   */
  clearAllTokens() {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.fallbackStorageKey);
    console.log('[TokenManager] All tokens cleared');
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
   * Get fallback tokens object from localStorage
   */
  getFallbackTokens() {
    try {
      const stored = localStorage.getItem(this.fallbackStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to parse fallback tokens:', error);
      return {};
    }
  }
  
  /**
   * Get list of providers with stored tokens
   */
  getStoredProviders() {
    const tokens = this.getStoredTokens();
    const fallbackTokens = this.getFallbackTokens();
    
    const encryptedProviders = Object.keys(tokens).filter(provider => 
      tokens[provider] && tokens[provider].length > 0
    );
    
    const fallbackProviders = Object.keys(fallbackTokens).filter(provider => 
      fallbackTokens[provider] && fallbackTokens[provider].length > 0
    );
    
    // Combine and deduplicate
    return [...new Set([...encryptedProviders, ...fallbackProviders])];
  }

  /**
   * Check if Web Crypto API is supported
   */
  isWebCryptoSupported() {
    try {
      const hasWindow = typeof window !== 'undefined';
      const hasCrypto = hasWindow && window.crypto;
      const hasSubtle = hasCrypto && window.crypto.subtle;
      const hasGenerateKey = hasSubtle && typeof window.crypto.subtle.generateKey === 'function';
      const hasEncrypt = hasSubtle && typeof window.crypto.subtle.encrypt === 'function';
      const hasDecrypt = hasSubtle && typeof window.crypto.subtle.decrypt === 'function';
      const hasIndexedDB = hasWindow && window.indexedDB;
      
      const isSupported = hasGenerateKey && hasEncrypt && hasDecrypt && !!hasIndexedDB;
      console.log('[TokenManager] Web Crypto support check:', {
        hasWindow,
        hasCrypto,
        hasSubtle,
        hasGenerateKey,
        hasEncrypt,
        hasDecrypt,
        hasIndexedDB,
        isSupported
      });
      
      return isSupported;
    } catch (error) {
      console.error('[TokenManager] Error checking Web Crypto support:', error);
      return false;
    }
  }
  
  /**
   * Check if Web Crypto API is supported (static method for backward compatibility)
   */
  static isSupported() {
    const manager = new TokenManager();
    return manager.isWebCryptoSupported();
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.TokenManager = TokenManager;
}