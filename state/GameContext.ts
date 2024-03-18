import { createContext } from "react";

export type DataItem = {
  name: string;
  date: string;
  score: number;
};

type ContextState = {
  data: DataItem[];
  currentPlayer: string;
};

interface MyContextType {
  state: ContextState;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

export const initialState = { data: [], currentPlayer: "" };
export const GameContext = createContext<MyContextType>({
  state: { data: [], currentPlayer: "" }, // Initial state
  setState: () => {}, // Placeholder function for setting the state
});
