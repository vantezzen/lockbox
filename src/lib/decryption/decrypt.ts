import { Crypto } from "../Crypto";
import { EncryptionItem } from "../types";

export default async function processDecryptionItem(
  item: EncryptionItem,
  hashedPassword: string,
  processUpdate: (currentRound: number) => void
): Promise<EncryptionItem> {
  const crypto = new Crypto();

  for (let i = 0; i < item.securityLevel.encryptionRounds; i++) {
    item.content = await crypto.decryptValue(item.content, hashedPassword);
    processUpdate(i);
  }

  return {
    ...item,
    isEncrypted: false,
  };
}
