import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { GameContext, DataItem, initialState } from "@state/GameContext";

import "@styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<{
    data: DataItem[];
    currentPlayer: string;
  }>(() => {
    if (typeof window === "undefined") {
      return initialState;
    }

    const savedState = localStorage.getItem("myContextState");
    return savedState ? JSON.parse(savedState) : initialState;
  });
  useEffect(() => {
    localStorage.setItem("myContextState", JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, setState }}>
      <Component {...pageProps} />
    </GameContext.Provider>
  );
}
