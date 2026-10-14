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

jest.mock("./utils/dailyPuzzle", () => ({
  getTokyoDateKey: jest.fn(),
  selectDailyChart: jest.fn(() => null),
}));

jest.mock("./components/searchBar/SearchBar", () => ({
  __esModule: true,
  default: ({ onSubmit, disabled }: { onSubmit: (chart: Chart) => void; disabled: boolean }) => (
    <button disabled={disabled} onClick={() => onSubmit(mockChart)}>
      Submit test guess
    </button>
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
  (selectDailyChart as jest.Mock).mockClear();
});

describe("MaidleGame daily state", () => {
  it("uses the loaded puzzle date when restoring and saving guesses", async () => {
    render(<MaidleGame />);

    await waitFor(() => expect(selectDailyChart).toHaveBeenCalledWith(
      expect.any(Array),
      "2026-10-15",
    ));
    fireEvent.click(screen.getByRole("button", { name: "Submit test guess" }));

    expect(window.localStorage.getItem("maidle:game:2026-10-15")).toBe(
      JSON.stringify({ guessIds: [mockChart.id] }),
    );
  });

  it("refuses to save an expired puzzle", async () => {
    render(<MaidleGame />);

    await waitFor(() => expect(selectDailyChart).toHaveBeenCalled());
    (getTokyoDateKey as jest.Mock).mockReturnValue("2026-10-16");
    fireEvent.click(screen.getByRole("button", { name: "Submit test guess" }));

    expect(window.localStorage.getItem("maidle:game:2026-10-16")).toBeNull();
    expect(await screen.findByText(/new daily puzzle is available/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit test guess" })).toBeDisabled();
  });
});
