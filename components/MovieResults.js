import { MoviesContainer } from "./MoviesContainer";

export const MovieResults = ({ shows, loading, query }) => {
  return (
    <>
      <div
        className={
          "grid grid-cols-2 p-4 sm:grid-cols-3 sm:grid-col-row lg:grid-cols-4 gap-6 lg:gap-4"
        }>
        {shows.length > 0 && (
          <MoviesContainer shows={shows} isLoading={loading} />
        )}
      </div>
      {shows.length === 0 && query !== "" && !loading && (
        <div>
          <p className="text-center text-xl text-gray-500">No results found </p>
        </div>
      )}
    </>
  );
};
