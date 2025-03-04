import axios from "axios";
import { Asset } from "./types";

export async function fetchAssets(): Promise<Asset[]> {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cmonero%2Cchainlink%2Csolana",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
      },
    }
  );
  return response.data;
}
