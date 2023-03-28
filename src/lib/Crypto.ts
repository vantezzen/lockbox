function toHexString(value: number[]): string {
  return value.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
}

export class Crypto {
  private async prepareKey(secret: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.digest(
      "SHA-256",
      enc.encode(secret)
    );

    return await window.crypto.subtle.importKey(
      "raw",
      keyMaterial,
      "AES-GCM",
      false,
      ["encrypt", "decrypt"]
    );
  }

  public async encryptValue(value: string, secret: string): Promise<string> {
    const key = await this.prepareKey(secret);
    const enc = new TextEncoder();
    const encodedValue = enc.encode(value);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encodedValue
    );
    const encryptedArray = Array.from(new Uint8Array(encrypted));
    const encryptedHex = toHexString(encryptedArray);
    const ivHex = toHexString(Array.from(iv));
    return ivHex + encryptedHex;
  }

  /**
   * Decrypt a value using AES-GCM
   */
  public async decryptValue(value: string, secret: string): Promise<string> {
    const key = await this.prepareKey(secret);
    const iv = new Uint8Array(
      value
        .substring(0, 24)
        .match(/.{1,2}/g)!
        .map((byte) => parseInt(byte, 16))
    );
    const encrypted = new Uint8Array(
      value
        .substring(24)
        .match(/.{1,2}/g)!
        .map((byte) => parseInt(byte, 16))
    );
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encrypted
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  public async generateSecret(): Promise<string> {
    const array = new Uint8Array(10);
    window.crypto.getRandomValues(array);
    return toHexString(Array.from(array));
  }

  public async hash(value: string): Promise<string> {
    const utf8 = new TextEncoder().encode(value);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
}
