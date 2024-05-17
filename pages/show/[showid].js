import Head from "next/head";
import Nav from "../../components/Nav";
import Image from "next/image";

import { KeyValueField } from "../../components/KeyValueField";
import Link from "next/link";
import { MovieMissing } from "../../components/MovieMissing";
import { MovieCover } from "../../components/MovieCover";
import { cache } from "../../utils/cache";
import { MovieGenreList } from "../../components/MovieGenreList";
import { MovieSummary } from "../../components/MovieSummary";
import { MovieCast } from "../../components/MovieCast";
import { Fragment, useMemo } from "react";
import { EpisodesContainer } from "../../components/EpisodesContainer";
import { MobileStats } from "../../components/MobilePremiereDate";
import { MobileMovieCover } from "../../components/MobileMovieCover";

const Show = ({ show, episodes, seasons, cast, episodeCount }) => {
  const {
    name,
    image,
    summary,
    genres,
    rating,
    language,
    premiered,
    officialSite,
    ended,
  } = show;
  const endDate = new Date(ended);
  const additionalDetails = useMemo(
    () => [
      {
        label: "Language",
        value: language,
        symbol: (
          <Image
            src="/static/message-dots.svg"
            alt="message dots"
            width={20}
            height={20}
          />
        ),
      },
      {
        label: "Seasons",
        value: seasons.length,
        symbol: (
          <Image
            src="/static/stacks.svg"
            alt="message dots"
            width={20}
            height={20}
          />
        ),
      },
      {
        label: "Status",
        value: show.status,
        symbol: (
          <Image
            src="/static/stats.svg"
            alt="message dots"
            width={20}
            height={20}
          />
        ),
      },
      {
        label: "End date",
        value: `${endDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        symbol: (
          <Image
            src="/static/calendar-x.svg"
            alt="message dots"
            width={20}
            height={20}
          />
        ),
      },
    ],
    []
  );
  const tabName = show.name ? `${show.name} -` : "";

  return (
    <>
      <Head>
        <title>{tabName ?? ""} Show Details</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
        <meta name="description" content={show.summary} />
      </Head>
      <Nav />
      <section
        className="flex justify-center w-full h-full min-h-screen py-4 lg:py-10"
        lang="en">
        {!show && <MovieMissing />}
        {show && (
          <div className="max-w-[900px] lg:max-w-none mx-auto mt-24">
            <div className="relative flex flex-col w-full h-full gap-6 lg:gap-16 lg:flex-row">
              <div className="hidden lg:block">
                <MovieCover
                  image={image}
                  name={name}
                  premiered={premiered}
                  rating={rating.average}
                />
              </div>

              <div className="flex flex-col gap-6 px-4 w-full max-w-[600px] mx-auto lg:mx-0 lg:max-w-[500px]">
                <div className="flex flex-col w-full gap-2">
                  <h1
                    className="text-3xl font-bold text-center uppercase transition-all sm:text-5xl lg:text-left lg:text-6xl"
                    data-testid="movie-name">
                    {name}
                  </h1>
                  <MovieGenreList genres={genres} />
                </div>

                <div className="lg:hidden">
                  <MobileMovieCover name={name} image={image} />
                </div>

                <div className="lg:hidden">
                  <MobileStats premiered={premiered} rating={rating} />
                </div>

                <MovieSummary summary={summary} />

                <MovieCast cast={cast} />

                {officialSite && (
                  <Link target="_blank" href={officialSite}>
                    <button className="flex items-center justify-center w-full gap-2 p-2 font-bold tracking-wide text-white transition bg-blue-500 rounded-lg fill-white hover:bg-blue-600">
                      <span>Visit website</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="inherit">
                        <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
                        <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
                      </svg>
                    </button>
                  </Link>
                )}

                <div className="flex flex-col w-full gap-4 p-4 text-xl rounded-xl bg-blue-50">
                  {additionalDetails.map((details, index) => (
                    <Fragment key={details.label}>
                      {index !== 0 && <hr />}
                      <KeyValueField {...details} />
                    </Fragment>
                  ))}
                </div>

                <EpisodesContainer
                  episodes={episodes}
                  showId={show.id}
                  count={episodeCount}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { showid } = context.query;

  const cacheKey = `page-${showid}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return {
      props: cachedData,
    };
  }

  const hostname = process.env.NEXT_API_HOSTNAME;

  const episodesResponse = await fetch(`${hostname}/shows/${showid}/episodes`);
  const castResponse = await fetch(`${hostname}/shows/${showid}/cast`);
  const seasonsResponse = await fetch(`${hostname}/shows/${showid}/seasons`);
  const showResponse = await fetch(`${hostname}/shows/${showid}`);

  const show = await showResponse.json();
  const episodes = await episodesResponse.json();
  const cast = await castResponse.json();
  const seasons = await seasonsResponse.json();

  const data = {
    show,
    episodes: episodes.slice(0, 4),
    episodeCount: episodes.length,
    seasons,
    cast,
  };

  cache.set(cacheKey, data);

  return {
    props: data,
  };
}

export default Show;
