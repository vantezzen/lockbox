
const API_ENDPOINT = "/api/dispose";

export default async function disposeSecret(secretId: string) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  return true;
}
