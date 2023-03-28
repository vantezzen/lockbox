import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import hcaptcha from "hcaptcha";

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

  const { id } = req.body as { id: string };
  const hCaptchaToken = req.headers["hcaptcha-token"];
  const useCaptcha = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY !== undefined;

  // Validate input
  if (!id) {
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

    // Retrieve content from Redis
    const redis = new Redis(process.env.REDIS_URL);
    const content = await redis.get(id);
    const securityLevel = await redis.get(`${id}.securityLevel`);
    await redis.quit();

    if (!content) {
      return res.status(404).json({
        status: "error",
        message: "Secret not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      item: {
        content,
        securityLevel: JSON.parse(securityLevel as string),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    });
  }
}
