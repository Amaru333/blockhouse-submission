import React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Asset } from "./types";

type CryptoListProps = {
  asset: Asset;
  index: number;
  selectedCoin: string | undefined | null;
  setSelectedCoin: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

function CryptoList({ asset, selectedCoin, setSelectedCoin }: CryptoListProps) {
  return (
    <div
      className={`items-center space-x-4 my-1.5 grid grid-cols-11 gap-4 p-2 rounded-lg cursor-pointer transition-all hover:opacity-80 ${
        selectedCoin === asset.id
          ? "bg-slate-200/50 dark:bg-slate-700/50"
          : "dark:bg-slate-800/50 bg-slate-100/50"
      }`}
      onClick={() => setSelectedCoin(asset.id)}
    >
      <div className="flex items-center gap-x-4 col-span-6 md:col-span-3">
        <Image src={asset.image} height={40} width={40} alt={asset.name} />
        <div className="flex flex-col">
          <p className="font-medium">{asset.name}</p>
          <p className="text-xs text-slate-500">{asset.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="col-span-5 md:col-span-2 flex flex-col items-end md:items-start">
        <p className="font-medium">${asset.current_price.toLocaleString()}</p>
        <div className="text-xs">
          {asset.price_change_percentage_24h > 0 ? (
            <div className="flex items-center text-green-500">
              <ChevronUp size={16} />
              <p>{asset.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
          ) : (
            <div className="flex items-center text-red-500">
              <ChevronDown size={16} />
              <p>{asset.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3 hidden md:block">
        <p className="font-medium">${asset.total_volume.toLocaleString()}</p>
      </div>
      <div className="col-span-3 hidden md:block">
        <p className="font-medium">${asset.market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CryptoList;
