import useGetItemStore, { GetItemPage } from "@/store/getItemStore";
import hashPassword from "../password";
import { EncryptionItem } from "../types";
import processDecryptionItem from "./decrypt";
import disposeSecret from "./dispose";
import downloadSecret from "./download";

export default async function downloadAndDecryptSecret() {
  const store = useGetItemStore.getState();

  const changePage = (page: GetItemPage) => {
    store.setPage(page);
    window.scrollTo(0, 0);
  };

  changePage(GetItemPage.Downloading);
  let item: EncryptionItem;
  try {
    const partialItem = await downloadSecret(
      store.secretId,
      store.hCaptchaToken
    );
    item = {
      ...store.item,
      ...partialItem,
    } as EncryptionItem;

    store.setItem(item);
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }

  changePage(GetItemPage.Hashing);
  let hashedPassword = "";
  try {
    hashedPassword = await hashPassword(
      item.password,
      item.securityLevel.passwordHashRounds,
      store.setCurrentRound
    );
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }

  changePage(GetItemPage.Decrypting);
  let decryptedItem: EncryptionItem;
  try {
    decryptedItem = await processDecryptionItem(
      item,
      hashedPassword,
      store.setCurrentRound
    );
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }
  store.setItem(decryptedItem);

  try {
    await disposeSecret(store.secretId);
  } catch (e: any) {
    console.error(e);
  }

  changePage(GetItemPage.Success);
}
