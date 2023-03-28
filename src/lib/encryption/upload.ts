import { EncryptionItem } from "../types";

const API_ENDPOINT = "/api/upload";

export default async function uploadSecret(
  item: EncryptionItem,
  hCaptchaToken: string
) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "hcaptcha-token": hCaptchaToken,
    },
    body: JSON.stringify({
      content: item.content,
      storageDuration: item.storageDuration,
      securityLevel: item.securityLevel,
    }),
  });

  if (!response.ok) {
    let message = "Unknown error";
    try {
      message = (await response.json()).message;
    } catch (e) {
      console.error(e);
    }
    throw new Error(message);
  }

  const { id } = await response.json();
  return id as string;
}
