import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-canvas-mock";
import userEvent from "@testing-library/user-event";
import { mockSpecificShow } from "../utils/mocks";

import Home from "../pages";
import MoviePage from "../pages/show/[showid]";

describe("Movie DB App", () => {
  describe("Home Page", () => {
    it("renders the welcome message", () => {
      render(<Home />);
      expect(screen.getByText("Welcome to Movie Guide")).toBeInTheDocument();
    });

    it("renders the desktop input field", () => {
      render(<Home />);
      expect(screen.getByTestId("search-field")).toBeInTheDocument();
    });

    it("shows text when no results are found", async () => {
      render(<Home />);
      const input = screen.getByTestId("search-field");
      await userEvent.type(input, "a very long title of a movie");
      expect(screen.queryByText("No results found")).toBeNull();
    });
  });

  describe("Specific Movie Page", () => {
    it("renders the movie name", () => {
      const { getByTestId } = render(<MoviePage {...mockSpecificShow} />);
      expect(getByTestId("movie-name").textContent).toBe("Batman Beyond");
    });

    it("renders the movie genres", () => {
      const { getByTestId } = render(<MoviePage {...mockSpecificShow} />);
      expect(getByTestId("movie-genre").textContent).toBe(
        " Action  /  Adventure  /  Science-Fiction "
      );
    });

    it("renders the movie genres", () => {
      const { getByTestId } = render(<MoviePage {...mockSpecificShow} />);
      expect(getByTestId("movie-genre").textContent).toBe(
        " Action  /  Adventure  /  Science-Fiction "
      );
    });

    it("renders the movie cover", () => {
      const { getByTestId } = render(<MoviePage {...mockSpecificShow} />);
      expect(getByTestId("movie-cover").getAttribute("src")).toBe(
        "/_next/image?url=https%3A%2F%2Fstatic.tvmaze.com%2Fuploads%2Fimages%2Foriginal_untouched%2F4%2F10842.jpg&w=3840&q=75"
      );
    });
    
    it("renders the movie summary", () => {
      const { getByTestId } = render(<MoviePage {...mockSpecificShow} />);
      expect(getByTestId("movie-summary").textContent).toBe(
        "Batman Beyond tells the story of Terry McGinnis was just an ordinary teenager...until his father was mysteriously murdered. Suspecting foul play at his father's company Wayne/Powers Corporation, Terry meets Bruce Wayne and learns a secret identity hidden for decades. Now too old to battle injustice, Wayne is a bitter shell of his former self and refuses to help. So Terry does what any brash young kid would do: steal the Batsuit and take matters into his own hands! Vowing to avenge his father's death, Terry dons the high-tech suit - tricked out with jetpacks for flying, a supersensitive microphone for eavesdropping and even camouflage capabilities - in search of his father's assassin."
      );
    });
  });
});
