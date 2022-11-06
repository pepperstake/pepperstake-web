import { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage } from "nft.storage";
import formidable from "formidable";
import fs from "fs";
import { Blob } from "buffer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;
  if (!NFT_STORAGE_KEY) {
    return res.status(500).json({ error: "Not configured." });
  }
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  try {
    const incoming = new formidable.IncomingForm();

    incoming.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          error: `Error parsing form`,
        });
      }

      const file = files.file as formidable.File;
      const blob = new Blob([fs.readFileSync(file.filepath)]);
      const cid = await client.storeBlob(blob);
      return res.status(200).json({ cid });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store blob." });
  }
};

export default handler;
