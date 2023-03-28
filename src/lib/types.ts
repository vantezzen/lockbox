export type SecurityLevel = {
  id: number;
  name: string;
  encryptionRounds: number;
  passwordHashRounds: number;
};

export const SECURITY_LEVELS: SecurityLevel[] = [
  {
    id: 1,
    name: "Low",
    encryptionRounds: 1,
    passwordHashRounds: 1,
  },
  {
    id: 2,
    name: "Medium",
    encryptionRounds: 3,
    passwordHashRounds: 1000,
  },
  {
    id: 3,
    name: "High",
    encryptionRounds: 5,
    passwordHashRounds: 10000,
  },
];

export type EncryptionItem = {
  content: string; // Content to encrypt/decrypt
  password: string; // Secret key/Password
  securityLevel: SecurityLevel;
  isEncrypted: boolean;
  storageDuration?: number; // in hours
};
