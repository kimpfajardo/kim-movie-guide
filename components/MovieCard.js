import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "../utils/blurDataURL";

export const MovieImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    fill
    className="object-contain lg:object-cover"
    objectPosition="center"
    draggable="false"
    placeholder="blur"
    onContextMenu={(e) => e.preventDefault()}
    blurDataURL={blurDataURL}
    priority
    data-testid="movie-card-image"
  />
);

export const MovieCard = ({ show, isLoading }) => {
  const imgSrc =
    show.image?.original ??
    show.image?.medium ??
    "/static/no-img-available.png";

  return (
    <div className="flex flex-col w-full gap-2" data-testid="movie-card">
      <div className="w-full h-[200px] lg:h-[500px] relative rounded-lg">
        <MovieImage src={imgSrc} alt={show.name} />
        <div
          data-testid="movie-card-rating"
          className="absolute top-0 p-1 px-3 text-xs font-bold -translate-x-1/2 -translate-y-1/2 bg-yellow-400 border-2 border-white rounded-lg left-1/2 lg:text-base">
          {show.rating.average ?? "N/A"}
        </div>
      </div>
      <div className="flex flex-col gap-1 lg:gap-3">
        <h6 className="font-bold lg:text-2xl">{show.name}</h6>
        <div
          className="text-xs line-clamp-3 lg:text-sm text-slate-500"
          dangerouslySetInnerHTML={{
            __html: show.summary,
          }}
        />
        <Link
          className="flex gap-2 p-2 text-sm duration-300 active:bg-black active:text-white lg:text-base lg:hover:bg-black lg:hover:text-white group"
          href={`/show/${show.id}`}
          onClick={(e) => {
            if (isLoading) {
              e.preventDefault();
            }
          }}>
          Read more
          <span className="transition duration-300 ease-out delay-100 -translate-y-1/2 opacity-0 fill-white active:opacity-100 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 active:translate-y-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};
