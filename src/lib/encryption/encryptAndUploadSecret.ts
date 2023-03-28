import useAddItemStore, { AddItemPage } from "@/store/addItemStore";
import hashPassword from "../password";
import { EncryptionItem } from "../types";
import processEncryptionItem from "./encrypt";
import uploadSecret from "./upload";

export default async function encryptAndUploadSecret() {
  const store = useAddItemStore.getState();

  const changePage = (page: AddItemPage) => {
    store.setPage(page);
    window.scrollTo(0, 0);
  };

  changePage(AddItemPage.Hashing);
  let hashedPassword = "";
  try {
    hashedPassword = await hashPassword(
      store.item.password,
      store.item.securityLevel.passwordHashRounds,
      store.setCurrentRound
    );
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }

  changePage(AddItemPage.Encrypting);
  let encryptedItem: EncryptionItem;
  try {
    encryptedItem = await processEncryptionItem(
      store.item,
      hashedPassword,
      store.setCurrentRound
    );
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }

  changePage(AddItemPage.Uploading);
  try {
    const secretId = await uploadSecret(encryptedItem, store.hCaptchaToken);
    store.setSecretId(secretId);
  } catch (e: any) {
    console.error(e);
    store.setError(e.message);
    return;
  }

  changePage(AddItemPage.Success);
}
