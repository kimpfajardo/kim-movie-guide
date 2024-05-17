import React, { useCallback, useRef, useState } from "react";
import Head from "next/head";
import { Loader } from "../components/Loader";
import { MoviesContainer } from "../components/MoviesContainer";
import { cache } from "../utils/cache";
import { MovieResults } from "../components/MovieResults";
import { SearchField } from "../components/SearchField";
import { MobileSearchField } from "../components/MobileSearchField";

const Home = ({ search, results }) => {
  const [query, setQuery] = useState(search);
  const [shows, setShows] = useState(results ?? []);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  const fetchData = async (query) => {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    const result = await response.json();

    return {
      shows: result.slice(0, 4).map((entry) => entry.show),
    };
  };

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;

      window.history.pushState({}, "", `/?search=${value}`);
      setQuery(value);
      setShows([]);

      // debounce
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (!value) {
        return;
      }

      setLoading(true);
      timer.current = setTimeout(async () => {
        const result = await fetchData(value);
        setShows(result.shows);
        setLoading(false);
      }, 500);
    },
    [setQuery, setShows, setLoading, timer, fetchData]
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
        <meta
          name="description"
          content="Welcome to Movie Guide by Kim Fajardo"
        />
      </Head>

      <div className="min-h-screen h-full w-full" lang="en">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-2xl md:text-6xl font-bold text-center py-10">
            Welcome to Movie Guide
          </h1>

          <SearchField shows={shows} query={query} onChange={onChange} />
          <MobileSearchField query={query} onChange={onChange} />

          {loading && <Loader />}

          <MovieResults loading={loading} shows={shows} query={query} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { search } = context.query;

  if (!search) {
    return {
      props: {
        search: "",
        results: [],
      },
    };
  }

  const cacheKey = `homepage-search-${search?.toLowerCase()}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return {
      props: cachedData,
    };
  }

  const hostname = process.env.NEXT_API_HOSTNAME;
  const response = await fetch(`${hostname}/search/shows?q=${search}`);
  const result = await response.json();

  const data = {
    results: result?.slice(0, 4).map((entry) => entry.show) ?? [],
    search,
  };

  cache.set(cacheKey, data);

  return {
    props: data,
  };
}

export default Home;
