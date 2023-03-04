// POST /api/qa
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { name, description, category, ipfsHash } = req.body;
  const session = await getSession({ req });

  console.log("session", session.expires);
  try {
    const result = { res: "hello" };

    await prisma.datasets.create({
      data: {
        name,
        description,
        category,
        ipfsHash,
      },
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the history data." });
  }
}
