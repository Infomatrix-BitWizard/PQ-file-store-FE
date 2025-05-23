import forge from "node-forge";

export class AES {
  static generateKey(): string {
    const key = forge.random.getBytesSync(32);

    return forge.util.encode64(key)
  }

  static encryptData(keyBase64: string, data: string) {
    try {
      const iv = forge.random.getBytesSync(16);
      const key = forge.util.decode64(keyBase64)

      const cipher = forge.cipher.createCipher("AES-GCM", key);

      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(data));
      cipher.finish();

      const res = cipher.output.toHex();
      return { iv: forge.util.encode64(iv), data: res };
    } catch (e) {
      throw new Error("Error encrypting data");
    }
  }

  static decryptData(keyBase64: string, ivBase64: string, encryptedDataBase64: string): string {
    try {
      const iv = forge.util.decode64(ivBase64);
      const key = forge.util.decode64(keyBase64);
      const encryptedData = forge.util.hexToBytes(encryptedDataBase64);

      const decipher = forge.cipher.createDecipher("AES-GCM", key);
      decipher.start({ iv });
      decipher.update(forge.util.createBuffer(encryptedData));

      const success = decipher.finish();

      if (success) {
        return decipher.output.toString();
      } else {
        throw new Error("Decryption failed");
      }
    } catch (e) {
      throw new Error("Error decrypting data");
    }
  }
}
