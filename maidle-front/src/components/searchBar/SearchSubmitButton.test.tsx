import { fireEvent, render, screen } from "@testing-library/react";
import { Chart } from "../../types/chart";
import { Difficulty } from "../../types/difficulty";
import SearchSubmitButton from "./SearchSubmitButton";

const chart: Chart = {
  id: "song-a:master:dx",
  index: 1,
  song: "Song A",
  image: "song-a.png",
  level: 14,
  category: "POPS & ANIME",
  artist: "Artist A",
  bpm: 180,
  type: "dx",
  difficulty: Difficulty.Master,
  version: "PRiSM",
};

describe("SearchSubmitButton", () => {
  it("clears the selected chart after an accepted submission", () => {
    const onSubmit = jest.fn(() => true);
    const setSelectedChart = jest.fn();
    render(
      <SearchSubmitButton
        selectedChart={chart}
        setSelectedChart={setSelectedChart}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalledWith(chart);
    expect(setSelectedChart).toHaveBeenCalledWith(null);
  });

  it("keeps the selected chart after a rejected submission", () => {
    const onSubmit = jest.fn(() => false);
    const setSelectedChart = jest.fn();
    render(
      <SearchSubmitButton
        selectedChart={chart}
        setSelectedChart={setSelectedChart}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalledWith(chart);
    expect(setSelectedChart).not.toHaveBeenCalled();
  });

  it("does not submit while disabled", () => {
    const onSubmit = jest.fn(() => true);
    render(
      <SearchSubmitButton
        selectedChart={chart}
        setSelectedChart={jest.fn()}
        onSubmit={onSubmit}
        disabled
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
