// pages/api/music.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const musicUrl = "https://r2.guns.lol/233ea23e-e7f8-4e6c-9956-655eacf5c26c.mp3";
    const response = await fetch(musicUrl);

    if (!response.ok) {
      res.status(response.status).send("Failed to fetch audio");
      return;
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
