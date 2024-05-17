import Link from "next/link";

export const EpisodesContainer = ({ episodes, showId, count }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="font-bold text-center lg:text-left">Episodes</p>
      <hr className="w-8 mx-auto my-2 border border-blue-500 lg:hidden" />
      <div className="flex flex-col gap-2">
        {episodes.map((episode) => {
          const airdate = new Date(episode.airdate);
          return (
            <div
              key={episode.id}
              className="flex flex-col gap-2 p-2 px-3 transition border rounded-lg group hover:bg-blue-500 hover:text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{episode.name}</h3>
                <p className="hidden text-xs md:block">
                  {airdate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 group-hover:text-white">
                  {episode.rating.average ? (
                    `${episode.rating.average ?? 0} / 10`
                  ) : (
                    <i>No rating</i>
                  )}
                </p>
                <p className="text-xs text-gray-500 md:hidden">
                  {airdate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        {count > 4 && (
          <p
            className="p-2 px-3 font-bold text-center text-gray-500 bg-gray-200 rounded-lg"
            href={`/show/${showId}/episodes`}
            data-testid="movie-episodes-more">
            + {count - 4} more episodes
          </p>
        )}
      </div>
    </div>
  );
};
