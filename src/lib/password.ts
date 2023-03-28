import { Crypto } from "./Crypto";

export default async function hashPassword(
  password: string,
  hashRounds: number,
  statusCallback: (currentRound: number) => void
) {
  const crypto = new Crypto();

  let hashedPassword = password;
  for (let i = 0; i < hashRounds; i++) {
    hashedPassword = await crypto.hash(hashedPassword);
    statusCallback(i + 1);
  }

  return hashedPassword;
}
