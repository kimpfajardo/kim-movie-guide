import { MovieCard } from "./MovieCard";

export const MoviesContainer = ({ shows, isLoading }) => {
  return (
    <>
      {shows.map((show, index) => {
        return (
          <MovieCard
            key={`${show.id}-${index}`}
            show={show}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
