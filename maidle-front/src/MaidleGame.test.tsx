import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MaidleGame from "./MaidleGame";
import { Chart } from "./types/chart";
import { Difficulty } from "./types/difficulty";
import { getTokyoDateKey, selectDailyChart } from "./utils/dailyPuzzle";

const mockFetch = jest.fn();
const mockChart: Chart = {
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
const mockOtherChart: Chart = {
  id: "song-b:master:dx",
  index: 2,
  song: "Song B",
  image: "song-b.png",
  level: 13.7,
  category: "Game & Variete",
  artist: "Artist B",
  bpm: 200,
  type: "dx",
  difficulty: Difficulty.Master,
  version: "PRiSM",
};

jest.mock("./utils/dailyPuzzle", () => ({
  getTokyoDateKey: jest.fn(),
  selectDailyChart: jest.fn(() => null),
}));

jest.mock("./components/searchBar/SearchBar", () => ({
  __esModule: true,
  default: ({ onSubmit, disabled }: { onSubmit: (chart: Chart) => boolean; disabled: boolean }) => (
    <>
      <button disabled={disabled} onClick={() => onSubmit(mockChart)}>
        Submit target guess
      </button>
      <button disabled={disabled} onClick={() => onSubmit(mockOtherChart)}>
        Submit other guess
      </button>
    </>
  ),
}));

beforeEach(() => {
  (getTokyoDateKey as jest.Mock).mockReturnValue("2026-10-15");
  window.localStorage.clear();
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      songs: [
        {
          songId: "song-a",
          title: "Song A",
          imageName: "song-a.png",
          category: "POPS & ANIME",
          artist: "Artist A",
          bpm: 180,
          version: "PRiSM",
          sheets: [
            {
              difficulty: "master",
              internalLevelValue: 14,
              type: "dx",
              version: "PRiSM",
            },
          ],
        },
      ],
    }),
  });
  global.fetch = mockFetch;
  (selectDailyChart as jest.Mock).mockReturnValue(mockChart);
});

describe("MaidleGame daily state", () => {
  it("uses the loaded puzzle date when restoring and saving guesses", async () => {
    render(<MaidleGame />);

    await waitFor(() => expect(selectDailyChart).toHaveBeenCalledWith(
      expect.any(Array),
      "2026-10-15",
    ));
    fireEvent.click(screen.getByRole("button", { name: "Submit target guess" }));

    expect(window.localStorage.getItem("maidle:game:2026-10-15")).toBe(
      JSON.stringify({ guessIds: [mockChart.id] }),
    );
  });

  it("refuses to save an expired puzzle", async () => {
    render(<MaidleGame />);

    await waitFor(() => expect(selectDailyChart).toHaveBeenCalled());
    (getTokyoDateKey as jest.Mock).mockReturnValue("2026-10-16");
    fireEvent.click(screen.getByRole("button", { name: "Submit target guess" }));

    expect(window.localStorage.getItem("maidle:game:2026-10-16")).toBeNull();
    expect(await screen.findByText(/new daily puzzle is available/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit target guess" })).toBeDisabled();
  });

  it("does not persist a duplicate guess", async () => {
    render(<MaidleGame />);

    await waitFor(() => expect(selectDailyChart).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: "Submit other guess" }));
    fireEvent.click(screen.getByRole("button", { name: "Submit other guess" }));

    expect(window.localStorage.getItem("maidle:game:2026-10-15")).toBe(
      JSON.stringify({ guessIds: [mockOtherChart.id] }),
    );
  });

  it("locks a puzzle restored with the correct guess", async () => {
    window.localStorage.setItem(
      "maidle:game:2026-10-15",
      JSON.stringify({ guessIds: [mockChart.id] }),
    );

    render(<MaidleGame />);

    expect(await screen.findByText("Solved in 1 guesses.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit target guess" })).toBeDisabled();
  });
});
