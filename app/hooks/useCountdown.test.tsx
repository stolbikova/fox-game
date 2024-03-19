import { act, renderHook } from "@testing-library/react-hooks";
import { useCountdown } from "./useCountdown";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("useCountdown hook", () => {
  it("counts down every second", () => {
    const targetDate = new Date().getTime() + 5000;
    const { result } = renderHook(() => useCountdown(targetDate));

    expect(result.current[0]).toBe(0); // minutes
    expect(result.current[1]).toBe(5); // seconds

    // Simulate 1 second passing
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // After 1 second, we expect the seconds to decrease
    expect(result.current[0]).toBe(0); // minutes
    expect(result.current[1]).toBe(4); // seconds

    // Simulate another 4 seconds passing
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // After a total of 5 seconds, the countdown should be over
    expect(result.current[0]).toBe(0); // minutes
    expect(result.current[1]).toBe(0); // seconds
  });
});
