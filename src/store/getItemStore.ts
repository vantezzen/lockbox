import { EncryptionItem, SECURITY_LEVELS } from "@/lib/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum GetItemPage {
  Form,
  Downloading,
  Hashing,
  Decrypting,
  Success,
}

export interface GetItemStore {
  item: EncryptionItem;
  setItem: (item: EncryptionItem) => void;

  page: GetItemPage;
  setPage: (page: GetItemPage) => void;

  hCaptchaToken: string;
  setHCaptchaToken: (token: string) => void;

  currentRound: number;
  setCurrentRound: (round: number) => void;

  secretId: string;
  setSecretId: (id: string) => void;

  error: string;
  setError: (error: string) => void;
}

const useGetItemStore = create<GetItemStore>()(
  devtools(
    (set): GetItemStore => ({
      item: {
        content: "",
        password: "",
        isEncrypted: true,
        securityLevel: SECURITY_LEVELS[2],
        storageDuration: 24,
      },
      setItem: (item) => set({ item }),

      page: GetItemPage.Form,
      setPage: (page) => set({ page }),

      hCaptchaToken: "",
      setHCaptchaToken: (token) => set({ hCaptchaToken: token }),

      currentRound: 0,
      setCurrentRound: (round) => set({ currentRound: round }),

      secretId: "",
      setSecretId: (id) => set({ secretId: id }),

      error: "",
      setError: (error) => set({ error: error }),
    })
  )
);

export default useGetItemStore;
