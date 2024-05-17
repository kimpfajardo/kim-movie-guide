export const MobileSearchField = ({ query, onChange }) => {
  return (
    <div
      className={`md:hidden px-2 mb-10 transition-all ${
        query ? "mt-0 items-start" : "mt-[300px]"
      }`}>
      <input
        ref={(inp) => {
          inp?.focus();
        }}
        value={query}
        name="query"
        id="search-desktop"
        className={`transition-all ease-in-out duration-300 border-b-2 w-full p-2 px-3 background-gray-100 focus:outline-0 focus:border-green-500 `}
        placeholder="Any movie you have in mind?"
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};
