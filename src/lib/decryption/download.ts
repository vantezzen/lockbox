import { EncryptionItem } from "../types";

const API_ENDPOINT = "/api/download";

export default async function downloadSecret(
  secretId: string,
  hCaptchaToken: string
) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "hcaptcha-token": hCaptchaToken,
    },
    body: JSON.stringify({
      id: secretId,
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

  return (await response.json()).item as Partial<EncryptionItem>;
}
