import { render, fireEvent } from "@testing-library/react";

import Welcome from "../pages/welcome/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("Welcome Page", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Welcome />);
    expect(getByText("Click the Fox! Game")).toBeInTheDocument();
  });

  it("updates name on input change", () => {
    const { getByLabelText } = render(<Welcome />);
    const input = getByLabelText("Name:");
    fireEvent.change(input, { target: { value: "Test Name" } });
    expect(input.value).toBe("Test Name");
  });
});
