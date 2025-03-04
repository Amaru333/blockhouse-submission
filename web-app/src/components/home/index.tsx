"use client";
import { useTheme } from "@/context/ThemeContext";
import { getOS, useShortcut } from "@/functions/useShortcut";
import { useQuery } from "@tanstack/react-query";
import { Moon, Sun } from "lucide-react";
import React from "react";
import CryptoList from "./CryptoList";
import LoadingCryptoList from "./LoadingCryptoList";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CoinDetails from "./CoinDetails";
import { fetchAssets } from "./functions";
import { Asset } from "./types";
import { toast } from "sonner";

function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAssets,
  });

  const [selectedCoin, setSelectedCoin] = React.useState<string | null | undefined>(null);
  const [search, setSearch] = React.useState("");

  const focusSearchField = () => {
    const searchField = document.querySelector("input[name=search]") as HTMLInputElement;
    searchField.focus();
  };

  const refetchData = () => {
    refetch()
      .then(() => {
        console.log("Data refetched");
        toast.success("Data refetched successfully");
      })
      .catch(() => {
        toast.error("Failed to refetch data");
      });
  };

  const ctrlButton = getOS() === "MacOS" ? "META" : "CTRL";
  const ctrlButtonText = getOS() === "MacOS" ? "\u2318" : "Ctrl";

  useShortcut([ctrlButton, "K"], focusSearchField);
  useShortcut([ctrlButton, "X"], refetchData);
  useShortcut([ctrlButton, "M"], toggleTheme);

  return (
    <div className="p-4">
      <div className="flex items-center gap-x-2">
        <div className="relative w-fit">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            className="border dark:border-slate-700 border-slate-200 pr-3 py-1.5 pl-2 rounded-lg text-sm dark:bg-slate-800 bg-slate-100 h-8 focus:outline-none placeholder-slate-500"
            placeholder="Search Coins"
          />
          <p className="absolute right-1 top-1 bottom-1 px-1.5 flex items-center justify-center rounded-md text-xs dark:bg-slate-700 bg-slate-200">
            {ctrlButtonText} K
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={refetchData}
              disabled={isLoading}
              className="mx-1 cursor-pointer rounded-lg text-sm flex items-center border dark:border-slate-700 border-slate-200 dark:bg-slate-700 bg-slate-200 py-[3px] px-1 justify-between hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <p>Refetch</p>
              <p className="px-1.5 py-1 flex items-center justify-center rounded-md text-xs dark:bg-slate-800 bg-slate-100 ml-2">
                {ctrlButtonText} X
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refetch the latest data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={toggleTheme} className="mx-1 rounded-full cursor-pointer">
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </TooltipTrigger>
            <TooltipContent>
              <p className="flex items-center">
                {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}{" "}
                <span className="px-1.5 py-1 flex items-center justify-center rounded-md text-xs bg-slate-700 dark:bg-slate-200 ml-2">
                  {ctrlButtonText} M
                </span>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-3">
          <div className="grid grid-cols-11 gap-4 my-4 text-sm font-medium">
            <p className="col-span-3">Name</p>
            <p className="col-span-2">Price</p>
            <p className="col-span-3">24h Volume</p>
            <p className="col-span-3">Market Cap</p>
          </div>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => <LoadingCryptoList key={index} />)}
          {data
            ?.filter(
              (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((coin, index) => (
              <CryptoList
                key={coin.id}
                asset={coin}
                index={index}
                selectedCoin={selectedCoin}
                setSelectedCoin={setSelectedCoin}
              />
            ))}
        </div>
        <div className="col-span-5 md:col-span-2">
          <h1 className="text-sm font-medium my-4">Coin Details</h1>
          <div className="mt-1.5 dark:bg-slate-800/50 bg-slate-100/50 p-2 rounded-lg py-4">
            {selectedCoin ? (
              <CoinDetails coin={data?.find((coin) => coin.id === selectedCoin) ?? ({} as Asset)} />
            ) : (
              <div className="flex items-center justify-center flex-1 min-h-60">
                <p className="text-sm">Select a coin to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
