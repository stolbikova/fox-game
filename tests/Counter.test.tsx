import React from "react";
import { render } from "@testing-library/react";

import Counter from "../app/components/Counter/Counter";

describe("Counter", () => {
  it("displays the remaining time", async () => {
    const { getByText } = render(
      <Counter countdown={Date.now() + 30 * 1000} onExpire={() => {}} />
    );
    // Test takes time so I allow some small margin
    expect(await getByText(/countdown: 2\d+ s/)).toBeInTheDocument();
  });

  it('displays "Expired" when countdown finishes and calls onExpire', () => {
    const onExpireMock = jest.fn();
    const { getByText } = render(
      <Counter countdown={0} onExpire={onExpireMock} />
    );
    expect(getByText("Expired")).toBeInTheDocument();
    expect(onExpireMock).toHaveBeenCalled();
  });
});
