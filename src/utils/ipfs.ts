export const cidToUrl = (cid: string | undefined) => {
  return cid ? `https://${cid}.ipfs.nftstorage.link/` : undefined;
};

export const ipfsLinkToCid = (ipfsLink: string | undefined) => {
  return ipfsLink ? ipfsLink.split("/")[2] : undefined;
};
