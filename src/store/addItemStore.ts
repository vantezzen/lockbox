import { EncryptionItem, SECURITY_LEVELS } from "@/lib/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum AddItemPage {
  Form,
  Hashing,
  Encrypting,
  Uploading,
  Success,
  Error,
}

export interface AddItemStore {
  item: EncryptionItem;
  setItem: (item: EncryptionItem) => void;

  page: AddItemPage;
  setPage: (page: AddItemPage) => void;

  hCaptchaToken: string;
  setHCaptchaToken: (token: string) => void;

  currentRound: number;
  setCurrentRound: (round: number) => void;

  secretId: string;
  setSecretId: (id: string) => void;

  addPasswordToUrl: boolean;
  setAddPasswordToUrl: (add: boolean) => void;

  error: string;
  setError: (error: string) => void;
}

const useAddItemStore = create<AddItemStore>()(
  devtools(
    (set): AddItemStore => ({
      item: {
        content: "",
        password: "",
        isEncrypted: false,
        securityLevel: SECURITY_LEVELS[2],
        storageDuration: 24,
      },
      setItem: (item) => set({ item }),

      page: AddItemPage.Form,
      setPage: (page) => set({ page }),

      hCaptchaToken: "",
      setHCaptchaToken: (token) => set({ hCaptchaToken: token }),

      currentRound: 0,
      setCurrentRound: (round) => set({ currentRound: round }),

      secretId: "",
      setSecretId: (id) => set({ secretId: id }),

      addPasswordToUrl: true,
      setAddPasswordToUrl: (add) => set({ addPasswordToUrl: add }),

      error: "",
      setError: (error) => set({ error: error }),
    })
  )
);

export default useAddItemStore;
