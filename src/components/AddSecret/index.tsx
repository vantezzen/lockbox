import React from "react";
import useAddItemStore, { AddItemPage } from "@/store/addItemStore";
import Encrypting from "./Pages/Encrypting";
import Form from "./Pages/Form";
import Hashing from "../SharedPages/Hashing";
import Uploading from "./Pages/Uploading";
import encryptAndUploadSecret from "@/lib/encryption/encryptAndUploadSecret";
import Error from "../SharedPages/Error";
import Success from "./Pages/Success";

function AddItem({ hideLanding }: { hideLanding: () => void }) {
  const store = useAddItemStore();

  const encryptAndUpload = async () => {
    hideLanding();
    encryptAndUploadSecret();
  };

  if (store.error) {
    return (
      <Error
        error={store.error}
        onReset={() => {
          store.setError("");
          store.setPage(AddItemPage.Form);
          store.setItem({
            ...store.item,
            password: "",
            content: "",
          });
        }}
      />
    );
  }

  switch (store.page) {
    case AddItemPage.Form:
      return <Form encryptAndUpload={encryptAndUpload} />;
    case AddItemPage.Hashing:
      return <Hashing item={store.item} currentRound={store.currentRound} />;
    case AddItemPage.Encrypting:
      return <Encrypting />;
    case AddItemPage.Uploading:
      return <Uploading />;
    case AddItemPage.Success:
      return <Success />;
  }
  return null;
}

export default AddItem;
