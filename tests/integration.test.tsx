import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useRouter } from "next/router";
import Welcome from "@pages/welcome/index";
import Game from "@pages/game/index";
import { GameContext } from "@state/GameContext";
import { MOCK_DATA } from "./mocks/data";
import Scoreboard from "@pages/scoreboard/index";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Game flow integration test", () => {
  it(
    "navigates from welcome to game to scoreboard successfully",
    async () => {
      let mockState = { data: [], currentPlayer: "" };
      const setState = (state: any) => {
        mockState = state;
      };

      render(
        <GameContext.Provider value={{ state: mockState, setState }}>
          <Welcome />
        </GameContext.Provider>
      );

      const input = screen.getByLabelText("Name:");
      fireEvent.change(input, { target: { value: "Test Name" } });
      expect(input.value).toBe("Test Name");
      fireEvent.click(screen.getByTestId("play-btn"));

      await waitFor(() => {
        expect(useRouter().push).toHaveBeenCalledWith("/game");
      });

      // Game page
      render(
        <GameContext.Provider value={{ state: mockState, setState }}>
          <Game data={MOCK_DATA} />
        </GameContext.Provider>
      );

      expect(screen.getByTestId("game-page")).toBeInTheDocument();

      const foxImage = await screen.findByTestId(/fox-image-\d/);
      act(() => {
        fireEvent.click(foxImage);
      });

      const getScore = () => {
        const scoreElement = screen.getByTestId("score");
        const scoreText = scoreElement.textContent;
        const match = scoreText.match(/Score: (\d+)/);
        return match ? parseInt(match[1], 10) : null;
      };

      const score = getScore();
      expect(score).toBe(1);

      const catImage = await screen.findByTestId(/cat-image-\d/);
      await waitFor(() => {
        fireEvent.click(catImage);
      });

      const newScore = getScore();

      expect(newScore).toBe(0);

      act(() => {
        jest.advanceTimersByTime(30 * 1000);
      });

      await waitFor(() => {
        expect(useRouter().push).toHaveBeenCalledWith("/scoreboard");
      });

      // Scoreboard page
      render(
        <GameContext.Provider value={{ state: mockState, setState }}>
          <Scoreboard />
        </GameContext.Provider>
      );

      expect(screen.getByTestId("scoreboard-page")).toBeInTheDocument();
      expect(screen.getByTestId(/score-\d/).textContent).toBe("0");
      expect(screen.getByTestId(/name-0/).textContent).toBe("Test Name");
    },
    40 * 1000
  );
});
