import { Oswald } from "next/font/google";
import { blurDataURL } from "../utils/blurDataURL";
import Image from "next/image";

const oswald = Oswald({ subsets: ["latin"] });

export const MovieCover = ({ image, name, premiered, rating }) => {
  const premiereDate = new Date(premiered);
  const premiereDay = premiereDate.toLocaleDateString("en-US", {
    month: "short",
  });
  const coverImage =
    image?.original ?? image?.medium ?? "/static/no-img-available.png";
  const movieRating = parseFloat(rating ?? 0).toFixed(1);

  return (
    <div className="w-[350px] h-[700px] xl:w-[500px] xl:h-[800px] relative">
      <div className="w-full h-full relative">
        <Image
          className="object-cover w-full h-full rounded-lg shadow-2xl"
          src={coverImage}
          fill
          objectFit="cover"
          alt={name}
          draggable="false"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority
          data-testid="movie-cover"
        />
      </div>
      <div className="absolute bottom-10 right-[-50px]">
        <MovieRating rating={movieRating} />
      </div>

      <div className="absolute top-10 left-[-50px] ">
        <MoviePremiereDate
          premiereDate={premiereDate}
          premiereDay={premiereDay}
          actualPremiereDate={premiered}
        />
      </div>
    </div>
  );
};

export const MovieRating = ({ rating }) => {
  return (
    <div className="bg-blue-500 w-[100px] p-2 py-3">
      <div className={oswald.className}>
        <p className="text-white text-center">Rating</p>
        <hr className="my-2 w-6 mx-auto border-[1.5px]" />
        <p className="text-white text-center text-4xl">
          <span>{rating}</span>
          <span className="text-sm">/10</span>
        </p>
      </div>
    </div>
  );
};

export const MoviePremiereDate = ({
  premiereDate,
  premiereDay,
  actualPremiereDate,
}) => {
  return (
    <div className={`${oswald.className} bg-blue-500 w-[100px] p-2 py-3`}>
      <p className="text-white text-center text-4xl">
        {actualPremiereDate ? <span>{premiereDate.getFullYear()}</span> : "TBD"}
      </p>
      {premiereDate && (
        <>
          <hr className="my-2 w-6 mx-auto border-[1.5px]" />
          <p className="text-white text-center text-xl flex justify-center gap-2">
            <span>{premiereDay}</span>
            <span>{premiereDate.getDate()}</span>
          </p>
        </>
      )}
    </div>
  );
};
