import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

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

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Missing parameters or headers.",
    });
  }

  const redis = new Redis(process.env.REDIS_URL);

  try {
    const exists = await redis.exists(id);

    if (!exists) {
      return res.status(200).json({
        status: "success",
        message: "The content has been successfully removed.",
      });
    }

    await redis.del(id);
    await redis.del(`${id}.securityLevel`);

    return res.status(200).json({
      status: "success",
      message: "The content has been successfully removed.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    });
  } finally {
    await redis.quit();
  }
}
