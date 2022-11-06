import { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, Blob } from "nft.storage";

export interface PinMetadataRequestPayload {
  name: string;
  description: string;
  imageCid: string;
}

interface PinMetadataApiRequest extends NextApiRequest {
  body: PinMetadataRequestPayload;
}

const handler = async (req: PinMetadataApiRequest, res: NextApiResponse) => {
  const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;
  if (!NFT_STORAGE_KEY) {
    return res.status(500).json({ error: "Not configured." });
  }
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  try {
    const cid = await client.storeBlob(new Blob([JSON.stringify(req.body)]));
    res.status(200).json({ cid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store blob." });
  }
};

export default handler;
