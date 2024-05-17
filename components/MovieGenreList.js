export const MovieGenreList = ({ genres }) => {
  return (
    <div
      className="text-xs text-center sm:text-base lg:text-left"
      data-testid="movie-genre">
      {genres && (
        <p className="text-gray-500">
          {genres.map((genre, index) => (
            <span key={index}>
              {index !== 0 && <span className="mx-1"> / </span>} {genre}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};
