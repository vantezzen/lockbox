import { Crypto } from "../Crypto";
import { EncryptionItem } from "../types";

export default async function processEncryptionItem(
  item: EncryptionItem,
  hashedPassword: string,
  statusCallback: (currentRound: number) => void
): Promise<EncryptionItem> {
  const crypto = new Crypto();

  for (let i = 0; i < item.securityLevel.encryptionRounds; i++) {
    item.content = await crypto.encryptValue(item.content, hashedPassword);
    statusCallback(i + 1);
  }

  return {
    ...item,
    isEncrypted: true,
  };
}
