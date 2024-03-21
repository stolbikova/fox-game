import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ImageType } from "types";
import ImageFetcher from "../app/components/ImageFetcher/ImageFetcher";

// Mock data
const mockData = [
  {
    id: 1,
    url: "https://randomfox.ca/images/29.jpg",
    type: "fox" as ImageType,
  },
];

describe("ImageFetcher", () => {
  it("renders images based on props", () => {
    const { getAllByRole } = render(
      <ImageFetcher
        data={mockData}
        onDecrementScore={() => {}}
        onIncrementScore={() => {}}
      />
    );
    const images = getAllByRole("img");
    expect(images).toHaveLength(mockData.length);
  });

  it("increments score on clicking a fox image", async () => {
    const incrementMock = jest.fn();
    const decrementMock = jest.fn();

    render(
      <ImageFetcher
        data={mockData}
        onDecrementScore={decrementMock}
        onIncrementScore={incrementMock}
      />
    );

    const foxImage = screen.getByAltText("0");
    await userEvent.click(foxImage);

    expect(incrementMock).toHaveBeenCalledTimes(1);
    expect(decrementMock).not.toHaveBeenCalled();
  });
});
