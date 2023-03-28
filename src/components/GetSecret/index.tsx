import useGetItemStore, { GetItemPage } from "@/store/getItemStore";
import React from "react";
import Error from "../SharedPages/Error";
import Hashing from "../SharedPages/Hashing";
import Decrypting from "./Pages/Decrypting";
import Downloading from "./Pages/Downloading";
import Form from "./Pages/Form";
import Success from "./Pages/Success";

function GetSecret() {
  const store = useGetItemStore();

  if (store.error) {
    return (
      <Error
        error={store.error}
        onReset={() => {
          store.setError("");
          store.setPage(GetItemPage.Form);
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
    case GetItemPage.Form:
      return <Form />;
    case GetItemPage.Downloading:
      return <Downloading />;
    case GetItemPage.Hashing:
      return <Hashing item={store.item} currentRound={store.currentRound} />;
    case GetItemPage.Decrypting:
      return <Decrypting />;
    case GetItemPage.Success:
      return <Success />;
  }
}

export default GetSecret;
