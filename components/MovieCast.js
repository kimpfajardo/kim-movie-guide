import Image from "next/image";

export const MovieCast = ({ cast }) => {
  return (
    <div className="flex-col gap-1 w-full lg:max-w-[600px] overflow-hidden flex">
      <h4 className="w-full font-bold text-center lg:text-left">Cast</h4>
      <hr className="w-8 mx-auto my-2 border border-blue-500 lg:hidden" />

      <div className="grid grid-cols-2 gap-4 lg:hidden">
        {cast.slice(0, 3).map(({ person, character }, index) => {
          return (
            <div
              className="inline-block text-center"
              key={`${person.name}-${index}`}>
              <h4 className="font-bold text-nowrap">{person.name}</h4>
              <p className="text-sm text-nowrap">{character.name}</p>
            </div>
          );
        })}
        {cast.length > 3 && (
          <div className="flex items-center justify-center px-3 mx-auto text-center bg-gray-100 rounded-lg w-max">
            <h4 className="font-bold text-nowrap">+{cast.length - 3} more</h4>
          </div>
        )}
      </div>

      <div className="hidden w-full h-20 gap-4 p-2 rounded-xl lg:block">
        <div className="flex w-full gap-2 overflow-x-scroll">
          {cast.map(({ person, character }) => {
            return (
              <div
                key={person.id}
                className="flex items-center gap-2 p-2 px-3 text-sm rounded-xl bg-blue-50">
                <div className="w-12 h-12 overflow-hidden rounded-full aspect-square">
                  <Image
                    src={person.image?.medium ?? ""}
                    alt={person.name}
                    width={48}
                    height={48}
                    priority
                  />
                </div>
                <div>
                  <h4
                    className="font-bold text-nowrap"
                    data-testid="movie-cast-name">
                    {person.name}
                  </h4>
                  <p className="text-nowrap">{character.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
