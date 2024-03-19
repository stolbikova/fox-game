import { render, screen } from "@testing-library/react";

import Scoreboard from "./index";
import { GameContext } from "@state/GameContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Scoreboard", () => {
  // Example test for rendering the scoreboard based on context data
  it("renders the scoreboard with context data", () => {
    const mockState = {
      currentPlayer: "Player 1",
      data: [{ name: "Player 1", date: "2023-01-01", score: 100 }],
    };
    render(
      <GameContext.Provider value={{ state: mockState, setState: () => {} }}>
        <Scoreboard />
      </GameContext.Provider>
    );

    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
