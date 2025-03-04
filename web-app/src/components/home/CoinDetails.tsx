import React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Asset } from "./types";
import { formatNumber } from "@/functions/formatNumber";

type CoinDetailsProps = {
  coin: Asset;
};

function CoinDetails({ coin }: CoinDetailsProps) {
  return (
    <div>
      <div className="flex items-center gap-x-4">
        <Image src={coin.image} height={40} width={40} alt={coin.name} />
        <div>
          <p className="font-medium">{coin.name}</p>
          <p className="text-xs text-slate-500">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="grid-cols-3 grid-rows-3 gap-x-4 gap-y-2 mt-2 p-2 hidden md:grid">
        <div className="row-span-2">
          <p className="text-slate-400 text-sm">Price</p>
          <div className="text-4xl font-medium flex flex-col gap-x-2">
            ${coin.current_price.toLocaleString()}
            {coin.price_change_percentage_24h > 0 ? (
              <div className="flex items-center text-green-500 text-xs mb-0.5">
                <ChevronUp size={16} />
                <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-xs mb-0.5">
                <ChevronDown size={16} />
                <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm">High 24h</p>
          <p className="text-base font-medium">${coin.high_24h.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Low 24h</p>
          <p className="text-base font-medium">${coin.low_24h.toLocaleString()}</p>
        </div>
        <div className="col-start-2">
          <p className="text-slate-400 text-sm">Market Cap Rank</p>
          <p className="text-base font-medium">{coin.market_cap_rank}</p>
        </div>
        <div className="col-start-3">
          <p className="text-slate-400 text-sm">Market Cap</p>
          <p className="text-base font-medium">${coin.market_cap.toLocaleString()}</p>
        </div>
        <div className="row-start-3">
          <p className="text-slate-400 text-sm">Diluted Valuation</p>
          <p className="text-base font-medium">${coin.fully_diluted_valuation.toLocaleString()}</p>
        </div>
        <div className="row-start-3">
          <p className="text-slate-400 text-sm">Circulating Supply</p>
          <p className="text-base font-medium">{coin.circulating_supply.toLocaleString()}</p>
        </div>
        <div className="row-start-3">
          <p className="text-slate-400 text-sm">Total Supply</p>
          <p className="text-base font-medium">{coin.total_supply.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-4 md:hidden mt-2 p-2">
        <div className="col-span-2">
          <p className="text-slate-400 text-sm">Price</p>
          <div className="text-4xl font-medium flex flex-col gap-x-2">
            ${coin.current_price.toLocaleString()}
            {coin.price_change_percentage_24h > 0 ? (
              <div className="flex items-center text-green-500 text-xs mb-0.5">
                <ChevronUp size={16} />
                <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-xs mb-0.5">
                <ChevronDown size={16} />
                <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-start-3">
          <p className="text-slate-400 text-sm">Market Cap Rank</p>
          <p className="text-base font-medium">{coin.market_cap_rank}</p>
        </div>
        <div className="row-start-2">
          <p className="text-slate-400 text-sm">High 24h</p>
          <p className="text-base font-medium">${formatNumber(coin.high_24h)}</p>
        </div>
        <div className="row-start-2">
          <p className="text-slate-400 text-sm">Low 24h</p>
          <p className="text-base font-medium">${formatNumber(coin.low_24h)}</p>
        </div>
        <div className="row-start-2">
          <p className="text-slate-400 text-sm">Market Cap</p>
          <p className="text-base font-medium">${formatNumber(coin.market_cap)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Diluted Valuation</p>
          <p className="text-base font-medium">${formatNumber(coin.fully_diluted_valuation)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Circulating Supply</p>
          <p className="text-base font-medium">{formatNumber(coin.circulating_supply)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Total Supply</p>
          <p className="text-base font-medium">{formatNumber(coin.total_supply)}</p>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;
