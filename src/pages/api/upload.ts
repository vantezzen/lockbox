import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import hcaptcha from "hcaptcha";
import { EncryptionItem } from "@/lib/types";

const MAX_CONTENT_SIZE = parseInt(process.env.MAX_CONTENT_SIZE_KB) * 1024;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed.",
    });
  }

  const { content, storageDuration, securityLevel } =
    req.body as EncryptionItem;
  const hCaptchaToken = req.headers["hcaptcha-token"];
  const useCaptcha = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY !== undefined;

  // Validate input
  if (!content || !storageDuration || !securityLevel) {
    return res.status(400).json({
      status: "error",
      message: "Missing parameters or headers.",
    });
  }

  if (useCaptcha && !hCaptchaToken) {
    return res.status(400).json({
      status: "error",
      message: "Missing hCaptcha token.",
    });
  }

  if (storageDuration > 24 * 7) {
    return res.status(400).json({
      status: "error",
      message: "The storage duration must not exceed 7 days.",
    });
  }

  if (content.length > MAX_CONTENT_SIZE) {
    return res.status(400).json({
      status: "error",
      message: `The content must not exceed ${MAX_CONTENT_SIZE / 1024} KB.`,
    });
  }

  try {
    if (useCaptcha) {
      // Verify hCaptcha token
      const { success: hcaptchaSuccess } = await hcaptcha.verify(
        process.env.HCAPTCHA_SECRET_KEY,
        hCaptchaToken as string,
        undefined,
        process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY
      );

      if (!hcaptchaSuccess) {
        return res.status(400).json({
          status: "error",
          message: "Verification failed. Please try again.",
        });
      }
    }

    // Generate random ID for content
    const id = uuidv4();

    // Store content in Redis
    const redis = new Redis(process.env.REDIS_URL);
    await redis.set(id, content, "EX", storageDuration * 60 * 60);
    await redis.set(
      `${id}.securityLevel`,
      JSON.stringify(securityLevel),
      "EX",
      storageDuration * 60 * 60
    );
    await redis.quit();

    return res.status(200).json({ status: "success", id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    });
  }
}
