import { encodeAddress } from "@polkadot/util-crypto";

//const network = "shibuya"

export const formatAddress = (
  address,
  network
) => {
    if (!address) return undefined
    const prefix = 30 // Phala
    const formatted = encodeAddress(address, prefix);
    return `${formatted}`;
};