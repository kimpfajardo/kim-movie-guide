export const SearchField = ({ onChange, shows, query }) => {
  return (
    <div
      className={`hidden md:flex justify-center transition-all ${
        shows.length > 0 ? "h-[100px]" : "h-[300px]"
      } items-center`}
    >
      <input
        ref={(inp) => {
          inp?.focus();
        }}
        value={query}
        name="query"
        id="search"
        className={`transition-all ease-in-out duration-300 border-b-2 ${
          shows.length > 0
            ? "h-[50px] text-4xl p-2 w-[500px]"
            : "h-[100px] text-6xl p-3 w-full"
        } background-gray-100 focus:outline-0 focus:border-green-500  `}
        placeholder="Any movie you have in mind?"
        onChange={onChange}
        autoComplete="off"
        data-testid="search-field"
      />
    </div>
  );
};
